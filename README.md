# My OT Tracker — English Edition

A mobile-first PWA for personal overtime tracking. All main interface labels, notifications, reports, and 36 motivational messages are in English.

## Deploy to GitHub Pages

1. Extract the ZIP file.
2. Upload **all files in the ZIP** to the root of your existing `My-OT-Tracker` repository (replace files with the same names).
3. Keep `index.html`, `app.mjs`, `core.mjs`, `style.css`, `sw.js`, and `manifest.webmanifest` in the same folder.
4. Refresh the GitHub Pages website. If an old version appears, close/reopen the tab or clear the site's cache (do not delete site storage without exporting a backup).
5. On Android Chrome, choose Add to Home Screen / Install app.

## Behavior unchanged
- Fixed overtime hourly rate IDR 33,121 and salary reference IDR 5,730,100; independent settings.
- Alternating weekly shifts start Monday, November 16, 2026, morning first, with no monthly or annual reset.
- Every Sunday and Saturdays in afternoon-shift weeks are mandatory rest days; working these dates uses rest-day multiplier even if an official roster indicates work.
- Exact break overlap rules, multiple intervals, midnight crossing, roster overrides, and local IndexedDB storage are preserved.
- IndexedDB saved records are preserved when updating files on the same URL. Back up before updating as a precaution.

## Notes
- CSV supports offline import. XLS/XLSX requires the external Excel parser to load at least once online.
- The browser's native date/time pickers may use the device's regional formatting.
- Currency remains IDR. This edition uses English number formatting.
- Current report PDFs use the browser's Print / Save as PDF.


## Mobile fit update (v9)
- Larger touch targets, readable 16px inputs, and full-width layout on Android phones.
- Respects safe-area insets and prevents horizontal overflow.
- All business rules and calculations are unchanged.
- The old installed PWA may need to be closed/reopened or its page refreshed after GitHub Pages deploys.
- Make a JSON backup in Settings before any update. Do not uninstall or clear site data to refresh, since that can delete records.

## v10 update
- Automatic rotation of all 36 quotes; no manual arrows.
- Before Shift / After Shift / Both / Rest Day / Custom selection.
- Start/end time only; dates inferred for overnight overtime.
- For afternoon shift, After Shift defaults to 01:00–03:00 on the next day.
- Two overtime sessions share a single work-date calculation (first-hour premium applied once).
- Guard: normal scheduled shift intervals cannot be included in weekday overtime.
- Historical records and snapshots remain stored. Export JSON backup before updating.

- One saved overtime entry per work date: edit it to add both sessions, so the first-hour multiplier is not accidentally applied twice.


## v11 Performance optimization
- Render only the active screen; don't rebuild full calendar, reports, and chart together.
- Prefer cached static files to avoid slow loading on Android and support offline.
- Navigation falls back to the local offline page after a short network timeout.
- 36 motivational quotes still rotate every 5.5 seconds when Home is visible.
- No changes to salaries, overtime multipliers, shift rules, or saved database schema.
- Before deploying: Settings → Download JSON backup. Do not clear app/site data.


## v12 — Mobile full-width + faster startup
- Mobile content fills the available viewport, including installed PWA mode. Inputs are larger and cards take less vertical space on smaller phones.
- Startup uses cached app shell instantly when available, instead of waiting up to 1.8 s for the network.
- Reinstalling or clearing browser data is NOT needed. Back up records first, then upload all v12 files to the same GitHub Pages repository.
- On Android Chrome, disable **Desktop site** for the app URL if enabled. The layout responds to actual viewport size.
- All payroll calculations, shift rules, and stored database remain unchanged.


## v13 Payroll / mobile readability
- Payroll cutoff is the 16th through 15th, keyed by the month in which it ends. Dashboard and report now use this cutoff, rather than calendar months. Existing overtime records remain unchanged.
- Salary reference defaults to Rp5,730,100; employee JHT 2% and JPN 1%, both assumed calculated from salary (not overtime).
- Tax status TK/0, TER Category A according to PP 58/2023; PPh 21 applied to taxable gross (salary + overtime + optionally other taxable income) **before** JHT/JPN employee contributions. Full A rate schedule through 34% is included.
- Any employer-paid taxable benefit, non-salary payroll item or altered contribution base must be handled by comparing to actual payslip; TER is an estimate.
- December/last tax period must be reconciled annually under PMK 168/2023. Manual PPh 21 override is provided for payslip alignment, stored for the dashboard-selected payroll period only.
- Payroll cutoff date is separate from actual tax period/payment; the exact payroll-to-tax mapping depends on employer payout dates.
- Larger mobile typography throughout main, history and inputs.
- Back up local IndexedDB data before updating; do not uninstall or clear app data.
- Legal basis: https://jdih.kemenkeu.go.id/api/download/e47c3fc4-a912-4bf1-bcad-335fee3f71f8/2023pp058.pdf and https://jdih.kemenkeu.go.id/api/download/e60a82e0-b218-40f5-9d18-b924aa1e11ce/2023pmkeuangan168.pdf
