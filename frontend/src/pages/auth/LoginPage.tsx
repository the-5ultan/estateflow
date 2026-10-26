import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowLeft, LockKeyhole, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Brand } from "../../components/common/Brand";
import { HeroMedia } from "../../components/common/HeroMedia";
import { GoogleButton } from "../../components/auth/GoogleButton";
import { brand } from "../../config";
import { useSystemStatus } from "../../hooks/useSystemStatus";

export default function LoginPage() {
  const reducedMotion = useReducedMotion();
  const status = useSystemStatus();
  const entrance = (delay: number, y = 18) => ({
    initial: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reducedMotion ? 0 : 0.55,
      delay: reducedMotion ? 0 : delay,
      ease: "easeOut" as const,
    },
  });

  return (
    <main className="login-page">
      <HeroMedia />
      <section className="login-hero" aria-label="Welcome to EstateFlow">
        <div className="login-topbar">
          <motion.div {...entrance(0)}>
            <Brand light />
          </motion.div>
          <motion.div {...entrance(0.1)}>
            <Link to="/" className="back-link">
              Back to Website <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
        <div className="login-hero-copy">
          <motion.div {...entrance(0.18)} className="eyebrow hero-eyebrow">
            <span /> YOUR NEXT CHAPTER STARTS HERE
          </motion.div>
          <h1>
            {[
              "Find Your Space.",
              "Build Your Future.",
              "Live Exceptionally.",
            ].map((line, i) => (
              <span className="line-mask" key={line}>
                <motion.span {...entrance(0.25 + i * 0.1, 35)}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p {...entrance(0.6)}>
            Discover remarkable properties across Pakistan and manage every
            opportunity with confidence.
          </motion.p>
          <motion.div
            {...entrance(0.7)}
            className="hero-indicators"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </motion.div>
        </div>
        <motion.div {...entrance(0.75)} className="hero-bottom">
          <span>THOUGHTFUL SPACES. ENDLESS POSSIBILITIES.</span>
          <span>
            PAKISTAN <span className="amber">↗</span>
          </span>
        </motion.div>
      </section>

      <motion.section {...entrance(0.5, 30)} className="auth-card">
        <Link to="/" className="mobile-back">
          <ArrowLeft size={16} /> Back to website
        </Link>
        <div className="card-topline">
          <span className="small-label">A NEW PERSPECTIVE ON PROPERTY</span>
          <span className="tiny-mark">
            <Sparkles size={16} />
          </span>
        </div>
        <div className="auth-content">
          <motion.div {...entrance(0.8)} className="welcome-icon">
            <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path
                d="M8 25V13l8-6 8 6v12h-6v-8h-4v8H8Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M23 5v6m-3-3h6"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
          <motion.div {...entrance(0.85)}>
            <div className="eyebrow auth-eyebrow">MAKE YOURSELF AT HOME</div>
            <h2>Welcome Back!</h2>
            <p className="auth-description">
              Sign in to discover properties and manage your real estate
              journey.
            </p>
          </motion.div>
          <motion.div {...entrance(1)} className="google-wrap">
            <GoogleButton />
          </motion.div>
          <motion.div {...entrance(1.1)} className="auth-note">
            <LockKeyhole size={13} />
            <span>Your next chapter, securely connected.</span>
          </motion.div>
          <motion.div {...entrance(1.15)} className="agent-invite">
            <span>Here to grow your real estate business?</span>
            <Link to="/agents/register">
              Register as an agent <ArrowUpRight size={15} />
            </Link>
          </motion.div>
          <motion.p {...entrance(1.2)} id="oauth-notice" className="phase-note">
            {status.isPending
              ? "Checking platform availability…"
              : status.isError
                ? "Foundation preview · Backend unavailable. Google sign-in is not enabled."
                : "Foundation preview · Google sign-in arrives in Phase 2."}
          </motion.p>
        </div>
        <motion.footer {...entrance(1.05)} className="auth-footer">
          <p>
            By continuing, you agree to our{" "}
            <Link to="/terms">Terms of Service</Link>
            <br className="desktop-break" /> and acknowledge our{" "}
            <Link to="/privacy">Privacy Policy</Link>.
          </p>
          <div>
            <span>
              © {new Date().getFullYear()} {brand.name}
            </span>
            <span>
              Made for new beginnings <span className="amber">✳</span>
            </span>
          </div>
        </motion.footer>
      </motion.section>
    </main>
  );
}
