import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holler — Delete your account",
  description:
    "How to permanently delete your Holler account and associated data, and what is kept.",
};

const SUPPORT_EMAIL = "alex.richards9595@gmail.com";

export default function HollerDeleteAccountPage() {
  return (
    <div className="holler-delete">
      <style>{styles}</style>
      <main className="wrap">
        <h1>Holler — Delete your account</h1>
        <p className="lede">
          Holler (developer: Alexander Richards) lets you permanently delete your
          account and all associated data at any time.
        </p>

        <h2>How to request deletion</h2>
        <p>In the app:</p>
        <ol>
          <li>
            Open Holler and go to the <strong>Profile</strong> tab.
          </li>
          <li>
            Tap <strong>Account</strong>.
          </li>
          <li>
            Tap <strong>Delete account</strong> and confirm.
          </li>
        </ol>
        <p>Your account and data are deleted right away.</p>
        <p>
          If you can&rsquo;t access the app, email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Holler%20account%20deletion`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          from the address on your account and we&rsquo;ll delete it within 30
          days.
        </p>

        <h2>What gets deleted</h2>
        <p>Deleting your account permanently removes:</p>
        <ul>
          <li>Your profile — name, photo, email address, and phone number</li>
          <li>
            Your statuses and invites, and the notes and locations attached to
            them
          </li>
          <li>Your chat messages</li>
          <li>Your friendships and friend requests</li>
          <li>Your groups and shared-group memberships</li>
          <li>Your saved places, preferences, and notification settings</li>
          <li>Your push-notification tokens</li>
        </ul>

        <h2>What is kept, and for how long</h2>
        <p>
          We don&rsquo;t keep your profile or content after deletion, with these
          limited exceptions:
        </p>
        <ul>
          <li>Anonymous, aggregated usage counts that cannot identify you.</li>
          <li>
            Records we are legally required to retain, or limited safety records
            tied to abuse or moderation reports — kept only as long as needed for
            those purposes.
          </li>
          <li>
            Residual copies may remain in encrypted backups and are purged within
            30 days.
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
  .holler-delete {
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
    .holler-delete {
      --hp-bg: #081C37;
      --hp-fg: #e8eef6;
      --hp-muted: #9fb0c6;
      --hp-accent: #6aa8ff;
      --hp-card: #0f2748;
      --hp-border: #1e3a5f;
    }
  }
  .holler-delete .wrap { max-width: 720px; margin: 0 auto; padding: 48px 24px 96px; }
  .holler-delete h1 { font-size: 2rem; line-height: 1.2; margin: 0 0 12px; letter-spacing: -0.02em; }
  .holler-delete h2 { font-size: 1.2rem; margin: 40px 0 10px; letter-spacing: -0.01em; }
  .holler-delete .lede { background: var(--hp-card); border: 1px solid var(--hp-border); border-radius: 12px; padding: 18px 20px; margin: 0 0 8px; }
  .holler-delete ul, .holler-delete ol { padding-left: 22px; }
  .holler-delete li { margin: 8px 0; }
  .holler-delete a { color: var(--hp-accent); }
  .holler-delete footer { margin-top: 48px; color: var(--hp-muted); font-size: 0.9rem; border-top: 1px solid var(--hp-border); padding-top: 20px; }
`;
