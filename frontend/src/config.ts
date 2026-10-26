const referenceRoot =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P";
const referenceEnabled = import.meta.env.VITE_USE_REFERENCE_MEDIA !== "false";

export const brand = {
  name: import.meta.env.VITE_BRAND_NAME || "EstateFlow",
  tagline: "A place for your next chapter.",
};

// Reference-only media. Replace with licensed, self-hosted assets before production.
export const heroMedia = {
  poster:
    import.meta.env.VITE_HERO_POSTER_URL ||
    (referenceEnabled
      ? `${referenceRoot}/e781b542-a83d-4cf2-a66a-44085485865d.jpg`
      : ""),
  video:
    import.meta.env.VITE_HERO_VIDEO_URL ||
    (referenceEnabled
      ? `${referenceRoot}/197f7e27-faac-4bdc-916c-615ac962bf86.mp4`
      : ""),
};
