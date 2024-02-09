'use client'
import {reviewData} from "@/ExperienceData";
import {useCallback, useEffect, useRef, useState} from "react";
import Review from "@/components/Review";
import Dot from "@/components/Dot";
import Image from "next/image";

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
    const timer = setTimeout(() => autoPlay && nextReview(), 2000);

      return () => clearTimeout(timer);
  }, [autoPlay, nextReview]);


  const previousReview = () => {
    if(reviewSelected === 0) {
      setReviewSelected(reviewData.length - 1);
    } else {
      setReviewSelected(prevState => (prevState - 1))
    }
  }


  return (
      <div className={"flex flex-col justify-center m-auto h-4/5 w-4/5 animate pop"}>
        <div className={"flex flex-row gap-16 h-4/5"}>
          <button onClick={() => {
            setAutoPlay(false)
            previousReview()
          }}>
            <Image src={'/next.svg'} alt={"Next"} height={24} width={24}/>
          </button>
          <Review review={reviewData[reviewSelected]}/>
          <button onClick={() => {
            setAutoPlay(false)
            nextReview()
          }}>
            <Image src={'/next.svg'} alt={"Next"} height={24} width={24}/>
          </button>
        </div>
        <div className={"flex flex-row w-full justify-center mt-8"}>
          {reviewData.map((review, index) => {
            return (<Dot key={review.name} filled={index === reviewSelected} onClick={setReviewSelected} index={index}/>)
          })}
        </div>
      </div>
  )
}

export default Reviews