# Logo

**The logo is deliberately not used on this site yet.**

The branding meeting has not chosen a mark, and the handoff was explicit: use the
colour scheme, not a logo. So the header and footer set the word **cove** as type —
Fraunces Light, lowercase, navy on cream (cream on navy in the footer) — with
"Gym & Studio · Hove" as a small spaced-out descriptor beside it.

That is a considered placeholder, not an oversight. Please do not swap a mark in
before the decision is made.

## When the logo is chosen

1. Export the final artwork as SVG and put three files in **this folder**:

   | File | What it is |
   |---|---|
   | `cove-wordmark.svg` | The full wordmark, navy — used on cream backgrounds |
   | `cove-wordmark-reversed.svg` | The full wordmark, cream — used on navy backgrounds |
   | `cove-symbol.svg` | The symbol on its own — for the favicon and avatars |

   Keep the names exactly as above. Trim the artboard tight to the artwork; the
   header sizes the wordmark to 1.85rem tall and the CSS handles the spacing.

2. Open `config.js` and change the last setting:

   ```js
   useLogoSvg: true
   ```

   That is the whole swap. The header and footer pick up the SVGs on the next reload.

3. Replace the three favicon files in `assets/favicon/` from `cove-symbol.svg`:
   `favicon.svg`, `favicon-32.png` (32×32) and `apple-touch-icon.png` (180×180).
   The current ones are a plain lowercase "c" placeholder, not a mark.

4. Replace `assets/img/og-image.jpg` (1200×630) with a version carrying the real
   logo — the current one is type only.

## Clear space and minimum size

From the brand deck: clear space on all sides is at least the height of the "c",
and the symbol is never used below 32px.

## `candidates/`

The four options from the brand deck, as supplied for reference. **Nothing in this
site links to them.** They are here so the swap is quick once a decision is made —
delete the folder if you would rather not have them in the repository.

| File | Deck option |
|---|---|
| `cove_curve_wordmark.svg`, `cove_curve_wordmark_reversed.svg`, `cove_curve_icon.svg` | Option 04, the Cove Curve — recommended, 19/20 |
| `pebble_A_shoreline.svg`, `pebble_B_beach.svg`, `pebble_C_bay.svg` | Pebble |
| `arcade_A_three_arches.svg`, `arcade_A_mirrored.svg`, `arcade_B_bold.svg` | Arcade |
| `circle_A_full_ring.svg`, `circle_B_open_ring.svg` | Circle |

Note that these candidate files use the deck's working colours (`#123F4E`,
`#2B7C8A`, `#E0B35F`), not the Palette A values this site is built on
(`#112337`, `#1E9C92`, `#E2BB70`). Whichever mark wins will need recolouring to
the final palette before it goes in.
