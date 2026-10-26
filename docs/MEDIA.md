# Media and branding

`frontend/src/config.ts` holds the replaceable brand name and hero media. Set `VITE_BRAND_NAME` to rename the interface. The database application identifier stays `estateflow` deliberately. Edit the document title and favicon when completing a rebrand.

## Supplied hero reference

The poster and video URLs were supplied in the project brief. They are used remotely for this local design preview only. Ownership and production usage rights have **not** been established. No copy is committed to this repository. Before production, replace both with licensed assets and set `VITE_USE_REFERENCE_MEDIA=false`. Configure `VITE_HERO_POSTER_URL` and `VITE_HERO_VIDEO_URL` with the replacements. Empty media configuration still gives a readable dark background.

The video is muted, inline, looping, and fades in after playback starts. It is mounted only at widths of at least 900px and when reduced motion, reduced data, data saving, and known slow connections do not apply. Changes to those preferences remove it. Autoplay may still be denied by the browser; the poster remains visible. The controls never depend on media loading.

## City photographs

These are editorial city illustrations, not listings. Their metadata was checked on Unsplash. URLs live in `frontend/src/assets/cities.ts`; images request a 640px transformed version and lazy-load. Review the [Unsplash license](https://unsplash.com/license) for your deployment and keep a record of the chosen originals.

| City | Source |
| --- | --- |
| Karachi | [Unsplash Karachi collection, image photo-1617373743747-3bb331fd4e8d](https://unsplash.com/s/photos/karachi) |
| Lahore | [Badshahi Mosque by Shazaf Zafar](https://unsplash.com/photos/brown-and-white-dome-building-under-white-sky-during-daytime-Mxqf5YycXug) |
| Islamabad | [Faisal Mosque by Syed Bilal Javaid](https://unsplash.com/photos/4-post-museum-under-golden-hour-uc9GjDHj1yA) |
| Rawalpindi | [Unsplash Rawalpindi collection, image photo-1617129926580-44e96bf7d0dc](https://unsplash.com/s/photos/rawalpindi) |

The Red Hat Display font is served by Google Fonts under its open font license. The interface has a sans-serif system fallback. For production, consider self-hosting the font to avoid an external request. Lucide icons are provided by the installed Lucide React package. The Google mark identifies the intended future authentication provider and does not indicate a working integration.
