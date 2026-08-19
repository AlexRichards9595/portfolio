import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holler — See who's free",
  description:
    "Holler is a private, friends-only way to see which friends are around and turn that into hanging out.",
};

const SUPPORT_EMAIL = "alex.richards9595@gmail.com";

export default function HollerHomePage() {
  return (
    <div className="holler-home">
      <style>{styles}</style>
      <main className="wrap">
        <header className="hero">
          <div className="mark" aria-hidden>
            H
          </div>
          <h1>Holler</h1>
          <p className="tagline">
            A private way to see which friends are free — and turn that into
            hanging out.
          </p>
        </header>

        <section className="features">
          <div className="feature">
            <h3>Who&rsquo;s free?</h3>
            <p>
              Share when you&rsquo;re around and see friends who are too. No
              public feed, no followers — just the people you actually know.
            </p>
          </div>
          <div className="feature">
            <h3>Make the plan</h3>
            <p>
              Turn &ldquo;I&rsquo;m free&rdquo; into a real hang. Post an invite,
              pick who sees it, and chat to sort out the details.
            </p>
          </div>
          <div className="feature">
            <h3>Private by design</h3>
            <p>
              You choose exactly who sees each status. Contacts are matched as
              secure one-way hashes — your address book is never uploaded in
              readable form.
            </p>
          </div>
        </section>

        <section className="cta">
          <h2>Get Holler</h2>
          <p>Holler is coming to the App Store. Sign in with email, Apple, or Google.</p>
          <div className="links">
            <a href="/holler/privacy">Privacy Policy</a>
            <span aria-hidden>·</span>
            <a href="/holler/support">Support</a>
            <span aria-hidden>·</span>
            <a href={`mailto:${SUPPORT_EMAIL}?subject=Holler`}>Contact</a>
          </div>
        </section>

        <footer>© 2026 Alexander Richards. Holler.</footer>
      </main>
    </div>
  );
}

const styles = `
  .holler-home {
    --hp-bg: #ffffff;
    --hp-fg: #1a2230;
    --hp-muted: #5b6675;
    --hp-accent: #F2A65A;
    --hp-navy: #081C37;
    --hp-card: #f5f7fa;
    --hp-border: #e2e8f0;
    background: var(--hp-bg);
    color: var(--hp-fg);
    min-height: 100vh;
    font: 16px/1.65 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  @media (prefers-color-scheme: dark) {
    .holler-home {
      --hp-bg: #081C37;
      --hp-fg: #e8eef6;
      --hp-muted: #9fb0c6;
      --hp-accent: #F2A65A;
      --hp-card: #0f2748;
      --hp-border: #1e3a5f;
    }
  }
  .holler-home .wrap { max-width: 760px; margin: 0 auto; padding: 56px 24px 96px; }
  .holler-home .hero { text-align: center; margin-bottom: 56px; }
  .holler-home .mark {
    width: 72px; height: 72px; margin: 0 auto 20px; border-radius: 18px;
    background: var(--hp-navy); color: #fff; font-weight: 800; font-size: 40px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 24px rgba(8,28,55,0.25);
  }
  .holler-home h1 { font-size: 2.6rem; line-height: 1.1; margin: 0 0 12px; letter-spacing: -0.03em; }
  .holler-home .tagline { font-size: 1.25rem; color: var(--hp-muted); margin: 0 auto; max-width: 30ch; }
  .holler-home .features { display: grid; gap: 16px; grid-template-columns: 1fr; }
  @media (min-width: 640px) { .holler-home .features { grid-template-columns: repeat(3, 1fr); } }
  .holler-home .feature { background: var(--hp-card); border: 1px solid var(--hp-border); border-radius: 14px; padding: 20px; }
  .holler-home .feature h3 { margin: 0 0 8px; font-size: 1.05rem; letter-spacing: -0.01em; }
  .holler-home .feature p { margin: 0; color: var(--hp-muted); font-size: 0.95rem; }
  .holler-home .cta { text-align: center; margin-top: 56px; padding-top: 40px; border-top: 1px solid var(--hp-border); }
  .holler-home .cta h2 { font-size: 1.5rem; margin: 0 0 8px; letter-spacing: -0.02em; }
  .holler-home .cta p { color: var(--hp-muted); margin: 0 0 20px; }
  .holler-home .links { display: flex; gap: 10px; align-items: center; justify-content: center; flex-wrap: wrap; }
  .holler-home .links a { color: var(--hp-accent); font-weight: 600; text-decoration: none; }
  .holler-home .links a:hover { text-decoration: underline; }
  .holler-home .links span { color: var(--hp-muted); }
  .holler-home footer { margin-top: 56px; color: var(--hp-muted); font-size: 0.9rem; text-align: center; }
`;
