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
      <h3 className="text-center text-xl underline font-bold my-2">Single Game Section</h3>
      <section className="flex flex-col lg:flex-row gap-2">
        <img width='400px' src="https://i.guim.co.uk/img/media/1e40301d0e86c187ca97196addbbfc9d007423a1/0_0_3600_2160/master/3600.jpg?width=620&dpr=2&s=none&crop=none" alt="" />
        <p>This seafaring adventure from veteran developer Rare allows up to four friends to clamber aboard a pirate galleon then set sail looking for treasure and adventure. You’ll encounter other players as well as skeleton ships, islands and quests, and the whole thing is designed to get friends working together. It’s utterly enchanting and often hilarious.</p>
      </section>
    </div>
  );
};

export default Home;
