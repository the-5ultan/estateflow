import { useEffect, useState } from "react";
import { heroMedia } from "../../config";

interface DataConnection extends EventTarget {
  saveData?: boolean;
  effectiveType?: string;
}

export function HeroMedia({ video = true }: { video?: boolean }) {
  const [allowVideo, setAllowVideo] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const data = window.matchMedia("(prefers-reduced-data: reduce)");
    const desktop = window.matchMedia("(min-width: 900px)");
    const connection = (
      navigator as Navigator & { connection?: DataConnection }
    ).connection;
    const update = () => {
      setReady(false);
      setAllowVideo(
        video &&
          !motion.matches &&
          !data.matches &&
          desktop.matches &&
          !connection?.saveData &&
          !["slow-2g", "2g", "3g"].includes(connection?.effectiveType || ""),
      );
    };
    update();
    [motion, data, desktop].forEach((query) =>
      query.addEventListener("change", update),
    );
    connection?.addEventListener("change", update);
    return () => {
      [motion, data, desktop].forEach((query) =>
        query.removeEventListener("change", update),
      );
      connection?.removeEventListener("change", update);
    };
  }, [video]);

  return (
    <div className="hero-media" aria-hidden="true">
      {heroMedia.poster && (
        <img src={heroMedia.poster} alt="" fetchPriority="high" />
      )}
      {allowVideo && heroMedia.video && (
        <video
          className={ready ? "video-ready" : ""}
          src={heroMedia.video}
          poster={heroMedia.poster}
          muted
          autoPlay
          loop
          playsInline
          preload="none"
          onPlaying={() => setReady(true)}
          onError={() => setReady(false)}
        />
      )}
      <div className="hero-shade" />
    </div>
  );
}
