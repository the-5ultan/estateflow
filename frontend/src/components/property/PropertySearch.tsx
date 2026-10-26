import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { MapPin, Search, Building2 } from "lucide-react";

export function PropertySearch() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [purpose, setPurpose] = useState(
    params.get("purpose") === "RENT" ? "RENT" : "SALE",
  );
  const [city, setCity] = useState(() =>
    ["Karachi", "Lahore", "Islamabad", "Rawalpindi"].includes(
      params.get("city") || "",
    )
      ? params.get("city")!
      : "",
  );
  const [type, setType] = useState(() =>
    ["HOUSE", "APARTMENT", "PLOT", "COMMERCIAL"].includes(
      params.get("type") || "",
    )
      ? params.get("type")!
      : "",
  );
  function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({ purpose });
    if (city) params.set("city", city);
    if (type) params.set("type", type);
    navigate(`/properties?${params.toString()}`);
  }
  return (
    <form
      onSubmit={submit}
      className="property-search"
      aria-label="Property search"
    >
      <div className="purpose-tabs" aria-label="Listing purpose">
        {[
          ["SALE", "Buy a property"],
          ["RENT", "Rent a property"],
        ].map(([value, label]) => (
          <button
            type="button"
            aria-pressed={purpose === value}
            className={purpose === value ? "selected" : ""}
            key={value}
            onClick={() => setPurpose(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="search-fields">
        <label>
          <MapPin size={20} />
          <span>
            <span className="field-label">LOCATION</span>
            <select
              aria-label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">All cities</option>
              {["Karachi", "Lahore", "Islamabad", "Rawalpindi"].map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </span>
        </label>
        <label>
          <Building2 size={20} />
          <span>
            <span className="field-label">PROPERTY TYPE</span>
            <select
              aria-label="Property type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Any property</option>
              <option value="HOUSE">House</option>
              <option value="APARTMENT">Apartment</option>
              <option value="PLOT">Plot</option>
              <option value="COMMERCIAL">Commercial</option>
            </select>
          </span>
        </label>
        <button type="submit" className="button button-amber">
          <Search size={18} /> Find your space
        </button>
      </div>
    </form>
  );
}
