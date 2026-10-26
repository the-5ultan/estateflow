import { Link } from "react-router";
import {
  ArrowUpRight,
  ArrowRight,
  House,
  Building2,
  LandPlot,
  Store,
  MoveUpRight,
} from "lucide-react";
import { HeroMedia } from "../../components/common/HeroMedia";
import { PropertySearch } from "../../components/property/PropertySearch";
import { cities } from "../../assets/cities";

const types = [
  {
    name: "Houses",
    value: "HOUSE",
    Icon: House,
    description: "Room to make it yours.",
  },
  {
    name: "Apartments",
    value: "APARTMENT",
    Icon: Building2,
    description: "City living, reimagined.",
  },
  {
    name: "Plots",
    value: "PLOT",
    Icon: LandPlot,
    description: "A foundation for your vision.",
  },
  {
    name: "Commercial",
    value: "COMMERCIAL",
    Icon: Store,
    description: "Space for your next big idea.",
  },
];

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <HeroMedia video={false} />
        <div className="container home-hero-content">
          <span className="eyebrow hero-eyebrow">
            <span /> ROOTED IN PAKISTAN. BUILT AROUND YOU.
          </span>
          <h1>
            Every great story
            <br />
            starts with <em>a space.</em>
          </h1>
          <p>
            A first home. A fresh start. A bigger ambition.
            <br />
            Find the place that brings your next chapter to life.
          </p>
          <a className="hero-explore" href="#discover">
            Explore the possibilities <ArrowUpRight size={18} />
          </a>
        </div>
        <span className="hero-caption">
          NEW PERSPECTIVES. LASTING POSSIBILITIES.
        </span>
      </section>
      <div className="container search-container">
        <PropertySearch />
      </div>
      <section className="section container" id="discover">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SPACES WORTH DISCOVERING</span>
            <h2>A place to call your own.</h2>
          </div>
          <Link to="/properties" className="text-link">
            Explore properties <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="listing-empty">
          <div className="empty-illustration">
            <House size={36} strokeWidth={1.2} />
          </div>
          <div>
            <span className="small-label">SOMETHING GOOD IS TAKING SHAPE</span>
            <h3>Your next address is on its way.</h3>
            <p>
              Property listings will be available when browsing launches.
              <br />
              For now, discover the spaces and cities that feel like you.
            </p>
          </div>
          <span className="outline-tag">PLATFORM FOUNDATION</span>
        </div>
      </section>
      <section className="type-section">
        <div className="container section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR LIFE. YOUR KIND OF SPACE.</span>
              <h2>What feels like your next move?</h2>
            </div>
            <p>
              From the everyday to the extraordinary,
              <br />
              there’s a space for every ambition.
            </p>
          </div>
          <div className="type-grid">
            {types.map(({ name, value, Icon, description }) => (
              <Link
                key={value}
                to={`/properties?type=${value}`}
                className="type-card"
              >
                <Icon size={30} strokeWidth={1.3} />
                <ArrowUpRight className="type-arrow" size={18} />
                <h3>{name}</h3>
                <p>{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FIND YOUR CORNER OF PAKISTAN</span>
            <h2>Different cities. Endless possibilities.</h2>
          </div>
          <span className="small-label">A PLACE TO BELONG ↗</span>
        </div>
        <div className="city-grid">
          {cities.map((city) => (
            <Link
              to={`/properties?city=${city.name}`}
              className="city-card"
              key={city.name}
            >
              <img
                className="city-photo"
                src={city.image}
                alt=""
                loading="lazy"
                width="640"
                height="800"
              />
              <span className="city-number">0{cities.indexOf(city) + 1}</span>
              <div>
                <span>{city.label}</span>
                <h3>
                  {city.name} <MoveUpRight size={24} />
                </h3>
              </div>
            </Link>
          ))}
        </div>
        <p className="city-caption">
          Explore by city · City imagery is illustrative; live listings arrive
          in a later phase.
        </p>
      </section>
      <section className="container agent-cta">
        <div>
          <span className="eyebrow">FOR THE PEOPLE BEHIND THE PROPERTIES</span>
          <h2>
            Your expertise.
            <br />A world of opportunity.
          </h2>
          <p>
            A thoughtful workspace for your listings, your agency,
            <br />
            and the relationships that move your business forward.
          </p>
          <Link to="/agents/register" className="button button-dark">
            Build your agency’s next chapter <ArrowRight size={18} />
          </Link>
        </div>
        <div className="cta-art" aria-hidden="true">
          <Building2 size={110} strokeWidth={0.7} />
          <span>
            GOOD SPACES.
            <br />
            GREAT CONNECTIONS.
          </span>
          <ArrowUpRight size={48} strokeWidth={1} />
        </div>
      </section>
    </main>
  );
}
