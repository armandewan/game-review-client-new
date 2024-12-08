import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "../Components/Slider";
import TopRatedSection from "../Components/TopRatedSection";
import AboutMe from "../Components/AboutMe";
const Home = () => {
  const [reviews, setReviews] = useState([]);

  return (
    <div>
      <div className="w-11/12 mx-auto">
        <Slider reviews={reviews} setReviews={setReviews} />
      </div>
      <h4 className="text-center text-xl underline mt-6">Top Rated Reviews</h4>
      <TopRatedSection reviews={reviews}/>
      {/* extra sections */}
      <h4 className="text-center text-xl underline mt-6">Animated Section</h4>
      <AboutMe reviews={reviews}/>
    </div>
  );
};

export default Home;
