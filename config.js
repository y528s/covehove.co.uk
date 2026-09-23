/* ============================================================================
   COVE — SITE CONFIGURATION
   ----------------------------------------------------------------------------
   This is the only file you need to edit for prices, hours, contact details,
   the form recipient and the Google Analytics ID.

   You do not need to know how to code. Change the text between the quote
   marks, keep the quote marks and the commas, then save.

   After editing, reload the site and check the page. If something disappears,
   you have probably deleted a quote mark or a comma — undo and try again.
   ========================================================================= */

window.COVE_CONFIG = {

  /* --------------------------------------------------------------------
     1. SITE
     -------------------------------------------------------------------- */
  site: {
    // The full address of the live site, with a slash on the end.
    // Used for the no-JavaScript form fallback and for social sharing.
    url: "https://covehove.co.uk/",
    name: "Cove Gym & Studio"
  },

  /* --------------------------------------------------------------------
     2. CONTACT
     -------------------------------------------------------------------- */
  contact: {
    phone: "01273 750333",          // shown on the page
    phoneHref: "+441273750333",     // what the phone actually dials — no spaces
    // NOTE: the email shown on the page is form.replyToInbox in section 7,
    // not here — there is only one place to change it.
    addressLine: "29–31 New Church Road",
    addressCity: "Hove",
    addressPostcode: "BN3 4AD",
    // Used by the "Get directions" button.
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=29-31+New+Church+Road+Hove+BN3+4AD"
  },

  /* --------------------------------------------------------------------
     3. OPENING HOURS
     -------------------------------------------------------------------- */
  hours: {
    gym: "7am–10pm",          // the times only
    gymDays: "every day",     // which days the gym floor is open
    classes: "Monday to Saturday",
    // Machine-readable version for Google. Format: "Mo-Su 07:00-22:00".
    schemaHours: "Mo-Su 07:00-22:00"
  },

  /* --------------------------------------------------------------------
     4. MEMBERSHIPS
     --------------------------------------------------------------------
     To change a price, edit "priceLabel" (what people see).
     Also edit "price" (numbers only) — analytics uses it.
     Set "published" to false to hide a plan from the site completely.
     -------------------------------------------------------------------- */
  joiningFee: "£30",

  plans: [
    {
      id: "under25",
      name: "Under 25s",
      price: 27.99,
      priceLabel: "£27.99",
      period: "a month",
      published: true,
      popular: false
    },
    {
      id: "gym",
      name: "Gym Only",
      price: 35,
      priceLabel: "£35",
      period: "a month",
      published: true,
      popular: false
    },
    {
      id: "gym-classes",
      name: "Gym & Classes",
      price: 59.99,
      priceLabel: "£59.99",
      period: "a month",
      published: true,
      popular: true
    },
    {
      id: "residents",
      name: "Residents",
      price: 20,
      priceLabel: "£20",
      period: "a month",
      // NOT CONFIRMED. Set to true once Timmo/Beth/Jeremy sign this off.
      published: false,
      popular: false
    },
    {
      id: "shabbat",
      name: "Shabbat-friendly",
      price: 30,
      priceLabel: "£30",
      period: "a month",
      // NOT CONFIRMED. Set to true once Timmo/Beth/Jeremy sign this off.
      published: false,
      popular: false
    }
  ],

  /* --------------------------------------------------------------------
     5. CLASSES
     --------------------------------------------------------------------
     newClasses: the two classes starting in late October.
     Set showNewClasses to true ONLY once Timmo/Beth have confirmed the
     days, times and start dates.
     -------------------------------------------------------------------- */
  showNewClasses: false,

  newClasses: [
    {
      name: "Pregnancy Yoga",
      when: "Tuesdays, 7–8pm",
      detail: "Six weeks from 27 October",
      room: "The Studio"
    },
    {
      name: "Mini Movers",
      when: "Fridays, 10–11am",
      detail: "From 30 October",
      room: "The Studio"
    }
  ],

  /* --------------------------------------------------------------------
     6. TIMETABLE
     --------------------------------------------------------------------
     Leave this list empty until Beth sends the timetable data. While it is
     empty the site shows the class list and the download link instead, so
     nothing looks broken.

     To add a class, copy one line and change it:
       { day: "Monday", time: "9.30am", name: "Pilates", room: "Studio" },

     "day" must be one of: Monday Tuesday Wednesday Thursday Friday Saturday
     "room" must be either: Gym  or  Studio
     -------------------------------------------------------------------- */
  timetable: [
    { day: "Monday", time: "7am", name: "Strength & Conditioning", room: "Gym" },
    { day: "Monday", time: "8am", name: "Energising Flow", room: "Studio" },
    { day: "Monday", time: "9am", name: "Strength", room: "Gym" },
    { day: "Monday", time: "9am", name: "Gentle Yoga", room: "Studio" },
    { day: "Monday", time: "10am", name: "Core", room: "Gym" },
    { day: "Monday", time: "6pm", name: "Strength", room: "Gym" },
    { day: "Monday", time: "7.15pm", name: "Pilates", room: "Studio" },

    { day: "Tuesday", time: "7.15am", name: "Energising Flow", room: "Studio" },
    { day: "Tuesday", time: "8.20am", name: "Pilates", room: "Studio" },
    { day: "Tuesday", time: "9am", name: "Strength", room: "Gym" },
    { day: "Tuesday", time: "9.05am", name: "Pilates", room: "Studio" },
    { day: "Tuesday", time: "10am", name: "Move Better", room: "Studio" },
    { day: "Tuesday", time: "12.30pm", name: "Embodied Yoga", room: "Studio" },
    { day: "Tuesday", time: "6pm", name: "Yin Yoga", room: "Studio" },
    { day: "Tuesday", time: "7pm", name: "Strength", room: "Gym" },

    { day: "Wednesday", time: "7am", name: "Strength", room: "Gym" },
    { day: "Wednesday", time: "7am", name: "Pilates", room: "Studio" },
    { day: "Wednesday", time: "8am", name: "Burn", room: "Gym" },
    { day: "Wednesday", time: "8am", name: "Pilates", room: "Studio" },
    { day: "Wednesday", time: "9am", name: "Strength", room: "Gym" },
    { day: "Wednesday", time: "10am", name: "Healthy Spine", room: "Studio" },
    { day: "Wednesday", time: "12.30pm", name: "Meditation", room: "Studio" },
    { day: "Wednesday", time: "6pm", name: "Circuits", room: "Gym" },
    { day: "Wednesday", time: "7pm", name: "Gentle Yoga", room: "Studio" },

    { day: "Thursday", time: "7am", name: "Pilates", room: "Studio" },
    { day: "Thursday", time: "8am", name: "Dynamic Flow Yoga", room: "Studio" },
    { day: "Thursday", time: "9am", name: "Strength", room: "Gym" },
    { day: "Thursday", time: "6pm", name: "Strength", room: "Gym" },
    { day: "Thursday", time: "6pm", name: "Pilates", room: "Studio" },
    { day: "Thursday", time: "7pm", name: "Burn", room: "Gym" },

    { day: "Friday", time: "7am", name: "Strength & Conditioning", room: "Gym" },
    { day: "Friday", time: "7am", name: "Energising Flow", room: "Studio" },
    { day: "Friday", time: "8am", name: "Healthy Spine", room: "Studio" },
    { day: "Friday", time: "8.30am", name: "Strength", room: "Gym" },
    { day: "Friday", time: "9.30am", name: "Core", room: "Gym" },
    { day: "Friday", time: "10am", name: "Move Better", room: "Studio" },
    { day: "Friday", time: "11.30am", name: "Dru Yoga", room: "Studio" },

    { day: "Saturday", time: "9am", name: "Circuits", room: "Gym" },
    { day: "Saturday", time: "10am", name: "Strength", room: "Gym" },
  ],

  /* --------------------------------------------------------------------
     6b. CHAGIM AND HOLIDAY CLOSURES
     --------------------------------------------------------------------
     Shown as a notice under the timetable. Leave the list empty and no
     notice appears.

     IMPORTANT: take past dates out. A closure notice for a date that has
     already gone by makes the whole timetable look out of date.

     To add one, copy a line:
       { what: "Studio closed, no classes", when: "Rosh Hashana, Fri 11 – Sun 13 September" },
     -------------------------------------------------------------------- */
  closures: [
    // The two on the Canva timetable have already passed, so they are not
    // listed here. Sukkot is the next one to add — check the dates with Timmo.
  ],

  /* --------------------------------------------------------------------
     7. FORM (Web3Forms)
     --------------------------------------------------------------------
     Get a key at https://web3forms.com — enter the address that should
     receive the enquiries, then confirm it from that inbox.
     This key is safe to have in a public repository.
     -------------------------------------------------------------------- */
  form: {
    // Web3Forms access key for hello@covehove.co.uk, created 23 September 2026.
    // This is a public key by design — it only ever forwards to the address it
    // was created for, which is why it is safe in a public repository.
    accessKey: "4ed4085c-516a-48c1-819b-f0c02e4ded51",
    // Shown on the page as the address people can email directly, and the
    // address the Web3Forms key must be registered against.
    //
    // hello@covehove.co.uk is a forwarding address on the covehove.co.uk
    // domain, configured in Squarespace. It forwards to the people who
    // actually answer enquiries. Using a covehove.co.uk address rather than a
    // bnjc.co.uk one matters — Cove has to read as its own organisation.
    replyToInbox: "hello@covehove.co.uk",
    // How quickly we say we will reply. Confirm with Beth.
    responseTime: "within one working day"
  },

  /* --------------------------------------------------------------------
     8. GOOGLE ANALYTICS
     --------------------------------------------------------------------
     The GA4 Measurement ID for the property "Cove – temporary site", which
     lives in the BNJC Website account alongside BNJC - GA4 and Sapphire Hove.
     Created 23 September 2026. Reporting in GMT, currency GBP.

     If this is ever reset to the placeholder G-XXXXXXXXXX, analytics simply
     does not load — that is deliberate, not a fault.
     -------------------------------------------------------------------- */
  gaMeasurementId: "G-G4XT8RJ8N7",

  /* --------------------------------------------------------------------
     9. LEGAL
     --------------------------------------------------------------------
     The company named in the privacy notice. Leave empty and the privacy
     page falls back to "Cove Gym & Studio".
     -------------------------------------------------------------------- */
  legalEntity: "",

  /* --------------------------------------------------------------------
     10. LOGO
     --------------------------------------------------------------------
     The logo has not been chosen yet, so the site uses the word "cove" set
     in Fraunces. When the final artwork arrives, drop the SVG files into
     assets/logo/ and set useLogoSvg to true. See assets/logo/README.md.
     -------------------------------------------------------------------- */
  useLogoSvg: false

};
