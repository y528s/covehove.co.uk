# Cove Gym & Studio — temporary website

A single-page site for **Cove Gym & Studio, Hove**, running while the full site is
built. Plain HTML, CSS and a little vanilla JavaScript. No framework, no build step,
nothing to install — edit a file, save it, and it is live.

- **Home:** `index.html` — everything is on this one page
- **Also:** `privacy.html`, `thanks.html` (form fallback), `404.html`
- **Everything you will want to change:** `config.js`

---

## ⚠️ Before this goes live

These are the things that are still unconfirmed. **Work down this list.**

| # | What | Where to change it | Who decides |
|---|---|---|---|
| 1 | **Web3Forms access key** — until this is set, the form cannot send anything | `config.js` → `form.accessKey`, **and** `index.html` → `access_key` | Yosef |
| 2 | ~~GA4 Measurement ID~~ — **done.** `G-G4XT8RJ8N7`, already in `config.js`. One step left: see *Marking the key event* below | — | ✅ 23 Sep |
| 3 | ~~The live URL~~ — **done.** Everything points at `https://covehove.co.uk/`, and `CNAME` is in place | — | ✅ 23 Sep |
| 4 | **Form recipient** — is there a gym inbox, or is it Beth's? | Web3Forms account, plus `config.js` → `form.replyToInbox` | Beth |
| 5 | **Final prices** — £59.99 or £60? Are Residents and Shabbat-friendly public? | `config.js` → `plans` | Timmo / Beth / Jeremy |
| 6 | **The two new October classes** — days, times, start dates | `config.js` → `showNewClasses: true` | Timmo / Beth |
| 7 | **Saturday and Shabbat opening**, given the "every day" claim | `config.js` → `hours` | Timmo / Jeremy |
| 8 | **Phone number** — is 01273 750333 right for gym enquiries? | `config.js` → `contact.phone` | Beth |
| 9 | **Legal entity** for the privacy notice | `config.js` → `legalEntity` | Yosef / Jeremy |
| 10 | **Real photos** of the gym and studio | `assets/img/` — see *Photos* | Beth / Timmo |
| 11 | **Timetable data** | `config.js` → `timetable` | Beth |
| 12 | **Logo**, once the branding meeting has chosen | `assets/logo/README.md` | Branding meeting |

### Things we deliberately left off the page

Rather than publish a guess, these are **not on the site at all**. The questions are
written into `index.html` as comments, ready to switch on once someone confirms the answer.

- **Cancellation notice period.** The page says "cancel any time" and stops there.
- **How class booking works.** No FAQ about it yet.
- **Parking, changing rooms and lockers.** No FAQ about it yet.
- **"Your first class is on us."** The brand board says it, Timmo's page offers a free
  tour. Only the free tour is on the site.
- **Residents (£20) and Shabbat-friendly (£30).** Built and styled, but hidden.

To add one of the FAQs, open `index.html`, find the comment that begins
`READY TO ADD, once the answers are confirmed`, and copy one of the `<details>` blocks
above it.

---

## Editing the site

### Prices

Open `config.js` and find the `plans` section. For each plan:

```js
{
  id: "gym",              // do not change this
  name: "Gym Only",       // the heading on the card
  price: 35,              // numbers only — analytics uses this
  priceLabel: "£35",      // what people actually see
  period: "a month",
  published: true,        // false hides the card completely
  popular: false          // true adds the sand "Most popular" tag
}
```

The joining fee is one line further up: `joiningFee: "£30"`.

**One thing to know.** The prices are also written into `index.html` so the page still
reads correctly for the handful of people who browse with JavaScript switched off.
`config.js` always wins on screen — but if the two disagree, the browser console prints
a note telling you which line of `index.html` to bring into step. Open the page, press
**F12**, and look at the Console tab.

Three more places mention a price and are **not** driven by `config.js`, because search
engines read them before any JavaScript runs. Update them by hand if prices change:

- the `<title>` in `index.html` — "Memberships from £27.99"
- the meta description just below it
- nothing else

### Turning a plan on

Residents and Shabbat-friendly are built and hidden. Set `published: true` on the plan
in `config.js` and it appears — on the pricing cards and in the form's dropdown.

### Hours, phone, address, email

All in `config.js`, sections 2 and 3. The phone number appears twice in that file:
`phone` is what people read, `phoneHref` is what the phone actually dials (no spaces,
international format: `+441273750333`).

### The classes timetable

`config.js` → `timetable`. It starts empty on purpose. While it is empty the site shows
the class list and a line saying to ask us for the timetable — nothing looks broken.

When Beth sends the data, add one line per class:

```js
timetable: [
  { day: "Monday", time: "7.00am", name: "Strength & Conditioning", room: "Gym" },
  { day: "Monday", time: "9.30am", name: "Pilates", room: "Studio" },
],
```

`day` must be spelled out in full (Monday … Saturday) and `room` must be `Gym` or `Studio`.
A proper table appears as soon as there is at least one line.

**Do not type times off the PDF.** Use the clean list Beth supplies.

To offer the PDF as a download, put it in `assets/docs/` and write its filename into
`config.js` → `timetablePdf`. Leave it empty and the download button stays hidden.

### Photos

The hero and the address card currently use plain brand panels
(`assets/img/placeholder-hero.svg`, `assets/img/placeholder-map.svg`). They are not
pretending to be photographs — they are patterns in the Cove colours.

To put a real photo in the hero, open `index.html`, find `TODO: real photo`, and replace
the `<div class="media media--hero">` block with:

```html
<div class="media media--hero">
  <picture>
    <source srcset="assets/img/hero.webp" type="image/webp">
    <img src="assets/img/hero.jpg" width="1200" height="960" loading="eager"
         alt="Two members stretching in the studio at Cove, Hove.">
  </picture>
</div>
```

Save both a `.webp` and a `.jpg`, around 1200px wide. Always write real alt text
describing what is in the picture — it is what blind visitors hear, and Google reads it too.

### The logo

It is not used yet, and that is on purpose. See **`assets/logo/README.md`** for the
whole story and the one-line swap when the mark is chosen.

---

## Making the form work

The site is static, so it cannot send email by itself. It posts to
**[Web3Forms](https://web3forms.com)**, which forwards everything to an inbox.

1. Go to web3forms.com, enter the address that should receive enquiries, and press
   *Create Access Key*.
2. Open the confirmation email in **that inbox** and click the link. Until you do, nothing
   is delivered.
3. Paste the key into **two places**:
   - `config.js` → `form.accessKey`
   - `index.html` → the hidden `access_key` field (search for `access_key`). This second
     copy is only used by visitors with JavaScript switched off, but it means the form
     works for them too.

The key is safe to have in a public repository — it only ever forwards to the address it
was created for.

### To change who receives enquiries

Change the recipient in the Web3Forms dashboard (or create a new key for the new
address and paste it in). Then update `config.js` → `form.replyToInbox`, which is the
address shown on the page as a direct contact.

### Test it before launch

Submit the form **three times**, once as each of *Book a free tour*, *Join* and
*Ask a question*. For each one check that:

- it arrives in the recipient's inbox, and not in the junk folder
- the subject reads `Cove website: Tour – Their Name`
- pressing **Reply** goes back to the enquirer, not to Web3Forms
- every field you filled in is in the body of the email

---

## Google Analytics

**This is already set up.** Created 23 September 2026.

| | |
|---|---|
| Account | **BNJC Website** (179594765) — the same account as BNJC - GA4 and Sapphire Hove - GA4 |
| Property | **Cove – temporary site** (555572166) |
| Data stream | **Cove temporary site** (15833897533), `https://covehove.co.uk` |
| **Measurement ID** | **`G-G4XT8RJ8N7`** — already in `config.js` |
| Reporting | GMT, currency GBP, enhanced measurement on |

It is a **separate property inside the BNJC account**, rather than another stream on
BNJC's own property. That means Cove's numbers never mix with BNJC's, Timmo and Beth can
be given access to Cove alone, and when the permanent site replaces this one the history
carries over — GA4 cannot move data between properties later. Sapphire Hove is set up the
same way.

If the stream URL needs to change (we launch on `github.io` before `covehove.co.uk` is
confirmed), it is only a label — collection is not restricted to it. Edit it under
*Admin → Data streams* if you want it tidy.

### Marking the key event — one step left, after launch

`generate_lead` is the conversion: a real enquiry. GA4 will only let you mark an event as
a key event **once it has seen that event at least once**, so this cannot be done up front.

After the first test form submission comes through:

1. GA4 → **Admin → Data display → Events**
2. **Key events** tab → find **`generate_lead`** in the list
3. Click the **star** next to it

(GA pre-created `close_convert_lead`, `qualify_lead` and `purchase` when the property was
set up, because "Generate leads" was chosen as a business objective. This site never sends
any of those, so they will simply sit at zero. You can ignore them or unstar them.)

While the ID in `config.js` is the placeholder `G-XXXXXXXXXX`, no Google script loads at
all — that is deliberate, so a half-configured site never phones home.

### Consent

Nothing is stored until the visitor chooses. Google Consent Mode v2 defaults every
storage type to `denied` in the `<head>` of every page, before anything Google loads.
Pressing **Accept analytics** grants `analytics_storage` only — the advertising signals
stay denied, because we do not run ads. The choice is kept in the browser under
`cove-consent-v1`, and the **Cookie settings** link in the footer reopens the banner.

### What gets tracked

| Event | When |
|---|---|
| `generate_lead` | The enquiry form sent successfully — **mark this as a key event** |
| `form_start` | Someone typed in the form for the first time |
| `select_plan` | "Join" pressed on a pricing card |
| `cta_click` | "Book a free tour" or "See memberships" pressed |
| `click_phone` | A phone number pressed |
| `click_email` | An email address pressed |
| `file_download` | The timetable PDF — GA's enhanced measurement handles this on its own |

### Checking it works

Open GA4 → *Admin → DebugView*, then load the site with the Google Analytics Debugger
extension on, or add `?debug_mode=1` to the address.

- **Before** pressing anything on the banner: no `_ga` cookie (check *Application →
  Cookies* in the browser's developer tools). Verified 23 Sep — clean.
- **After** Accept: cookies `_ga` and `_ga_G4XT8RJ8N7` appear (the second one carries the
  property's ID, so it is a quick way to confirm you are tagged to the right property),
  and the events above show in DebugView. Verified 23 Sep.
- After **Reject**: still no cookie.

### Links from posters, QR codes and social

Add UTM parameters so the traffic is attributable:

```
https://your-site-url/?utm_source=poster&utm_medium=qr&utm_campaign=cove_launch
```

---

## The address

The site is built for **https://covehove.co.uk/** and every absolute URL already points
there — canonical tags, the social image, the sitemap, `robots.txt`, the JSON-LD and the
form's no-JavaScript fallback. The `CNAME` file in this folder is what tells GitHub Pages
to serve the domain.

We are launching straight onto the domain rather than on a `github.io` address first.
That avoids changing the canonical URL later, which would otherwise cost us the small
amount of search history the site builds up.

If you ever need to move it, the address lives in: `CNAME`, `config.js` (`site.url`),
`index.html` (canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`, and the
form's hidden `redirect`), `privacy.html` (canonical), `sitemap.xml` and `robots.txt`.

---

## Publishing it

**GitHub Pages**, from the `main` branch, root folder.

1. Create a repository and push these files to it. On a free GitHub plan the repository
   must be **public** for Pages to work — that is fine, there are no secrets here. The
   form key and the GA ID are both meant to be visible.
2. *Settings → Pages* → Source: **Deploy from a branch**, Branch: `main`, folder: `/ (root)`.
3. Wait a minute, then open the `https://<account>.github.io/<repo>/` address it gives you.
4. Tick **Enforce HTTPS**.

Cloudflare Pages and Netlify both work the same way if you would rather use those.

### The domain — covehove.co.uk

The `CNAME` file is already in this folder, so GitHub knows the domain. What is left is DNS.

At whoever holds the DNS for covehove.co.uk, add **five records**:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `<your-github-account>.github.io.` |

Then in *Settings → Pages*, enter `covehove.co.uk` as the custom domain and wait for the
green tick — GitHub issues a free certificate, which usually takes a few minutes but can
take up to 24 hours. **Then** tick **Enforce HTTPS**. Don't tick it before the certificate
is issued or the site will be unreachable until it is.

The `www` record means `www.covehove.co.uk` redirects to the bare domain, which is the
canonical one.

---

## Working on it locally

You can open `index.html` by double-clicking it, but the form and fonts behave better
over a real address. From this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## How it is built

```
index.html          the whole site
privacy.html        privacy notice
thanks.html         where the form lands if JavaScript is switched off
404.html            styles are inlined here, so it works at any address
config.js           ← prices, hours, contact, form key, GA ID
robots.txt
sitemap.xml
assets/
  css/styles.css    one stylesheet; the palette is at the very top
  js/main.js        menu, memberships, timetable, form, consent, analytics
  logo/             not used yet — see the README in there
  img/              hero and map placeholders, social image
  favicon/          placeholder "c" icon
  docs/             the timetable PDF goes here
```

### Brand rules the code enforces

These came from the brand deck and are wired into `assets/css/styles.css`. Please keep them.

- **Teal never sets body text on cream.** It measures 3.0 : 1 and fails. Buttons use a
  teal fill with a **navy** label (4.7 : 1). Links on cream use `--ink-teal`, a darkened
  teal (5.4 : 1).
- **Sand never sets type below 40px.** It is for large display words, decoration, and as
  a background fill — the "Most popular" tag is sand with navy type on it, not sand type.
- **Cocoa is too light for small text** on cream (4.0 : 1), so eyebrows and captions use
  `--ink-muted`, a darkened cocoa (5.7 : 1).
- Navy on cream is the default. Cream on navy is for feature bands.
- **No BNJC branding.** Cove reads as its own organisation. "at Brighton Jewish Hub"
  appears once, small, in the footer, and nowhere else.
- The tagline is **"You don't have to be a gym person."** The older "Nobody here is a
  gym person" is retired.

### Trying Palette B

Every colour is a CSS custom property. Open `assets/css/styles.css` and change the six
values in the `--- Brand palette A ---` block at the top, then re-check the contrast of
the derived inks just below it. Nothing else in the file hard-codes a colour.
