import {Carousel} from "@/components/MaterialTailwind";
import {reviewData} from "@/ExperienceData";

const Reviews = ()=> {
  const reviews = reviewData.map(review => (
      <div key={review.name} className={'w-4/5 m-auto'}>
        <p>{review.name}, {review.role}</p>
        <p>{review.time}</p>
        <div className={"text-center"}>{review.review}</div>
      </div>
  ))

  return (
      <div className={'flex flex-col justify-center items-center w-full h-full'}>
  <Carousel placeholder={undefined} autoplay={true} loop={true} className={'flex flex-col justify-center text-center h-2/3'}>
      {reviews}
  </Carousel>
      </div>
  )
}

export default Reviews