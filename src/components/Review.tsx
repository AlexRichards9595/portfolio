import React, { FC } from "react";
import { ReviewData } from "@/ExperienceData";
import { AnimatePresence, motion } from "framer-motion";

interface ReviewProps {
  review: ReviewData;
}

const Review: FC<ReviewProps> = ({ review }) => (
  <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-plum plum-glow px-8 py-8 text-cream shadow-lift">
    <span aria-hidden className="font-display text-6xl leading-none text-grape/70">
      &ldquo;
    </span>
    <AnimatePresence mode="popLayout">
      <motion.div
        key={review.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="-mt-2 flex grow flex-col overflow-y-auto no-scrollbar"
      >
        <p className="text-[15px] leading-relaxed text-cream/90 lg:text-base">{review.review}</p>
        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="font-display text-xl text-cream">{review.name}</p>
          <p className="text-sm text-lightest/80">
            {review.role} · {review.time}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
);

export default Review;
