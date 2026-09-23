import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holler — Child Safety Standards",
  description:
    "Holler's standards against child sexual abuse and exploitation (CSAE), how to report concerns, and our point of contact.",
};

const CONTACT_EMAIL = "alex.richards9595@gmail.com";

export default function HollerChildSafetyPage() {
  return (
    <div className="holler-safety">
      <style>{styles}</style>
      <main className="wrap">
        <h1>Holler — Child Safety Standards</h1>
        <p className="lede">
          Holler (developer: Alexander Richards) has zero tolerance for child
          sexual abuse and exploitation (CSAE) and child sexual abuse material
          (CSAM). These standards describe how we prevent, detect, and respond
          to it, in line with Google Play&rsquo;s Child Safety Standards policy.
        </p>

        <h2>Our standards</h2>
        <p>On Holler, the following are strictly prohibited:</p>
        <ul>
          <li>
            Child sexual abuse material (CSAM) in any form, and any content that
            sexualizes minors.
          </li>
          <li>
            Grooming, sextortion, trafficking, or any other sexual exploitation
            or abuse of a minor.
          </li>
          <li>
            Soliciting, facilitating, or attempting any of the above, or using
            Holler to make contact with a minor for those purposes.
          </li>
        </ul>
        <p>
          Violating these standards results in immediate removal of the content,
          termination of the account, and reporting to the relevant authorities.
        </p>

        <h2>Age requirement</h2>
        <p>
          Holler is not directed to children. Users must be at least 13 years old
          (or the minimum age of digital consent in their country, whichever is
          higher) to create an account. Accounts we identify as belonging to a
          child under the minimum age are removed.
        </p>

        <h2>How to report a concern</h2>
        <p>
          Anyone can report suspected CSAE or CSAM, whether or not they have a
          Holler account.
        </p>
        <ul>
          <li>
            <strong>In the app:</strong> use the &ldquo;⋯&rdquo; menu on any
            status, invite, or profile and choose <strong>Report</strong>. You
            can also block the person from the same menu.
          </li>
          <li>
            <strong>By email:</strong> contact{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Holler%20child%20safety%20report`}
            >
              {CONTACT_EMAIL}
            </a>{" "}
            with any details you can share.
          </li>
        </ul>
        <p>
          We review reports promptly, remove violating content, and take action
          on the accounts involved.
        </p>

        <h2>Compliance and reporting to authorities</h2>
        <p>
          Holler complies with all applicable child safety laws. When we become
          aware of apparent CSAM, we preserve the relevant records and report it
          to the National Center for Missing &amp; Exploited Children (NCMEC)
          and/or the appropriate regional or national authorities, as required
          by law. We cooperate with law enforcement investigations.
        </p>

        <h2>Point of contact</h2>
        <p>
          Our designated child safety point of contact can be reached at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Holler%20child%20safety%20contact`}
          >
            {CONTACT_EMAIL}
          </a>
          . This contact is able to speak to Holler&rsquo;s CSAM prevention and
          compliance practices.
        </p>

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
  .holler-safety {
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
    .holler-safety {
      --hp-bg: #081C37;
      --hp-fg: #e8eef6;
      --hp-muted: #9fb0c6;
      --hp-accent: #6aa8ff;
      --hp-card: #0f2748;
      --hp-border: #1e3a5f;
    }
  }
  .holler-safety .wrap { max-width: 720px; margin: 0 auto; padding: 48px 24px 96px; }
  .holler-safety h1 { font-size: 2rem; line-height: 1.2; margin: 0 0 12px; letter-spacing: -0.02em; }
  .holler-safety h2 { font-size: 1.2rem; margin: 40px 0 10px; letter-spacing: -0.01em; }
  .holler-safety .lede { background: var(--hp-card); border: 1px solid var(--hp-border); border-radius: 12px; padding: 18px 20px; margin: 0 0 8px; }
  .holler-safety ul, .holler-safety ol { padding-left: 22px; }
  .holler-safety li { margin: 8px 0; }
  .holler-safety a { color: var(--hp-accent); }
  .holler-safety footer { margin-top: 48px; color: var(--hp-muted); font-size: 0.9rem; border-top: 1px solid var(--hp-border); padding-top: 20px; }
`;
