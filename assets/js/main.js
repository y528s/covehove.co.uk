/* ==========================================================================
   COVE — main.js
   --------------------------------------------------------------------------
   Everything the page needs: reading config.js onto the page, the menu,
   memberships, the timetable, the enquiry form, cookie consent and the
   Google Analytics events.

   You should not need to edit this file to change prices, hours, contact
   details, the form key or the GA ID. All of those live in config.js.
   ========================================================================== */

(function () {
  'use strict';

  var CFG = window.COVE_CONFIG || {};
  var CONSENT_KEY = 'cove-consent-v1';

  /* ----------------------------------------------------------------------
     Small helpers
     ---------------------------------------------------------------------- */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // Read a dotted path out of the config, e.g. get('contact.phone')
  function get(path) {
    return path.split('.').reduce(function (obj, key) {
      return (obj && obj[key] !== undefined) ? obj[key] : undefined;
    }, CFG);
  }

  function publishedPlans() {
    return (CFG.plans || []).filter(function (p) { return p.published; });
  }

  function lowestPriceLabel() {
    var plans = publishedPlans();
    if (!plans.length) return '';
    return plans.reduce(function (lowest, p) {
      return (p.price < lowest.price) ? p : lowest;
    }).priceLabel;
  }

  // localStorage can throw in private browsing — never let that break the page.
  function storeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function storeSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* no-op */ }
  }

  /* ----------------------------------------------------------------------
     Analytics
     ----------------------------------------------------------------------
     gtag() is defined in the <head> of every page. If no Measurement ID has
     been set, nothing is loaded and these calls harmlessly queue up.
     ---------------------------------------------------------------------- */

  function track(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
  }

  /* ----------------------------------------------------------------------
     1. Put the config values onto the page
     ----------------------------------------------------------------------
     Any element with data-cove="some.path" gets its text replaced. The text
     already in the HTML is the no-JavaScript fallback; if it has drifted out
     of step with config.js we say so in the browser console.
     ---------------------------------------------------------------------- */

  function applyConfigText() {
    var special = {
      'lowestPrice': lowestPriceLabel(),
      'joiningFee': CFG.joiningFee,
      // The privacy notice falls back to the trading name until the legal
      // entity is confirmed and filled in in config.js.
      'legalEntityDisplay': CFG.legalEntity || 'Cove Gym & Studio'
    };

    $$('[data-cove]').forEach(function (el) {
      var path = el.getAttribute('data-cove');
      var value = (path in special) ? special[path] : get(path);
      if (value === undefined || value === null || value === '') return;

      var current = el.textContent.trim();
      if (current && current !== String(value)) {
        console.warn(
          '[Cove] "' + path + '" in config.js is "' + value + '" but index.html still says "' +
          current + '". The page now shows the config value. Update the HTML too if you ' +
          'want people without JavaScript to see the same thing.'
        );
      }
      el.textContent = value;
    });

    // Links that carry the value in an attribute as well as in their text
    $$('[data-cove-tel]').forEach(function (a) {
      if (get('contact.phoneHref')) a.setAttribute('href', 'tel:' + get('contact.phoneHref'));
    });
    $$('[data-cove-mail]').forEach(function (a) {
      if (get('form.replyToInbox')) a.setAttribute('href', 'mailto:' + get('form.replyToInbox'));
    });

    var directions = $('#directions-link');
    if (directions && get('contact.mapsUrl')) directions.setAttribute('href', get('contact.mapsUrl'));
  }

  /* ----------------------------------------------------------------------
     2. Logo
     ----------------------------------------------------------------------
     Until a logo is chosen the brand name is set as type. Setting
     useLogoSvg to true in config.js swaps in the SVG files instead.
     ---------------------------------------------------------------------- */

  function applyLogo() {
    if (!CFG.useLogoSvg) return;

    function swap(el, file) {
      var text = $('.wordmark__text', el);
      if (!text) return;
      var img = document.createElement('img');
      img.src = file;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      text.replaceWith(img);
    }

    $$('[data-cove-logo]').forEach(function (el) { swap(el, 'assets/logo/cove-wordmark.svg'); });
    $$('[data-cove-logo-reversed]').forEach(function (el) { swap(el, 'assets/logo/cove-wordmark-reversed.svg'); });
  }

  /* ----------------------------------------------------------------------
     3. Header and navigation
     ---------------------------------------------------------------------- */

  function initHeader() {
    var header = $('#site-header');
    var toggle = $('#nav-toggle');
    var nav = $('#primary-nav');
    if (!header) return;

    // Hairline under the header once the page has moved
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.setAttribute('data-stuck', window.scrollY > 8 ? 'true' : 'false');
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.setAttribute('data-open', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close the menu after choosing something
    $$('a', nav).forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Mark the section you are looking at in the nav
    var links = $$('.nav__link', nav);
    var targets = links
      .map(function (l) { return document.querySelector(l.getAttribute('href')); })
      .filter(Boolean);

    if ('IntersectionObserver' in window && targets.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (l) {
            var match = l.getAttribute('href') === '#' + entry.target.id;
            if (match) { l.setAttribute('aria-current', 'true'); }
            else { l.removeAttribute('aria-current'); }
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      targets.forEach(function (t) { observer.observe(t); });
    }
  }

  /* ----------------------------------------------------------------------
     4. Memberships
     ----------------------------------------------------------------------
     The cards are in index.html so they work without JavaScript. Here we
     put the config prices into them, hide any plan that is not published,
     and wire up the Join buttons.
     ---------------------------------------------------------------------- */

  function initPlans() {
    var planEls = $$('.plan[data-plan]');
    if (!planEls.length) return;

    planEls.forEach(function (el) {
      var id = el.getAttribute('data-plan');
      var plan = (CFG.plans || []).filter(function (p) { return p.id === id; })[0];

      if (!plan || !plan.published) {
        el.hidden = true;
        return;
      }
      el.hidden = false;

      var name = $('.plan__name', el);
      var amount = $('.plan__amount', el);
      var period = $('.plan__period', el);
      var fee = $('.plan__fee', el);

      if (name && plan.name) name.textContent = plan.name;
      if (amount && plan.priceLabel) {
        if (amount.textContent.trim() !== plan.priceLabel) {
          console.warn('[Cove] ' + plan.name + ' shows ' + amount.textContent.trim() +
                       ' in index.html but ' + plan.priceLabel + ' in config.js. Using config.js.');
        }
        amount.textContent = plan.priceLabel;
      }
      if (period && plan.period) period.textContent = plan.period;
      if (fee && CFG.joiningFee) fee.textContent = 'Plus a ' + CFG.joiningFee + ' joining fee';

      el.setAttribute('data-popular', plan.popular ? 'true' : 'false');
      var tag = $('.plan__tag', el);
      if (tag) tag.hidden = !plan.popular;
    });

    // The "Membership you're interested in" dropdown
    var select = $('#membership_plan');
    if (select) {
      select.innerHTML = '';
      publishedPlans().forEach(function (plan) {
        var opt = document.createElement('option');
        opt.value = plan.name;
        opt.textContent = plan.name;
        select.appendChild(opt);
      });
      var notSure = document.createElement('option');
      notSure.value = 'Not sure yet';
      notSure.textContent = 'Not sure yet';
      select.appendChild(notSure);
      select.value = 'Not sure yet';
    }

    // Join → pre-select that plan, then go to the form
    planEls.forEach(function (el) {
      var cta = $('.plan__cta a', el);
      if (!cta) return;
      cta.addEventListener('click', function () {
        var id = el.getAttribute('data-plan');
        var plan = (CFG.plans || []).filter(function (p) { return p.id === id; })[0];
        if (!plan) return;

        if (select) select.value = plan.name;
        var join = $('input[name="enquiry_type"][value="Join"]');
        if (join) join.checked = true;

        track('select_plan', { membership_plan: plan.name, price: plan.price });
      });
    });
  }

  /* ----------------------------------------------------------------------
     5. Classes: the two new ones, and the weekly timetable
     ---------------------------------------------------------------------- */

  var DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  /* Groups the timetable filter offers. A class is matched on its name, first
     rule wins, so "Strength & Conditioning" lands under Strength. Anything
     that matches nothing still shows under "Everything" — it just gets no
     group of its own. Add a new class and it is sorted automatically; only
     add a rule here if a genuinely new kind of class appears. */
  var CLASS_FAMILIES = [
    { id: 'yoga',     label: 'Yoga',            match: /yoga|flow/i },
    { id: 'pilates',  label: 'Pilates',         match: /pilates|spine/i },
    { id: 'strength', label: 'Strength',        match: /strength/i },
    { id: 'cardio',   label: 'Conditioning',    match: /burn|circuit|core|conditioning/i },
    { id: 'mind',     label: 'Mind & mobility', match: /meditation|move better|mobility|stretch/i }
  ];

  function familyOf(name) {
    for (var i = 0; i < CLASS_FAMILIES.length; i++) {
      if (CLASS_FAMILIES[i].match.test(name)) return CLASS_FAMILIES[i].id;
    }
    return '';
  }

  function initClasses() {
    // New classes — only shown once showNewClasses is true in config.js
    var newWrap = $('#new-classes');
    var newList = $('#new-classes-list');
    if (newWrap && newList && CFG.showNewClasses && (CFG.newClasses || []).length) {
      CFG.newClasses.forEach(function (c) {
        var row = document.createElement('div');
        row.className = 'new-class';
        row.innerHTML =
          '<span class="new-class__name"></span>' +
          '<span class="new-class__when"></span>' +
          '<span class="new-class__detail"></span>';
        $('.new-class__name', row).textContent = c.name;
        $('.new-class__when', row).textContent = c.when + (c.room ? ' · ' + c.room : '');
        $('.new-class__detail', row).textContent = c.detail || '';
        newList.appendChild(row);
      });
      newWrap.hidden = false;
    }

    // Weekly timetable
    var wrap = $('#timetable-wrap');
    var note = $('#timetable-note');
    var rows = CFG.timetable || [];

    if (wrap && rows.length) {
      var byDay = {};
      rows.forEach(function (r) {
        if (!byDay[r.day]) byDay[r.day] = [];
        byDay[r.day].push(r);
      });
      var days = DAY_ORDER.filter(function (d) { return byDay[d]; });

      var heading = document.createElement('h3');
      heading.className = 'timetable-heading';
      heading.textContent = 'The weekly timetable';
      wrap.appendChild(heading);

      var intro = document.createElement('p');
      intro.className = 'muted small timetable-intro';
      intro.textContent = 'The same every week. Classes are in the Gym or the Studio — it says which.';
      wrap.appendChild(intro);

      /* --- Controls ----------------------------------------------------
         Both the kind filter and the day tabs are built here rather than in
         index.html, so that with JavaScript off the whole timetable simply
         shows, unfiltered. Day tabs only appear on narrow screens, where 39
         classes in one column is a long scroll. ------------------------- */

      var present = {};
      rows.forEach(function (r) { present[familyOf(r.name)] = true; });
      var families = CLASS_FAMILIES.filter(function (f) { return present[f.id]; });

      var bar = document.createElement('div');
      bar.className = 'tt-filter';
      bar.setAttribute('role', 'group');
      bar.setAttribute('aria-label', 'Filter the timetable by kind of class');

      var famButtons = [];
      function makeFilter(id, label) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'tt-filter__btn';
        b.textContent = label;
        b.setAttribute('data-filter', id);
        b.setAttribute('aria-pressed', id === 'all' ? 'true' : 'false');
        bar.appendChild(b);
        famButtons.push(b);
      }
      makeFilter('all', 'Everything');
      families.forEach(function (f) { makeFilter(f.id, f.label); });
      wrap.appendChild(bar);

      var dayBar = document.createElement('div');
      dayBar.className = 'tt-daybar';
      dayBar.setAttribute('role', 'group');
      dayBar.setAttribute('aria-label', 'Choose a day');
      var dayButtons = [];
      days.forEach(function (d) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'tt-daybar__btn';
        b.setAttribute('data-day', d);
        b.setAttribute('aria-pressed', 'false');
        b.innerHTML = '<span aria-hidden="true"></span><span class="visually-hidden"></span>';
        b.children[0].textContent = d.slice(0, 3);
        b.children[1].textContent = d;
        dayBar.appendChild(b);
        dayButtons.push(b);
      });
      wrap.appendChild(dayBar);

      var count = document.createElement('p');
      count.className = 'tt-filter__count muted small';
      count.setAttribute('role', 'status');
      count.setAttribute('aria-live', 'polite');
      wrap.appendChild(count);

      // --- The grid itself ---------------------------------------------
      var grid = document.createElement('div');
      grid.className = 'timetable-grid';

      days.forEach(function (day) {
        var col = document.createElement('section');
        col.className = 'tt-day';
        col.setAttribute('data-day', day);

        var h = document.createElement('h4');
        h.className = 'tt-day__name';
        h.textContent = day;
        col.appendChild(h);

        var ul = document.createElement('ul');
        ul.className = 'tt-list';

        byDay[day].forEach(function (r) {
          var li = document.createElement('li');
          li.className = 'tt-item';
          li.setAttribute('data-family', familyOf(r.name));
          li.innerHTML = '<span class="tt-time"></span>' +
                         '<span class="tt-name"></span>' +
                         '<span class="room"></span>';
          $('.tt-time', li).textContent = r.time;
          $('.tt-name', li).textContent = r.name;
          $('.room', li).textContent = r.room || '';
          ul.appendChild(li);
        });

        col.appendChild(ul);
        grid.appendChild(col);
      });

      wrap.appendChild(grid);

      // --- State and rendering ------------------------------------------
      var narrowQuery = window.matchMedia('(max-width: 639px)');
      var state = { family: 'all', day: null };

      function todayName() {
        var d = DAY_ORDER[(new Date().getDay() + 6) % 7]; // JS weeks start Sunday
        return days.indexOf(d) > -1 ? d : days[0];
      }

      function render() {
        var total = 0;

        $$('.tt-day', grid).forEach(function (dayEl) {
          var dayName = dayEl.getAttribute('data-day');
          var visibleHere = 0;

          $$('.tt-item', dayEl).forEach(function (item) {
            var keep = state.family === 'all' ||
                       item.getAttribute('data-family') === state.family;
            item.hidden = !keep;
            if (keep) visibleHere++;
          });

          var dayWanted = !state.day || state.day === dayName;
          dayEl.hidden = !(visibleHere > 0 && dayWanted);
          if (dayWanted) total += visibleHere;
        });

        famButtons.forEach(function (b) {
          b.setAttribute('aria-pressed',
            b.getAttribute('data-filter') === state.family ? 'true' : 'false');
        });

        dayButtons.forEach(function (b) {
          var d = b.getAttribute('data-day');
          b.setAttribute('aria-pressed', state.day === d ? 'true' : 'false');
          // grey out a day that has nothing under the current filter
          var dayEl = grid.querySelector('.tt-day[data-day="' + d + '"]');
          var has = dayEl && $$('.tt-item', dayEl).some(function (i) { return !i.hidden; });
          b.disabled = !has;
        });

        var noun = total === 1 ? ' class' : ' classes';
        count.textContent = state.day
          ? total + noun + ' on ' + state.day + '.'
          : total + noun + ' a week.';
      }

      function syncToWidth() {
        if (narrowQuery.matches) {
          if (!state.day) state.day = todayName();
        } else {
          state.day = null;
        }
        render();
      }

      famButtons.forEach(function (b) {
        b.addEventListener('click', function () {
          state.family = b.getAttribute('data-filter');
          // if the chosen day has nothing left, move to one that has
          if (state.day) {
            var el = grid.querySelector('.tt-day[data-day="' + state.day + '"]');
            render();
            if (el && el.hidden) {
              var firstOpen = days.filter(function (d) {
                var dd = grid.querySelector('.tt-day[data-day="' + d + '"]');
                return dd && $$('.tt-item', dd).some(function (i) { return !i.hidden; });
              })[0];
              if (firstOpen) { state.day = firstOpen; }
            }
          }
          render();
          if (state.family !== 'all') track('filter_classes', { class_family: state.family });
        });
      });

      dayButtons.forEach(function (b) {
        b.addEventListener('click', function () {
          state.day = b.getAttribute('data-day');
          render();
        });
      });

      if (narrowQuery.addEventListener) narrowQuery.addEventListener('change', syncToWidth);
      else if (narrowQuery.addListener) narrowQuery.addListener(syncToWidth);

      syncToWidth();

      // Holiday closures, if any are listed
      var closures = CFG.closures || [];
      if (closures.length) {
        var box = document.createElement('div');
        box.className = 'closures';
        var ch = document.createElement('h4');
        ch.className = 'closures__title';
        ch.textContent = 'Closures';
        box.appendChild(ch);

        var cl = document.createElement('ul');
        cl.className = 'closures__list';
        closures.forEach(function (c) {
          var li = document.createElement('li');
          li.innerHTML = '<strong></strong> <span></span>';
          li.querySelector('strong').textContent = c.when;
          li.querySelector('span').textContent = c.what;
          cl.appendChild(li);
        });
        box.appendChild(cl);
        wrap.appendChild(box);
      }

      wrap.hidden = false;
      if (note) note.hidden = true;
    }
  }

  /* ----------------------------------------------------------------------
     6. The enquiry form
     ---------------------------------------------------------------------- */

  var SHORT_TYPE = {
    'Book a free tour': 'Tour',
    'Join': 'Join',
    'Ask a question': 'Question'
  };

  function initForm() {
    var form = $('#enquiry-form');
    if (!form) return;

    var status = $('#form-status');
    var submit = $('#enquiry-submit');
    var keyField = $('#w3f-key');
    var redirectField = $('#w3f-redirect');
    var pageUrlField = $('#w3f-page-url');

    var accessKey = get('form.accessKey') || '';
    if (keyField) keyField.value = accessKey;
    if (pageUrlField) pageUrlField.value = window.location.href;

    var siteUrl = get('site.url') || '';
    if (redirectField && siteUrl) {
      redirectField.value = siteUrl.replace(/\/?$/, '/') + 'thanks.html';
    }

    if (!accessKey) {
      console.warn(
        '[Cove] No Web3Forms access key set, so the enquiry form cannot send anything. ' +
        'Add one to config.js (form.accessKey) and to the access_key field in index.html. ' +
        'See README.md → "Making the form work".'
      );
    }

    // form_start — the first time anyone touches the form
    var started = false;
    form.addEventListener('input', function () {
      if (started) return;
      started = true;
      track('form_start');
    }, true);

    /* --- Validation --------------------------------------------------- */

    function setError(fieldId, message) {
      var input = document.getElementById(fieldId);
      var slot = document.getElementById('err-' + fieldId);
      if (slot) slot.textContent = message || '';
      if (input) {
        if (message) input.setAttribute('aria-invalid', 'true');
        else input.removeAttribute('aria-invalid');
      }
      return input;
    }

    function validate() {
      var firstInvalid = null;

      // Every field is checked and messaged; we only remember the first one to
      // focus. (Doing this inline with || short-circuits away the later calls.)
      function check(id, message) {
        var el = setError(id, message);
        if (message && !firstInvalid) firstInvalid = el;
      }

      var emailValue = $('#email').value.trim();

      check('name', $('#name').value.trim() ? '' : 'Please tell us your name.');

      if (!emailValue) {
        check('email', 'We need an email address to reply to.');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailValue)) {
        check('email', 'That does not look like an email address.');
      } else {
        check('email', '');
      }

      check('consent', $('#consent').checked ? '' : 'Please tick this so we can reply to you.');

      return firstInvalid;
    }

    // Clear an error as soon as it is fixed
    ['name', 'email', 'consent'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', function () { setError(id, ''); });
      el.addEventListener('change', function () { setError(id, ''); });
    });

    /* --- Submit ------------------------------------------------------- */

    function showStatus(state, message) {
      if (!status) return;
      status.setAttribute('data-state', state);
      status.textContent = message;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var invalid = validate();
      if (invalid) {
        showStatus('error', 'Please check the highlighted fields.');
        invalid.focus();
        return;
      }

      var data = new FormData(form);
      var enquiryType = data.get('enquiry_type') || 'Ask a question';
      var plan = data.get('membership_plan') || 'Not sure yet';
      var name = (data.get('name') || '').toString().trim();
      var firstName = name.split(' ')[0] || name;

      // Cove website: [Tour] – [Name]
      data.set('subject', 'Cove website: ' + (SHORT_TYPE[enquiryType] || 'Enquiry') + ' – ' + name);
      data.set('replyto', data.get('email'));
      data.set('page_url', window.location.href);
      data.set('marketing_opt_in', $('#marketing') && $('#marketing').checked ? 'Yes' : 'No');

      if (!accessKey) {
        showStatus('error',
          'Sorry — this form is not connected yet. Please email ' +
          (get('form.replyToInbox') || '') + ' or call ' + (get('contact.phone') || '') + ' instead.');
        return;
      }

      submit.disabled = true;
      var originalLabel = submit.textContent;
      submit.textContent = 'Sending…';
      showStatus('', '');

      var payload = {};
      data.forEach(function (value, key) { payload[key] = value; });

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json().catch(function () { return { success: res.ok }; }); })
        .then(function (result) {
          if (!result || !result.success) throw new Error((result && result.message) || 'Send failed');

          track('generate_lead', { enquiry_type: enquiryType, membership_plan: plan });

          showStatus('success',
            'Thanks, ' + firstName + '. We’ll be in touch ' +
            (get('form.responseTime') || 'shortly') + '.');

          form.reset();
          if ($('#membership_plan')) $('#membership_plan').value = 'Not sure yet';
          status.setAttribute('tabindex', '-1');
          status.focus();
        })
        .catch(function (err) {
          console.error('[Cove] Form send failed:', err);
          showStatus('error',
            'Sorry, that did not send. Please email ' + (get('form.replyToInbox') || '') +
            ' or call ' + (get('contact.phone') || '') + ' and we will pick it up.');
        })
        .then(function () {
          submit.disabled = false;
          submit.textContent = originalLabel;
        });
    });
  }

  /* ----------------------------------------------------------------------
     7. Link and button tracking
     ---------------------------------------------------------------------- */

  function initTracking() {
    $$('[data-cta]').forEach(function (el) {
      el.addEventListener('click', function () {
        track('cta_click', {
          cta_location: el.getAttribute('data-cta'),
          cta_text: el.textContent.trim()
        });
      });
    });

    $$('a[href^="tel:"]').forEach(function (el) {
      el.addEventListener('click', function () { track('click_phone'); });
    });

    $$('a[href^="mailto:"]').forEach(function (el) {
      el.addEventListener('click', function () { track('click_email'); });
    });
  }

  /* ----------------------------------------------------------------------
     8. Cookie consent
     ----------------------------------------------------------------------
     Consent Mode v2 defaults to denied in the <head> of every page, so
     nothing is stored until somebody chooses here. We only ever grant
     analytics_storage — the ad signals stay denied because we do not
     run ads.
     ---------------------------------------------------------------------- */

  function initConsent() {
    var banner = $('#consent-banner');
    var accept = $('#consent-accept');
    var reject = $('#consent-reject');
    var settings = $('#cookie-settings');
    var returnFocusTo = null;

    function grant() {
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
      }
    }

    function deny() {
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { analytics_storage: 'denied' });
      }
    }

    // Apply whatever was chosen last time, on every page
    var saved = storeGet(CONSENT_KEY);
    if (saved === 'granted') grant();
    else if (saved === 'denied') deny();

    if (!banner) return;

    function open(focusIt) {
      banner.hidden = false;
      if (focusIt) {
        banner.setAttribute('tabindex', '-1');
        banner.focus();
      }
    }

    function close() {
      banner.hidden = true;
      if (returnFocusTo) { returnFocusTo.focus(); returnFocusTo = null; }
    }

    if (!saved) open(false);

    if (accept) {
      accept.addEventListener('click', function () {
        storeSet(CONSENT_KEY, 'granted');
        grant();
        close();
        track('cookie_consent', { choice: 'accepted' });
      });
    }

    if (reject) {
      reject.addEventListener('click', function () {
        storeSet(CONSENT_KEY, 'denied');
        deny();
        close();
      });
    }

    if (settings) {
      settings.addEventListener('click', function () {
        returnFocusTo = settings;
        open(true);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !banner.hidden && returnFocusTo) close();
    });
  }

  /* ----------------------------------------------------------------------
     Go
     ---------------------------------------------------------------------- */

  function init() {
    if (!window.COVE_CONFIG) {
      console.error('[Cove] config.js did not load, so the page is showing its built-in defaults.');
    }
    applyConfigText();
    applyLogo();
    initHeader();
    initPlans();
    initClasses();
    initForm();
    initTracking();
    initConsent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
