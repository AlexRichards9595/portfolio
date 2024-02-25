'use client'
import {reviewData} from "@/ExperienceData";
import React, {useCallback, useEffect, useState} from "react";
import Review from "@/components/Review";
import Dot from "@/components/Dot";
import Image from "next/image";
import { motion} from "framer-motion";

const Reviews = ()=> {
  const [reviewSelected, setReviewSelected] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState(true)

  const nextReview = useCallback(() => {
    if(reviewSelected === reviewData.length -1) {
      setReviewSelected(0);
    } else {
      setReviewSelected(prevState => (prevState + 1))
    }
  }, [reviewSelected])

  useEffect(() => {
    const timer = setTimeout(() => autoPlay && nextReview(), 6000);

      return () => clearTimeout(timer);
  }, [autoPlay, nextReview]);


  const previousReview = () => {
    if(reviewSelected === 0) {
      setReviewSelected(reviewData.length - 1);
    } else {
      setReviewSelected(prevState => (prevState - 1))
    }
  }

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: any) => {
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { type: "spring", duration: 1.5, bounce: 0 },
          opacity: { duration: 0.01 }
        }
      };
    }
  };


  return (
      <div className={"flex flex-col items-center justify-center mx-auto h-full lg:w-4/5 px-4"}>
        <div className={'flex flex-col text-center py-4 lg:w-2/3'}>
          <p className={'text-3xl pb-2'}>Reviews from Coworkers</p>
          <p>I have had the privilege or working alongside and learning from amazing people over the years and I have worked hard to return the favor. Here is what some of those people have to say about those efforts.</p>
        </div>
        <div className={"flex flex-col gap-4 h-full lg:h-fit"}>
          <Image className={'lg:h-24 lg:w-24 h-16 w-16'} src={'/icon-start-quote.png'} alt={"Next"} height={100} width={100}/>
          <div className={'h-[400px] lg:h-96'}>
            <Review review={reviewData[reviewSelected]}/>
          </div>
          <Image className={'lg:h-24 lg:w-24 h-16 w-16 self-end'} src={'/icon-end-quote.png'} alt={"Next"} height={100} width={100}/>
        </div>
        <div className={"flex flex-row w-full justify-center mt-8"}>
          {reviewData.map((review, index) => {
            return (<Dot key={review.name} filled={index === reviewSelected} onClick={() => {
              setAutoPlay(false)
              previousReview()
            }} index={index}/>)
          })}
          {!autoPlay && (
              <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              initial="hidden"
              animate="visible"
              className={'mx-2'}
              onClick={() => setAutoPlay(true)}
          >
            <motion.line
                x1="0"
                y1="0"
                x2="16"
                y2="8"
                strokeWidth={2}
                stroke="#FFFFFF"
                variants={draw}
            />
            <motion.line
                x1="16"
                y1="8"
                x2="0"
                y2="16"
                strokeWidth={2}
                stroke="#FFFFFF"
                variants={draw}
            />
            <motion.line
                x1="1"
                y1="16"
                x2="1"
                y2="0"
                strokeWidth={2}
                stroke="#FFFFFF"
                variants={draw}
            />
          </motion.svg>)}
          {autoPlay && (
              <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              initial="hidden"
              animate="visible"
              className={'mx-2'}
              onClick={() => setAutoPlay(false)}
              >
            <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="16"
                strokeWidth={2}
                stroke="#FFFFFF"
                variants={draw}
            />
            <motion.line
                x1="10"
                y1="16"
                x2="10"
                y2="0"
                strokeWidth={2}
                stroke="#FFFFFF"
                variants={draw}
            />
            </motion.svg>
            )}
        </div>
      </div>
  )
}

export default Reviews