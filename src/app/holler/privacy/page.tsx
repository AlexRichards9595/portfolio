import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holler — Privacy Policy",
  description: "Privacy policy for the Holler app.",
};

const SUPPORT_EMAIL = "you@example.com"; // <-- set your public contact email
const LAST_UPDATED = "August 13, 2026";

export default function HollerPrivacyPage() {
  return (
    <div className="holler-privacy">
      <style>{styles}</style>
      <main className="wrap">
        <h1>Holler — Privacy Policy</h1>
        <p className="updated">Last updated: {LAST_UPDATED}</p>

        <p className="lede">
          Holler is a private way to see which friends are free and turn that
          into hanging out. Privacy is the point of the app, so we collect as
          little as possible and never sell your data or use it for advertising.
        </p>

        <p>
          <strong>Who we are:</strong> Holler is operated by Alexander Richards.
          Contact: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Phone number.</strong> Used as your sign-in and your
            identity on Holler. Verification codes are sent by SMS through our
            provider (Twilio).
          </li>
          <li>
            <strong>Profile.</strong> Your first/last name and, optionally, a
            profile photo you choose.
          </li>
          <li>
            <strong>Contacts (hashed only).</strong> If you use &ldquo;Find
            friends from contacts,&rdquo; your device converts each phone number
            to a one-way, salted <strong>SHA-256 hash</strong> and sends only
            those hashes to match against people already on Holler.{" "}
            <strong>
              Your address book is never uploaded in readable form and is not
              stored.
            </strong>
          </li>
          <li>
            <strong>Location (only while posting).</strong> When you post that
            you&rsquo;re free or create an invite, we read your location{" "}
            <strong>once, in the moment</strong>, to suggest where you are. We{" "}
            <strong>never</strong> access location in the background. Coordinates
            for a place you mark as &ldquo;Home&rdquo; are never shared with your
            audience.
          </li>
          <li>
            <strong>Content you create.</strong> Your &ldquo;free&rdquo;
            statuses, invites, and in-plan chat messages. This content is{" "}
            <strong>ephemeral</strong> — it automatically expires and is deleted
            (see Retention).
          </li>
          <li>
            <strong>Notification token.</strong> A device push token so we can
            send you notifications you&rsquo;ve opted into.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> collect analytics, usage tracking,
          advertising identifiers, or diagnostics. There are no third-party
          trackers in Holler.
        </p>

        <h2>How we use it</h2>
        <ul>
          <li>To let you sign in and be recognized by friends (phone, name, photo).</li>
          <li>To help you find friends already on Holler (hashed contact matching).</li>
          <li>
            To show your availability <strong>only</strong> to the people and
            groups you choose.
          </li>
          <li>To coordinate plans (chat, invites) and send notifications you enabled.</li>
        </ul>

        <h2>Who can see your information</h2>
        <p>
          Your availability, location, and plans are shared <strong>only</strong>{" "}
          with the social circles you explicitly choose when posting. People
          outside that audience cannot see it. Recipients don&rsquo;t see who
          else is in your groups. We do not sell or share your personal data with
          third parties for their own purposes.
        </p>

        <h2>Service providers</h2>
        <p>
          We use a small number of processors strictly to run the app:{" "}
          <strong>Supabase</strong> (secure database, storage, and hosting),{" "}
          <strong>Twilio</strong> (sends your SMS verification code),{" "}
          <strong>Google Places</strong> (location search — your query is proxied
          through our server so the API key never touches your device), and{" "}
          <strong>Apple/Google/Expo</strong> push services (deliver
          notifications). These providers process data only to provide their
          service to us.
        </p>

        <h2>Data retention</h2>
        <ul>
          <li>
            <strong>Ephemeral by design:</strong> statuses, invites, and their
            chats expire and are automatically deleted shortly after they end.
          </li>
          <li>
            <strong>Account data</strong> (profile, friends, groups) is kept
            while your account exists.
          </li>
          <li>
            <strong>Delete your account any time</strong> in the app (Profile →
            Account → Delete account). This permanently removes your profile and
            all associated data.
          </li>
        </ul>

        <h2>Your rights</h2>
        <p>
          You can update your profile, control who sees what via groups, and
          delete your account (which erases your data) directly in the app. To
          request a copy of your data or ask a question, contact{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>

        <h2>Security</h2>
        <p>
          Data is protected in transit and at rest. Access is enforced at the
          database level (row-level security), and contact numbers are only ever
          handled as salted hashes for matching.
        </p>

        <h2>Children</h2>
        <p>
          Holler is not directed to children under 13, and we do not knowingly
          collect data from them.
        </p>

        <h2>Changes</h2>
        <p>
          We&rsquo;ll update this policy as the app evolves and revise the
          &ldquo;Last updated&rdquo; date above.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about your privacy:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>

        <footer>© 2026 Alexander Richards. Holler.</footer>
      </main>
    </div>
  );
}

const styles = `
  .holler-privacy {
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
    .holler-privacy {
      --hp-bg: #081C37;
      --hp-fg: #e8eef6;
      --hp-muted: #9fb0c6;
      --hp-accent: #6aa8ff;
      --hp-card: #0f2748;
      --hp-border: #1e3a5f;
    }
  }
  .holler-privacy .wrap { max-width: 720px; margin: 0 auto; padding: 48px 24px 96px; }
  .holler-privacy h1 { font-size: 2rem; line-height: 1.2; margin: 0 0 4px; letter-spacing: -0.02em; }
  .holler-privacy h2 { font-size: 1.2rem; margin: 40px 0 10px; letter-spacing: -0.01em; }
  .holler-privacy .updated { color: var(--hp-muted); font-size: 0.9rem; margin: 0 0 28px; }
  .holler-privacy .lede { background: var(--hp-card); border: 1px solid var(--hp-border); border-radius: 12px; padding: 18px 20px; margin: 0 0 8px; }
  .holler-privacy ul { padding-left: 22px; }
  .holler-privacy li { margin: 8px 0; }
  .holler-privacy a { color: var(--hp-accent); }
  .holler-privacy footer { margin-top: 48px; color: var(--hp-muted); font-size: 0.9rem; border-top: 1px solid var(--hp-border); padding-top: 20px; }
`;
