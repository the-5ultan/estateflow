import { Link, useSearchParams } from "react-router";
import { ArrowLeft, ArrowUpRight, Building2, ShieldCheck } from "lucide-react";
import { PropertySearch } from "../../components/property/PropertySearch";
import { useSystemStatus } from "../../hooks/useSystemStatus";

export default function FoundationPage({
  page,
}: {
  page: "properties" | "agent" | "privacy" | "terms" | "404";
}) {
  const [params] = useSearchParams();
  const status = useSystemStatus();
  const selected = [
    params.get("city"),
    params.get("type"),
    params.get("purpose"),
  ].filter(Boolean);
  const content = {
    properties: {
      title: "Your next space is taking shape.",
      intro:
        "Property browsing arrives in Phase 4. Your selected filters are preserved in the address bar, ready for the real listing API.",
      label: "PROPERTY DISCOVERY",
    },
    agent: {
      title: "Build your next chapter with us.",
      intro:
        "Agent onboarding arrives in Phase 2, after secure Google sign-in is implemented. No registration information is collected in this preview.",
      label: "A WORKSPACE FOR YOUR AMBITION",
    },
    privacy: {
      title: "Privacy, from the foundation.",
      intro:
        "This development preview has no Google sign-in, user registration, or property uploads. When the backend is connected, requesting a CSRF token creates a temporary session cookie. Architectural reference media is served by CloudFront; illustrative city images by Unsplash; fonts by Google Fonts. Those providers receive standard network information such as your IP address. A full privacy policy must be reviewed before a public launch.",
      label: "DEVELOPMENT PRIVACY NOTICE",
    },
    terms: {
      title: "A foundation for what comes next.",
      intro:
        "This is an unfinished development preview, not a live property marketplace. No listings, transactions, agent registrations, or legal agreements are offered here. Production terms, media permissions, and operational policies must be completed before launch.",
      label: "DEVELOPMENT TERMS NOTICE",
    },
    "404": {
      title: "A little off the map.",
      intro:
        "We couldn’t find that page. Your next chapter is still waiting on the homepage.",
      label: "PAGE NOT FOUND",
    },
  }[page];
  return (
    <main id="main-content" className="foundation-page container">
      <Link to="/" className="text-link">
        <ArrowLeft size={16} /> Back to home
      </Link>
      <div className="foundation-icon">
        {page === "privacy" ? (
          <ShieldCheck size={32} />
        ) : (
          <Building2 size={32} />
        )}
      </div>
      <span className="eyebrow">{content.label}</span>
      <h1>{content.title}</h1>
      <p>{content.intro}</p>
      {page === "properties" && (
        <>
          <div className="filter-chips">
            {selected.map((value) => (
              <span key={value}>{value?.replaceAll("_", " ")}</span>
            ))}
          </div>
          <PropertySearch />
        </>
      )}
      {page === "agent" && (
        <>
          <ul className="agent-benefits">
            <li>A dedicated space for your agency</li>
            <li>Public and private property management</li>
            <li>Clear payment and installment records</li>
          </ul>
          <Link to="/login" className="button button-dark">
            Preview sign-in <ArrowUpRight size={16} />
          </Link>
        </>
      )}
      {(page === "agent" || page === "properties") && (
        <div className="connection-note" role="status">
          {status.isPending
            ? "Checking backend connection…"
            : status.isError
              ? "Backend unavailable. Start Spring Boot to connect this preview."
              : `Backend connected · Phase ${status.data.phase} foundation · ${page === "agent" ? "Registration" : "Property browsing"} is not enabled.`}
        </div>
      )}
    </main>
  );
}
