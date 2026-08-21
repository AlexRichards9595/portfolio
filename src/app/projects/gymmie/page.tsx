import type { Metadata } from "next";
import Link from "next/link";
import { Poppins } from "next/font/google";
import React from "react";
import { Reveal } from "@/components/Reveal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gymmie — Product Concept",
  description:
    "Gymmie is a workout tracker so good you'd use it alone, connected to your friends so training becomes social. A premium product concept.",
};

/* ── Brand logo ─────────────────────────────────────────────────────────────
 * The source PNG (public/gymmie-logo.png) is the black lockup; `invert` renders
 * it white on the dark theme. A transparent-background PNG looks cleanest. */
function GymmieLogo({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/gymmie-logo.png" alt="gymmie" className={`w-auto select-none invert ${className}`} />;
}

/* ── Device frames ─────────────────────────────────────────────────────────── */
function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[266px] shrink-0 rounded-[2.6rem] border border-white/10 bg-black p-2.5 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]">
      <div className="relative overflow-hidden rounded-[2.05rem] bg-[#161615] text-[#F7F7F5]">
        <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-white/15" />
        {children}
      </div>
    </div>
  );
}

function Watch({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[168px] shrink-0 rounded-[2.9rem] border border-white/10 bg-[#1c1c1a] p-2 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.85)]">
      <div className="rounded-[2.3rem] bg-black px-4 py-5 text-white">{children}</div>
    </div>
  );
}

/* ── Small primitives ──────────────────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#8A8A85]">{children}</p>
  );
}

function Section({
  children,
  bg = "base",
  className = "",
}: {
  children: React.ReactNode;
  bg?: "base" | "lift" | "deep";
  className?: string;
}) {
  const surface = bg === "deep" ? "bg-black" : bg === "lift" ? "bg-[#161615]" : "bg-[#0E0E0E]";
  return (
    <section className={`${surface} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">{children}</div>
    </section>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-[#1A1A18] p-6 ${className}`}>{children}</div>
  );
}

function Lift({ children, pr = false }: { children: React.ReactNode; pr?: boolean }) {
  return <span className={`tabular-nums font-medium ${pr ? "text-[#D6A72C]" : ""}`}>{children}</span>;
}

export default function GymmieConcept() {
  return (
    <div className={`${poppins.className} min-h-screen bg-[#0E0E0E] text-[#F7F7F5] antialiased`}>
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0E0E0E]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <GymmieLogo className="h-7" />
          <div className="flex items-center gap-5">
            <span className="hidden text-sm text-[#8A8A85] sm:inline">Product concept</span>
            <Link
              href="/projects"
              className="text-sm font-medium text-[#F7F7F5] underline-offset-4 hover:underline"
            >
              ← Projects
            </Link>
          </div>
        </div>
      </header>

      {/* 1 · HERO */}
      <section className="bg-[#0E0E0E]">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 lg:pt-24">
          <Reveal>
            <GymmieLogo className="h-11" />
            <h1 className="mt-8 max-w-4xl text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              Your workout.
              <br />
              Your progress.
              <br />
              Your people.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#C4C4BF]">
              An intuitive workout tracker with a social network built around actually training. Log
              your workouts, track progress, share PRs, follow friends, swap programs, and train from
              your phone, Watch, or voice.
            </p>
            <p className="mt-5 text-sm font-medium text-[#8A8A85]">
              A workout tracker so good you&rsquo;d use it alone — connected to your friends so training
              becomes social.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-wrap items-end justify-center gap-8 lg:gap-14">
              <Phone>
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between text-xs text-[#8A8A85]">
                    <span>9:41</span>
                    <span className="font-medium text-[#F7F7F5]">Push Day</span>
                    <span>•••</span>
                  </div>
                  <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#8A8A85]">
                    Set 2 of 3
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight">Bench Press</h3>

                  <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <span className="text-sm text-[#8A8A85]">Previous</span>
                    <Lift>175 × 8</Lift>
                  </div>

                  {/* bright "today" highlight */}
                  <div className="mt-3 rounded-2xl bg-[#F7F7F5] px-5 py-5 text-[#111111]">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#999995]">Today</p>
                    <div className="mt-1 flex items-baseline gap-3">
                      <span className="text-5xl font-semibold tabular-nums">185</span>
                      <span className="text-lg text-[#999995]">lb</span>
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-2xl font-semibold tabular-nums">5</span>
                      <span className="text-sm text-[#999995]">reps</span>
                    </div>
                  </div>

                  <button className="mt-3 w-full rounded-xl bg-[#F7F7F5] py-3.5 text-center text-sm font-semibold text-[#111111]">
                    Complete Set
                  </button>

                  <div className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.05] px-4 py-2.5 text-sm">
                    <span className="text-[#8A8A85]">Rest</span>
                    <span className="font-semibold tabular-nums">1:42</span>
                  </div>
                </div>
              </Phone>

              <Watch>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Bench
                </p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tabular-nums">185</span>
                  <span className="text-sm text-white/60">lb</span>
                </div>
                <p className="mt-0.5 text-lg font-medium tabular-nums text-white/90">× 5 reps</p>
                <button className="mt-3 w-full rounded-full bg-white py-2 text-center text-sm font-semibold text-black">
                  ✓ Complete
                </button>
                <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                  <span>Rest</span>
                  <span className="tabular-nums text-white">1:42</span>
                </div>
              </Watch>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 · PRODUCT THESIS */}
      <Section bg="lift">
        <Reveal>
          <Eyebrow>The core loop</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Tracking and social reinforce each other.
          </h2>
          <p className="mt-4 max-w-2xl text-[#C4C4BF]">
            Gymmie never asks you to manufacture a post. Completing a workout naturally generates
            something worth sharing — so the motivation to train comes from the training itself.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <ol className="mx-auto flex max-w-xs flex-col items-stretch gap-2">
              {["Train", "Track", "Share", "Connect", "Train again"].map((step, i) => (
                <li key={step}>
                  <div
                    className={`rounded-xl border px-5 py-3 text-center text-sm font-semibold ${
                      i === 4
                        ? "border-[#F7F7F5] bg-[#F7F7F5] text-[#111111]"
                        : "border-white/10 bg-[#1A1A18]"
                    }`}
                  >
                    {step.toUpperCase()}
                  </div>
                  {i < 4 && <div className="mx-auto h-4 w-px bg-white/15" />}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="mx-auto max-w-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Push Day</h3>
                  <p className="text-sm text-[#8A8A85]">47 minutes</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-[#F7F7F5] text-center text-sm font-semibold leading-9 text-[#111111]">
                  A
                </div>
              </div>
              <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {[
                  ["Bench Press", "185 × 5", true],
                  ["Incline Dumbbell Press", "60 × 8", false],
                  ["Shoulder Press", "45 × 10", false],
                ].map(([name, lift, pr]) => (
                  <div key={name as string} className="flex items-center justify-between py-2.5 text-sm">
                    <span className="text-[#C4C4BF]">{name}</span>
                    <span className="flex items-center gap-1.5">
                      <Lift pr={pr as boolean}>{lift}</Lift>
                      {pr && <span aria-hidden>🏆</span>}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-[#8A8A85]">Total Volume</span>
                <span className="text-lg font-semibold tabular-nums">8,420 lb</span>
              </div>
              <div className="mt-5 flex gap-2">
                <button className="flex-1 rounded-lg bg-[#F7F7F5] py-2.5 text-sm font-semibold text-[#111111]">
                  Share
                </button>
                <button className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium">
                  Add photo
                </button>
                <button className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium">
                  Caption
                </button>
              </div>
              <p className="mt-3 text-center text-xs text-[#8A8A85]">Posting is never required.</p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* 3 · BEST-IN-CLASS TRACKING */}
      <Section>
        <Reveal>
          <Eyebrow>Workout tracking</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Built around the workout you&rsquo;re actually doing.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-[#C4C4BF]">
            Most trackers are either too rigid or become tedious once they try to support every
            training style. Gymmie&rsquo;s answer is a single principle:
          </p>
          <p className="mt-4 text-2xl font-semibold tracking-tight">
            Simple by default. Flexible when you need it.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Card className="p-0">
              <div className="border-b border-white/10 px-6 py-4">
                <h3 className="font-semibold">Bench Press</h3>
                <p className="text-xs text-[#8A8A85]">Fast set logging</p>
              </div>
              <div className="px-6 py-2">
                <div className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-3 py-2 text-xs uppercase tracking-wide text-[#8A8A85]">
                  <span>Set</span>
                  <span>Previous</span>
                  <span>Today</span>
                  <span />
                </div>
                {[
                  ["1", "175 × 8", "180 × 8", true],
                  ["2", "175 × 7", "180 × 7", true],
                  ["3", "165 × 9", "170 × —", false],
                ].map(([set, prev, today, done]) => (
                  <div
                    key={set as string}
                    className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-3 border-t border-white/10 py-3 text-sm"
                  >
                    <span className="font-semibold tabular-nums">{set}</span>
                    <span className="tabular-nums text-[#8A8A85]">{prev}</span>
                    <span className="tabular-nums font-medium">{today}</span>
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-full text-xs ${
                        done ? "bg-[#F7F7F5] text-[#111111]" : "border border-white/15 text-[#8A8A85]"
                      }`}
                    >
                      {done ? "✓" : ""}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 border-t border-white/10 px-6 py-4 text-xs text-[#8A8A85]">
                {["Set", "Warmup", "Notes", "Replace", "Skip"].map((c) => (
                  <span key={c} className="rounded-full border border-white/15 px-3 py-1">
                    {c}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8A8A85]">
                Optimize for
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">
                Minimum interactions per completed set.
              </p>
              <p className="mt-4 text-[#C4C4BF]">
                Completing a set saves it, starts the rest timer, and advances to the next set. If the
                plan already says <Lift>185 × 5</Lift>, finishing that set can take a single tap.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-[#1A1A18] px-5 py-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#F7F7F5] text-sm text-[#111111]">
                  ✓
                </span>
                <span className="text-sm">
                  <span className="font-medium">One tap</span>{" "}
                  <span className="text-[#8A8A85]">→ saved, timer started, next set ready</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 4 · PLAN vs TODAY */}
      <Section bg="lift">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Plan vs. Today</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              The plan is guidance, not a prison.
            </h2>
            <p className="mt-4 text-[#C4C4BF]">
              Your template and today&rsquo;s workout are separate. Reorder, skip, replace, add or
              remove sets, change the weight or reps — all without permanently rewriting the plan.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Reorder", "Skip", "Replace", "Add set", "Remove set", "Change weight", "Do it later"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-[#C4C4BF]"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8A85]">
                Your plan
              </p>
              <div className="mt-3 space-y-2 text-sm">
                {["Bench — 3 × 8", "Incline DB — 3 × 10", "Cable Fly — 3 × 12"].map((r) => (
                  <div key={r} className="rounded-lg bg-white/[0.04] px-4 py-2.5 font-medium">
                    {r}
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-white/10 p-4">
                <p className="text-sm text-[#C4C4BF]">You changed Bench to 4 sets today.</p>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 rounded-lg border border-white/25 py-2 text-sm font-semibold">
                    Just today
                  </button>
                  <button className="flex-1 rounded-lg bg-[#F7F7F5] py-2 text-sm font-semibold text-[#111111]">
                    Update going forward
                  </button>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* 5 · START WITHOUT SETUP */}
      <Section>
        <Reveal>
          <Eyebrow>Start in seconds</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            No program builder before your first rep.
          </h2>
          <p className="mt-4 max-w-2xl text-[#C4C4BF]">
            Gymmie learns structure from you, instead of demanding structure before you can begin.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Card>
              <p className="text-lg font-semibold">What are you doing today?</p>
              <div className="mt-4 space-y-2.5">
                {["Start Empty Workout", "Pick a Template", "Use a Friend's Workout", "Create / Import a Plan"].map(
                  (o, i) => (
                    <div
                      key={o}
                      className={`flex items-center justify-between rounded-xl border px-5 py-3.5 text-sm font-medium ${
                        i === 0 ? "border-[#F7F7F5]" : "border-white/12"
                      }`}
                    >
                      {o}
                      <span className="text-[#8A8A85]">→</span>
                    </div>
                  )
                )}
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="flex h-full flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8A85]">
                Later, Gymmie notices the pattern
              </p>
              <div className="mt-3 space-y-1.5 text-sm">
                {["Bench", "Incline Dumbbell Press", "Cable Fly", "Triceps"].map((e) => (
                  <div key={e} className="rounded-lg bg-white/[0.04] px-4 py-2 font-medium">
                    {e}
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-5">
                <p className="text-sm text-[#C4C4BF]">Save this as a workout?</p>
                <button className="mt-2 w-full rounded-xl bg-[#F7F7F5] py-3 text-sm font-semibold text-[#111111]">
                  Save as “Push Day”
                </button>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* 6 · FLEXIBLE EXERCISE TRACKING */}
      <Section bg="lift">
        <Reveal>
          <Eyebrow>Any training style</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Every measurement type. None of the clutter.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Weight + Reps", "Bench Press", "185 × 5"],
            ["Reps", "Pull-Ups", "8 reps"],
            ["Time", "Plank", "1:30"],
            ["Distance + Time", "Row", "2,000 m · 8:12"],
          ].map(([type, ex, val], i) => (
            <Reveal key={type as string} delay={i * 0.05}>
              <Card className="h-full">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8A85]">
                  {type}
                </p>
                <p className="mt-4 font-semibold">{ex}</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">{val}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-8">
            <p className="text-sm text-[#8A8A85]">Advanced modifiers stay hidden until you need them:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Warm-up",
                "Drop set",
                "Failure",
                "Assisted",
                "Bodyweight",
                "RPE",
                "RIR",
                "Superset",
                "Circuit",
                "AMRAP",
                "EMOM",
                "Intervals",
              ].map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-white/12 px-3 py-1 text-xs text-[#8A8A85]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 7 · VOICE-FIRST */}
      <Section bg="deep">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Voice-first logging</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Don&rsquo;t touch your phone between sets.
            </h2>
            <p className="mt-5 max-w-md text-[#C4C4BF]">
              Because Gymmie already knows your active workout, voice commands can be almost nothing.
              It becomes a hands-free gym companion.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm text-[#C4C4BF]">
              {['"Add a set."', '"Skip this."', '"What\'s next?"', '"What did I bench last time?"', '"Start Push Day."', '"End workout."'].map(
                (c) => (
                  <span key={c} className="rounded-full border border-white/15 px-3 py-1.5">
                    {c}
                  </span>
                )
              )}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mx-auto max-w-sm space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-[#8A8A85]">
                Active context · Push Day → Bench Press → Set 2 → planned 185
              </div>
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[#F7F7F5] px-5 py-3 text-[#111111]">
                “Siri, log 5.”
              </div>
              <div className="mr-auto w-fit max-w-[90%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-5 py-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/40">Logged</p>
                <p className="mt-1 text-lg font-semibold">
                  Bench Press — <span className="tabular-nums">185 × 5</span>
                </p>
                <p className="mt-1 text-sm text-white/50">Set saved · rest timer started · Set 3 ready</p>
              </div>
              <p className="text-center text-sm text-white/40">
                Eventually just: <span className="text-white/70">“Siri, got 5.”</span>
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 8 · APPLE WATCH */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Apple Watch</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Your workout lives on your wrist.
            </h2>
            <p className="mt-5 max-w-md text-lg text-[#C4C4BF]">
              Phone, Watch, and voice are three interfaces to the same live session. Start on your
              phone, finish from your wrist.
            </p>
            <p className="mt-4 text-xl font-semibold tracking-tight">
              Leave your phone on the floor.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm text-[#C4C4BF]">
              {["Complete sets", "Adjust reps & weight", "Rest timers", "Next / previous exercise", "Progress", "End workout"].map(
                (c) => (
                  <span key={c} className="rounded-full border border-white/15 px-3 py-1.5">
                    {c}
                  </span>
                )
              )}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex items-center justify-center gap-6">
              <Watch>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Rest
                </p>
                <p className="mt-2 text-4xl font-semibold tabular-nums">1:42</p>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-2/3 rounded-full bg-white" />
                </div>
                <p className="mt-3 text-xs text-white/50">Next: Bench · Set 3</p>
              </Watch>
              <Watch>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Bench · Set 3 of 3
                </p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tabular-nums">185</span>
                  <span className="text-sm text-white/60">×5</span>
                </div>
                <button className="mt-4 w-full rounded-full bg-white py-2 text-center text-sm font-semibold text-black">
                  ✓ Complete
                </button>
              </Watch>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 9 · HISTORY */}
      <Section bg="lift">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <Eyebrow>History that helps</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Your last workout, right where you need it.
            </h2>
            <p className="mt-4 max-w-md text-[#C4C4BF]">
              Most apps treat history like a database. Gymmie makes previous performance part of the
              active set — so you never have to remember what you lifted last week. Gymmie knows.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Card>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Bench Press</h3>
                <span className="rounded-full bg-[#D6A72C]/15 px-3 py-1 text-xs font-semibold text-[#D6A72C]">
                  205 lb · all-time PR
                </span>
              </div>
              <div className="mt-4 divide-y divide-white/10 text-sm">
                {[
                  ["Aug 20", "180 × 8"],
                  ["Aug 14", "175 × 8"],
                  ["Aug 8", "175 × 7"],
                  ["Aug 2", "170 × 8"],
                ].map(([d, l]) => (
                  <div key={d} className="flex items-center justify-between py-2">
                    <span className="text-[#8A8A85]">{d}</span>
                    <span className="tabular-nums font-medium">{l}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3 text-sm">
                <span className="text-[#8A8A85]">Estimated 1RM</span>
                <span className="tabular-nums font-semibold">228 → 231 → 236</span>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl border border-[#F7F7F5]/30 px-4 py-3 text-sm">
                <span className="font-medium">Suggested today</span>
                <span className="tabular-nums font-semibold">180 × 8</span>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* 10 · PRs & PROGRESS (gold) */}
      <Section>
        <Reveal>
          <div className="flex items-center gap-2">
            <span className="text-[#D6A72C]">🏆</span>
            <Eyebrow>PRs &amp; progress</Eyebrow>
          </div>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Gymmie notices the wins.
          </h2>
          <p className="mt-4 max-w-2xl text-[#C4C4BF]">
            Not just &ldquo;heaviest ever.&rdquo; Weight, reps, estimated 1RM, weight-at-reps, exercise
            and workout volume, streaks and milestones — gold shows up when something good just
            happened.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border-2 border-[#D6A72C]/50 bg-[#161615]">
              <div className="bg-[#D6A72C] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#111111]">
                New PR
              </div>
              <div className="px-6 py-8 text-center">
                <p className="text-sm text-[#8A8A85]">Bench Press</p>
                <p className="mt-2 text-6xl font-semibold tracking-tight text-[#F7F7F5]">
                  225<span className="ml-1 text-2xl text-[#8A8A85]">lb</span>
                </p>
                <p className="mt-3 inline-block rounded-full bg-[#D6A72C]/15 px-3 py-1 text-sm font-semibold text-[#D6A72C]">
                  +10 lb since June
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="flex h-full flex-col justify-center">
              <p className="text-lg font-semibold">You hit 3 PRs today.</p>
              <div className="mt-4 space-y-2.5">
                {[
                  ["Bench", "205 lb"],
                  ["Squat", "225 × 8"],
                  ["Highest Push Day volume", ""],
                ].map(([n, v]) => (
                  <div
                    key={n}
                    className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <span className="text-[#D6A72C]">🏆</span> {n}
                    </span>
                    {v && <span className="tabular-nums font-semibold text-[#D6A72C]">{v}</span>}
                  </div>
                ))}
              </div>
              <button className="mt-5 self-start rounded-xl bg-[#F7F7F5] px-6 py-2.5 text-sm font-semibold text-[#111111]">
                Share highlights
              </button>
              <p className="mt-3 text-xs text-[#8A8A85]">
                Gymmie never spams every minor PR into the feed.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* 11–13 · SOCIAL + SHAREABLE WORKOUTS + PROGRAMS */}
      <Section bg="lift">
        <Reveal>
          <Eyebrow>The social layer</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Train with your people.
          </h2>
          <p className="mt-4 max-w-2xl text-[#C4C4BF]">
            Friends training alongside one another — not an influencer network. No follower counts, no
            algorithmic feed, no fitness thirst traps. Every workout, PR, plan, and program is a
            structured, reusable object your friends can actually use.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8A85]">Feed</p>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-white/10 p-4">
                  <p className="text-sm">
                    <span className="font-semibold">Ben</span> finished{" "}
                    <span className="font-semibold">Push Day</span>
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-[#D6A72C]">
                    🏆 Bench PR — <span className="tabular-nums font-semibold">205 lb</span>
                  </p>
                  <div className="mt-3 flex gap-4 text-sm text-[#8A8A85]">
                    <span>👊 12</span>
                    <span>💬 3</span>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 p-4">
                  <p className="text-sm">
                    <span className="font-semibold">Jake</span> started a 6-workout streak
                  </p>
                  <div className="mt-3 flex gap-4 text-sm text-[#8A8A85]">
                    <span>👊 8</span>
                    <span>💬 1</span>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.06}>
            <Card className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8A85]">
                Shareable workout
              </p>
              <h3 className="mt-3 font-semibold">Ben&rsquo;s Push Workout</h3>
              <div className="mt-3 space-y-1.5 text-sm">
                {["Bench Press", "Incline Dumbbell Press", "Cable Fly", "Triceps Extension"].map((e) => (
                  <div key={e} className="rounded-lg bg-white/[0.04] px-3 py-2 font-medium">
                    {e}
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full rounded-xl bg-[#F7F7F5] py-2.5 text-sm font-semibold text-[#111111]">
                Try Workout
              </button>
              <p className="mt-2 text-center text-xs text-[#8A8A85]">
                One tap copies it into your library.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.12}>
            <Card className="h-full">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8A85]">
                  Shareable program
                </p>
                <span className="text-sm font-semibold text-[#D6A72C]">4.8 ★</span>
              </div>
              <h3 className="mt-3 font-semibold">Ben&rsquo;s 3-Day Strength</h3>
              <p className="text-xs text-[#8A8A85]">17 friends have tried it</p>
              <div className="mt-3 space-y-1.5 text-sm">
                {[
                  ["Monday", "Push"],
                  ["Wednesday", "Pull"],
                  ["Friday", "Legs"],
                ].map(([d, w]) => (
                  <div key={d} className="flex justify-between rounded-lg bg-white/[0.04] px-3 py-2">
                    <span className="text-[#8A8A85]">{d}</span>
                    <span className="font-medium">{w}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full rounded-xl border border-white/25 py-2.5 text-sm font-semibold">
                Save Plan
              </button>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* 14 · CHALLENGES */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Challenges</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Encouraging, not hypercompetitive.
            </h2>
            <p className="mt-4 max-w-md text-[#C4C4BF]">
              Challenge a friend or a group: workout counts, streaks, an exercise goal, a PR goal,
              total volume, or anything you invent together.
            </p>
            <div className="mt-6 rounded-xl border border-white/10 bg-[#1A1A18] px-5 py-4">
              <p className="text-sm text-[#8A8A85]">Personal challenge</p>
              <p className="mt-1 font-semibold">Bench 225 before Christmas</p>
              <p className="mt-1 text-sm text-[#8A8A85]">John challenged Alex</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Card>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">September Challenge</h3>
                <span className="text-sm text-[#8A8A85]">12 workouts</span>
              </div>
              <div className="mt-5 space-y-4">
                {[
                  ["Alex", 9],
                  ["Ben", 8],
                  ["Jake", 6],
                ].map(([name, done]) => (
                  <div key={name as string}>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{name}</span>
                      <span className="tabular-nums text-[#8A8A85]">{done} / 12</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[#F7F7F5]"
                        style={{ width: `${((done as number) / 12) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* 15–16 · AI + PROGRAM CREATION */}
      <Section bg="lift">
        <Reveal>
          <Eyebrow>Quiet intelligence</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            AI works behind the scenes — not on the marquee.
          </h2>
          <p className="mt-4 max-w-2xl text-[#C4C4BF]">
            Gymmie isn&rsquo;t an &ldquo;AI workout app.&rdquo; It just quietly helps, using your
            history, equipment, strength levels, and goals.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["“I only have 35 minutes today.”", "Gymmie trims the workout intelligently."],
            ["“My gym doesn’t have a hack squat.”", "Gymmie recommends an appropriate replacement."],
            ["“Make me a 3-day plan from what I’ve been doing.”", "Gymmie drafts it from your history."],
          ].map(([q, a], i) => (
            <Reveal key={q} delay={i * 0.05}>
              <Card className="h-full">
                <p className="font-medium">{q}</p>
                <p className="mt-2 text-sm text-[#8A8A85]">{a}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16">
            <h3 className="text-2xl font-semibold tracking-tight">
              Your workout shouldn&rsquo;t require data entry.
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Describe it", "“Push pull legs, 3 days, mostly dumbbells.”"],
                ["Paste it", "Drop in a trainer’s workout."],
                ["Screenshot it", "Import a photo — Gymmie structures it."],
                ["Build it", "Full manual control when you want it."],
              ].map(([t, d]) => (
                <Card key={t} className="h-full">
                  <p className="font-semibold">{t}</p>
                  <p className="mt-2 text-sm text-[#8A8A85]">{d}</p>
                </Card>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#F7F7F5]/25 bg-[#1A1A18] px-6 py-4">
              <div>
                <p className="font-semibold">…or just copy a friend.</p>
                <p className="text-sm text-[#8A8A85]">The easiest program is the one already working.</p>
              </div>
              <button className="rounded-xl bg-[#F7F7F5] px-5 py-2.5 text-sm font-semibold text-[#111111]">
                Add to My Workouts
              </button>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 17 · GYM BUDDY */}
      <Section>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Meet your Gymmie</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Your gym buddy, built in.
            </h2>
            <p className="mt-5 text-lg text-[#C4C4BF]">
              Gymmie remembers what you lifted, starts your rest timer, tells you what&rsquo;s next,
              notices your PR, and suggests your next weight — from your phone, your Watch, or your
              voice. And it connects you to your <em>actual</em> gym buddies. That dual meaning is the
              whole personality.
            </p>
            <p className="mt-6 text-2xl font-semibold tracking-tight">
              Your workout. Your progress. Your people.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 18–20 · MONETIZATION */}
      <Section bg="lift">
        <Reveal>
          <Eyebrow>Business model</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Freemium, never ads.
          </h2>
          <p className="mt-4 max-w-2xl text-[#C4C4BF]">
            The social network stays largely free — growth makes Gymmie more valuable for everyone.
            Pro charges for intelligence and advanced training tools, not for crippling the tracker.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#1A1A18] p-8">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold">Free</h3>
                <span className="text-sm text-[#8A8A85]">A genuinely excellent product</span>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-[#C4C4BF]">
                {[
                  "Unlimited logging",
                  "Full history",
                  "Templates",
                  "PR detection",
                  "Friends & feed",
                  "Comments & kudos",
                  "Share workouts",
                  "Copy workouts",
                  "Share programs",
                  "Progress stats",
                  "Challenges",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#F7F7F5]">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Pro — bright warm-white highlight card */}
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-2xl bg-[#F7F7F5] p-8 text-[#111111]">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold">Gymmie Pro</h3>
                <span className="text-sm text-[#666]">$4.99/mo · $39.99/yr</span>
              </div>
              <p className="mt-3 text-sm text-[#666]">Charge for intelligence, not for paywalls.</p>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-[#333]">
                {[
                  "Advanced analytics",
                  "Muscle-group volume",
                  "Training-load trends",
                  "RPE / RIR analytics",
                  "Intelligent progression",
                  "AI workout changes",
                  "AI plan creation",
                  "Exercise substitutions",
                  "Deeper history",
                  "Advanced Watch",
                  "Custom programming",
                  "Export your data",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#B8860B]">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <div className="flex items-baseline justify-between">
                <h3 className="font-semibold">Gymmie Coach</h3>
                <span className="text-sm text-[#8A8A85]">$15–30/mo per coach · future</span>
              </div>
              <p className="mt-2 text-sm text-[#C4C4BF]">
                A coach dashboard on top of the app clients already use — build programs, assign and
                adjust workouts, review sets, track adherence.
              </p>
              <div className="mt-4 divide-y divide-white/10 text-sm">
                {[
                  ["Alex", "Workout completed ✓", "#F7F7F5"],
                  ["Ben", "Missed yesterday", "#8A8A85"],
                  ["Jake", "Bench PR ↑", "#D6A72C"],
                ].map(([n, s, c]) => (
                  <div key={n} className="flex items-center justify-between py-2.5">
                    <span className="font-medium">{n}</span>
                    <span style={{ color: c as string }}>{s}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#8A8A85]">
                An acquisition loop: coach → clients → friends → network.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="flex h-full flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold">Plan marketplace</h3>
                  <span className="text-sm text-[#8A8A85]">much later</span>
                </div>
                <p className="mt-2 text-sm text-[#C4C4BF]">
                  Eventually, creators could sell structured programs that run directly inside Gymmie,
                  with a marketplace cut. Deliberately deferred — the early culture stays{" "}
                  <span className="font-medium text-[#F7F7F5]">friends + training</span>, not an
                  influencer storefront.
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3">
                <span className="text-sm font-medium">12-Week Hypertrophy Program</span>
                <span className="tabular-nums font-semibold">$29.99</span>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* 21–22 · PRINCIPLES + METRICS */}
      <Section>
        <Reveal>
          <Eyebrow>Product principles</Eyebrow>
        </Reveal>
        <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {[
            ["The tracker must be great without the network.", "You&rsquo;d choose Gymmie even if none of your friends used it."],
            ["Social should emerge from the workout.", "You never have to manufacture posts."],
            ["Complexity stays hidden until needed.", "Advanced lifters get flexibility; beginners configure nothing."],
            ["Today&rsquo;s workout is always flexible.", "The plan is guidance, not a prison."],
            ["Progress should be visible.", "History should help the current set, not just document the past."],
            ["Your phone shouldn&rsquo;t control your workout.", "Watch and voice let you train without touching it."],
          ].map(([h, d], i) => (
            <Reveal key={h} delay={i * 0.04}>
              <div className="border-t border-white/15 pt-5">
                <h3
                  className="text-xl font-semibold tracking-tight"
                  dangerouslySetInnerHTML={{ __html: h }}
                />
                <p className="mt-2 text-[#C4C4BF]" dangerouslySetInnerHTML={{ __html: d }} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16">
            <Eyebrow>Metrics Gymmie obsesses over</Eyebrow>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Time to first workout",
                "Interactions per set",
                "Workout completion",
                "Weekly workouts / user",
                "Shared workout adoption",
                "Social → consistency lift",
                "Friend activation speed",
                "Watch & voice usage",
              ].map((m) => (
                <div
                  key={m}
                  className="rounded-xl border border-white/10 bg-[#1A1A18] px-4 py-3 text-sm font-medium"
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 23 · FINAL VISION */}
      <Section bg="deep" className="text-center">
        <Reveal>
          <GymmieLogo className="mx-auto h-14" />
          <h2 className="mt-8 text-3xl font-semibold tracking-tight sm:text-5xl">
            Working out is better together.
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-3 text-[#C4C4BF]">
            <p>
              Gymmie combines an exceptionally intuitive workout tracker with the social motivation
              that made platforms like Strava so powerful.
            </p>
            <p>
              Your history becomes useful. Your PRs become memorable. Your programs become shareable.
              Your friends become part of the experience.
            </p>
            <p>And when it&rsquo;s time to actually train, Gymmie gets out of the way.</p>
          </div>
          <p className="mt-8 text-xl font-semibold text-[#F7F7F5]">
            Your workout. Your progress. Your people.
          </p>
          <GymmieLogo className="mx-auto mt-10 h-9" />
        </Reveal>

        <div className="mt-16 border-t border-white/10 pt-8">
          <Link href="/projects" className="text-sm text-[#8A8A85] hover:text-[#F7F7F5]">
            ← Back to all projects
          </Link>
        </div>
      </Section>
    </div>
  );
}
