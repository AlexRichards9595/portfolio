'use client'
import { reviewData } from "@/ExperienceData";
import React, { useCallback, useEffect, useState } from "react";
import Review from "@/components/Review";
import Dot from "@/components/Dot";

export default function Reviews() {
  const [selected, setSelected] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const next = useCallback(() => setSelected((s) => (s + 1) % reviewData.length), []);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(next, 6000);
    return () => clearTimeout(timer);
  }, [autoPlay, next, selected]);

  return (
    <div className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center px-6 py-10 lg:py-16">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grape">Kind Words</p>
        <h1 className="mt-2 font-display text-4xl text-ink lg:text-5xl">Reviews from coworkers</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink/70">
          I&rsquo;ve had the privilege of working alongside and learning from amazing people over the
          years — and I&rsquo;ve worked hard to return the favor. Here&rsquo;s what some of them have to say.
        </p>
      </div>

      <div className="mt-8 h-[380px] w-full lg:h-[340px]">
        <Review review={reviewData[selected]} />
      </div>

      <div className="mt-6 flex items-center gap-3">
        {reviewData.map((review, index) => (
          <Dot
            key={review.name}
            filled={index === selected}
            index={index}
            onClick={() => {
              setAutoPlay(false);
              setSelected(index);
            }}
          />
        ))}
        <button
          onClick={() => setAutoPlay((p) => !p)}
          className="ml-2 text-xs font-medium text-muted transition-colors hover:text-ink"
          aria-label={autoPlay ? "Pause autoplay" : "Play autoplay"}
        >
          {autoPlay ? "❚❚" : "▶"}
        </button>
      </div>
    </div>
  );
}
