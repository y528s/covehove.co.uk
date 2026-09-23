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
    email: "bethan.nash@bnjc.co.uk",
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
    // { day: "Monday", time: "7.00am", name: "Strength & Conditioning", room: "Gym" },
  ],

  // Put the timetable PDF in assets/docs/ and write its filename here.
  // Leave it empty ("") and the download link stays hidden.
  timetablePdf: "",

  /* --------------------------------------------------------------------
     7. FORM (Web3Forms)
     --------------------------------------------------------------------
     Get a key at https://web3forms.com — enter the address that should
     receive the enquiries, then confirm it from that inbox.
     This key is safe to have in a public repository.
     -------------------------------------------------------------------- */
  form: {
    accessKey: "",  // TODO before launch: paste the Web3Forms access key here.
    // Shown on the page as the address people can email directly.
    replyToInbox: "bethan.nash@bnjc.co.uk",
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
