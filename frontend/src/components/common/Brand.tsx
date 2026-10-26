import { Link } from "react-router";
import { brand } from "../../config";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label={`${brand.name} home`}
    >
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M6 25V13L16 6l10 7v12h-7V15h-6v10H6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M16 6v7M6 13l7 4m13-4-7 4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </span>
      <span>
        {brand.name}
        <span className="brand-dot">.</span>
      </span>
    </Link>
  );
}
