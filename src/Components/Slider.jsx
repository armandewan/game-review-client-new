import React, { useEffect, useState } from "react";
import SliderComp from "react-slick";
import Loading from "./Loading";

const Slider = ({reviews, setReviews}) => {
  const [isLoading, setIsLoading] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  useEffect(() => {
    setIsLoading(true)
    fetch(`${import.meta.env.VITE_HOST}/reviewByRating`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data)
        setIsLoading(false)
      });
  }, []);
  if(isLoading){
    return <Loading />
  }
  return (
    <div>
      <SliderComp {...settings}>
        {
            reviews?.map(review=><div key={review?._id} className="flex justify-center items-center">
                <img
                  src={review?.photo}
                  alt={review?.title}
                  className="w-[600px] mx-auto"
                />
              </div>)
        }
      </SliderComp>
    </div>
  );
};

export default Slider;
