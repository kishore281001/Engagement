# Natarajan & Aarthi · Engagement Invitation

A complete, editable static website in Tamil and English.

**22 November 2026 · 10:00 AM IST**  
**Srinivasa Raja Thirumana Mandapam, Nanmangalam, Chennai**

## Open in VS Code

1. Extract this ZIP completely.
2. In VS Code, choose **File → Open Folder** and select `Natarajan-Aarthi-Invitation`.
3. With Node.js 18 or newer installed, open the terminal and run:

   ```sh
   npm start
   ```

4. Open **http://127.0.0.1:5500**.

There are no dependencies to install. `npm run dev` does the same thing. The supplied Node server supports video byte ranges. Alternatively, install the recommended **Live Server** VS Code extension, right-click `index.html`, and choose **Open with Live Server**. Use a local server instead of double-clicking the HTML for reliable clipboard behaviour.

## Edit the invitation

- `index.html`: names, date text, Tamil/English messages and family details. Each bilingual text element has `data-en` and `data-ta`; update both.
- `config.js`: venue address, exact Maps link, verified latitude/longitude and travel-provider options.
- `app.js`: countdown timestamp and calendar event, language switching and interactions.
- `scratch-v3.js`: real mouse/touch scratch-card interaction.
- `entrance.css` / `mobile-travel-v6.css`: realistic doors. On phones, the door leaves occupy the full viewport, with original image proportions preserved through cropping.
- `ivory-theme-v5.css`: shared ivory, deep teal and antique-gold colours.
- `video-v4.css`: closing video layout. The original source is 854×480; it is displayed at a smaller size and plays once with replay.
- `assets/`: all supplied/generated site imagery and the processed ring video.

Parents: groom — K. Palani and P. Krishnaveni; bride — M. Elumalai and E. Uma. No attendance form or RSVP tracking is included.

## Venue and calendar

The host-supplied Maps link is configured: https://maps.app.goo.gl/cT8Sg9sUsTBXuwWZ7
Coordinates taken from the supplied embed: **12.9407148, 80.1783449**. Update `config.js` if the venue pin changes.

The calendar button opens Google Calendar with the title, **22 November 2026 at 10:00 AM IST**, address and Maps link already filled in. Each guest taps Save in their own Google account. The ceremony end time was not supplied, so the template uses a start-time-only event; guests may set their own duration.

`mobile-v8.css` adjusts typography, spacing, dialog sizing and touch targets for phones, including 375×667 and 425×812, in English and Tamil. The entrance fills the viewport. Reduced-motion preferences remain respected.

## Travel buttons: what is supported

The website prepares links and attempts to open the installed provider app. It **does not book or pay for a ride**. Guests must confirm pickup, destination and fare inside their chosen service.

| Service | Implemented behaviour | What is still needed for exact destination prefill |
| --- | --- | --- |
| Uber | Official ride-request universal link, current-location pickup, venue name, address and host-supplied numeric drop-off | Optional registered Uber client ID. Confirm native handoff on a physical phone. |
| Ola | Documented destination fields are attached to app-launch URI and web fallback; Android intent attempts app handoff | **An Ola-issued affiliate identifier** in `olaPartnerToken` is required by Ola for supported prefill. Without it, the destination request is best effort and may be ignored. No fake token is included. |
| Rapido | Android app-link attempt targeting the official passenger package; official website on other devices; venue address copied on tap | A provider-approved destination link, if available, in `rapidoApprovedLink`. Public venue-prefill support could not be verified. |
| redBus | Android app-link attempt targeting the official app; Chennai bus page fallback; venue address copied | A provider-approved journey link, if available, in `redbusApprovedLink`. redBus bus journeys are to Chennai, not a street-address wedding hall; the guest must choose their departure city. |

App opening can be blocked or redirected by a browser, an in-app webview, OS settings, or a missing app. Clipboard permission can also be refused. The normal Copy Address button, Maps link and provider website fallback remain available. Android/iOS app dispatch needs physical-device testing; desktop preview cannot prove a native-app handoff.

Only enter public, provider-approved link identifiers in browser configuration. Do not insert private API secrets.

Primary provider documentation checked during implementation:
- https://developer.uber.com/docs/riders/ride-requests/tutorials/deep-links/introduction
- https://developer.uber.com/docs/riders/ride-requests/tutorials/deep-links/faq
- https://developers.olacabs.com/docs/deep-linking

## Validate

```sh
npm test
```

Tests check destination encoding, missing/invalid coordinates, Ola's partner prerequisite, correct Android package and fallback encoding, approved provider links, and Maps configuration. They do not simulate a real installed mobile app.

## Hosting and sharing

Upload this folder's contents to any static HTTPS hosting service. No build step or backend is required. For WhatsApp previews after rehosting, change the absolute `og:image` URL in `index.html` to your new domain. Share the deployed HTTPS URL, not a localhost URL. Fonts load from Google Fonts; all site imagery and video are included locally, with system font fallbacks.

The existing ChatGPT-hosted review version remains private until the owner explicitly changes its sharing settings.
