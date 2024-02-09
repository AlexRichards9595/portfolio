import React, { FC } from 'react';
import {ReviewData} from '@/ExperienceData'
import {AnimatePresence, motion} from "framer-motion";


interface ReviewProps {
  review: ReviewData;
}

const Review: FC<ReviewProps> = ({review}) => (
    <div className={'h-full w-full flex flex-col justify-start items-center py-8 text-center m-auto bg-secondary rounded-2xl overflow-y-auto overflow-x-hidden'}>
      <AnimatePresence mode={'popLayout'}>
        <motion.div
            key={review.name}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring" }}
            className={'overflow-y-auto px-8'}
        >
          <p>{review.name}, {review.role}</p>
          <p>{review.time}</p>
          <div className={"text-center"}>{review.review}</div>
        </motion.div>
      </AnimatePresence>
    </div>
);
export default Review;