"use client";

import { useEffect, useMemo, useState } from "react";

// Deep link the app listens for. The AuthProvider turns the forwarded auth
// payload (access/refresh token or code) into a signed-in session.
const APP_LINK = "holler://auth-callback";
// Filled in once Holler is live on the App Store, e.g. https://apps.apple.com/app/id0000000000
const APP_STORE_URL = "";

type Status = "working" | "ready" | "error";

export default function HollerConfirmedPage() {
  const [status, setStatus] = useState<Status>("working");
  const [deepLink, setDeepLink] = useState<string>(APP_LINK);

  useEffect(() => {
    // Supabase appends the session to the URL — tokens in the hash (implicit
    // flow) or a code in the query (PKCE). Forward whatever is there to the app.
    const query = window.location.search.replace(/^\?/, "");
    const hash = window.location.hash.replace(/^#/, "");
    const combined = [query, hash].filter(Boolean).join("&");
    const params = new URLSearchParams(combined);

    if (params.get("error_description") || params.get("error")) {
      setStatus("error");
      return;
    }

    const hasPayload =
      params.get("access_token") || params.get("code") || params.get("token_hash");
    const link = combined ? `${APP_LINK}#${combined}` : APP_LINK;
    setDeepLink(link);
    setStatus("ready");

    if (hasPayload) {
      // Try to hand off to the app automatically. On mobile this opens Holler
      // and logs the user straight in; desktop browsers just ignore it and the
      // user sees the manual button below.
      const t = setTimeout(() => {
        window.location.href = link;
      }, 400);
      return () => clearTimeout(t);
    }
  }, []);

  const heading = useMemo(() => {
    if (status === "error") return "This link has expired";
    return "Email confirmed";
  }, [status]);

  return (
    <div className="holler-confirmed">
      <style>{styles}</style>
      <main className="wrap">
        <div className="mark" aria-hidden>
          H
        </div>

        {status === "error" ? (
          <>
            <h1>{heading}</h1>
            <p className="lede">
              This confirmation link has expired or was already used. Open Holler
              and sign in — or request a new confirmation email from the app.
            </p>
            <a className="btn" href={APP_LINK}>
              Open Holler
            </a>
          </>
        ) : (
          <>
            <h1>{heading} ✅</h1>
            <p className="lede">
              You&rsquo;re all set. We&rsquo;re opening Holler to sign you in&hellip;
            </p>
            <a className="btn" href={deepLink}>
              Open Holler
            </a>
            <p className="fine">
              Didn&rsquo;t open automatically? Tap the button above from your
              phone.
            </p>
          </>
        )}

        {APP_STORE_URL ? (
          <p className="fine">
            Don&rsquo;t have the app yet?{" "}
            <a href={APP_STORE_URL}>Get Holler on the App Store</a>.
          </p>
        ) : null}
      </main>
    </div>
  );
}

const styles = `
  .holler-confirmed {
    --hp-bg: #ffffff;
    --hp-fg: #1a2230;
    --hp-muted: #5b6675;
    --hp-accent: #F2A65A;
    --hp-navy: #081C37;
    --hp-onaccent: #1F2A33;
    --hp-border: #e2e8f0;
    background: var(--hp-bg);
    color: var(--hp-fg);
    min-height: 100vh;
    font: 16px/1.65 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  @media (prefers-color-scheme: dark) {
    .holler-confirmed {
      --hp-bg: #081C37;
      --hp-fg: #e8eef6;
      --hp-muted: #9fb0c6;
      --hp-border: #1e3a5f;
    }
  }
  .holler-confirmed .wrap { max-width: 480px; margin: 0 auto; padding: 96px 24px; text-align: center; }
  .holler-confirmed .mark {
    width: 64px; height: 64px; margin: 0 auto 24px; border-radius: 16px;
    background: var(--hp-navy); color: #fff; font-weight: 800; font-size: 36px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 24px rgba(8,28,55,0.25);
  }
  .holler-confirmed h1 { font-size: 1.8rem; line-height: 1.2; margin: 0 0 12px; letter-spacing: -0.02em; }
  .holler-confirmed .lede { color: var(--hp-muted); margin: 0 0 24px; }
  .holler-confirmed .btn {
    display: inline-block; background: var(--hp-accent); color: var(--hp-onaccent);
    font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 12px;
  }
  .holler-confirmed .btn:hover { opacity: 0.92; }
  .holler-confirmed .fine { color: var(--hp-muted); font-size: 0.85rem; margin: 20px 0 0; }
  .holler-confirmed .fine a { color: var(--hp-accent); }
`;
