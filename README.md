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
