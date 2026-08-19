import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holler — Support",
  description: "Support and contact for the Holler app.",
};

const SUPPORT_EMAIL = "alex.richards9595@gmail.com";

export default function HollerSupportPage() {
  return (
    <div className="holler-support">
      <style>{styles}</style>
      <main className="wrap">
        <h1>Holler — Support</h1>
        <p className="lede">
          Need help with Holler, have a question, or want to report a problem?
          We&rsquo;re happy to help.
        </p>

        <h2>Contact</h2>
        <p>
          Email us at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Holler%20support`}>
            {SUPPORT_EMAIL}
          </a>
          . We typically respond within a couple of days.
        </p>

        <h2>Common questions</h2>
        <ul>
          <li>
            <strong>How do I sign in?</strong> Use your email and a password, or
            tap <strong>Sign in with Apple</strong> or{" "}
            <strong>Continue with Google</strong>. Adding a phone number is
            optional and only helps friends find you.
          </li>
          <li>
            <strong>How do I add friends?</strong> From your contacts, by phone
            number, or by scanning a friend&rsquo;s QR code — all under Profile →
            Find friends.
          </li>
          <li>
            <strong>How do I delete my account?</strong> Profile → Account →
            Delete account. This permanently removes your profile and all
            associated data.
          </li>
          <li>
            <strong>Who can see my activity?</strong> Only the friends and groups
            you explicitly choose when you post. Holler has no public feed.
          </li>
        </ul>

        <h2>Privacy</h2>
        <p>
          See our <a href="/holler/privacy">Privacy Policy</a> for how Holler
          handles your data.
        </p>

        <footer>© 2026 Alexander Richards. Holler.</footer>
      </main>
    </div>
  );
}

const styles = `
  .holler-support {
    --hp-bg: #ffffff;
    --hp-fg: #1a2230;
    --hp-muted: #5b6675;
    --hp-accent: #0b5bd3;
    --hp-card: #f5f7fa;
    --hp-border: #e2e8f0;
    background: var(--hp-bg);
    color: var(--hp-fg);
    min-height: 100vh;
    font: 16px/1.65 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  @media (prefers-color-scheme: dark) {
    .holler-support {
      --hp-bg: #081C37;
      --hp-fg: #e8eef6;
      --hp-muted: #9fb0c6;
      --hp-accent: #6aa8ff;
      --hp-card: #0f2748;
      --hp-border: #1e3a5f;
    }
  }
  .holler-support .wrap { max-width: 720px; margin: 0 auto; padding: 48px 24px 96px; }
  .holler-support h1 { font-size: 2rem; line-height: 1.2; margin: 0 0 12px; letter-spacing: -0.02em; }
  .holler-support h2 { font-size: 1.2rem; margin: 40px 0 10px; letter-spacing: -0.01em; }
  .holler-support .lede { background: var(--hp-card); border: 1px solid var(--hp-border); border-radius: 12px; padding: 18px 20px; margin: 0 0 8px; }
  .holler-support ul { padding-left: 22px; }
  .holler-support li { margin: 8px 0; }
  .holler-support a { color: var(--hp-accent); }
  .holler-support footer { margin-top: 48px; color: var(--hp-muted); font-size: 0.9rem; border-top: 1px solid var(--hp-border); padding-top: 20px; }
`;
