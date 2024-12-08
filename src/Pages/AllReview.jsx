import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";

const AllReview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [displayReviews, setDisplayReviews] = useState([]);
  const handleFilter = (year) => {
    if (year === "all") {
      setDisplayReviews(reviews);
    } else {
      const selectedReviews = reviews?.filter(
        (review) => review?.year === year
      );
      setDisplayReviews(selectedReviews);
    }
  };
  const handleGenreFilter = (genre)=>{
    if (genre === "all") {
      setDisplayReviews(reviews);
    } else {
      const selectedReviews = reviews?.filter(
        (review) => review?.genre === genre
      );
      setDisplayReviews(selectedReviews);
    }
  }
  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_HOST}/all`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-9/12 lg:w-full mx-auto">
      <div className="flex justify-evenly">
      <label className="w-full max-w-xs flex">
        <div className="label">
          <span className="label-text">Filter By Year</span>
        </div>
        <select
          onChange={(e) => handleFilter(e.target.value)}
          defaultValue="all"
          className="select select-bordered"
        >
          <option disabled value="">
            Select Year
          </option>
          <option value="all">all</option>
          {reviews
            ?.filter((review, index, self) => {
              return self.findIndex((r) => r === review) === index;
            })
            ?.map((review) => (
              <option key={review?._id} value={review?.year}>
                {review?.year}
              </option>
            ))}
        </select>
      </label>
      <label className="w-full max-w-xs flex">
        <div className="label">
          <span className="label-text">Filter By Genre</span>
        </div>
        <select
          onChange={(e) => handleGenreFilter(e.target.value)}
          defaultValue="all"
          className="select select-bordered"
        >
          <option disabled value="">
            Select Genre
          </option>
          <option value="all">all</option>
          {reviews
            ?.filter((review, index, self) => {
              return self.findIndex((r) => r === review) === index;
            })
            ?.map((review) => (
              <option key={review?._id} value={review?.genre}>
                {review?.genre}
              </option>
            ))}
        </select>
      </label>
      </div>
      <div className=" grid text-center items-center lg:grid-cols-3 gap-2">
        {displayReviews.length > 0 ? (
          displayReviews?.map((review) => (
            <div
              key={review?._id}
              className="card card-compact bg-base-100 w-96 shadow-xl"
            >
              <figure>
                <img src={review?.photo} alt={review?.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{review?.title}</h2>
                <p>
                  {review?.description?.length > 50
                    ? review?.description?.slice(0, 50)
                    : review?.description}
                </p>
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                  />
                </div>
                <div className="card-actions justify-center ">
                  <Link
                    to={`/review/${review?._id}`}
                    className="btn bg-fuchsia-900 text-white"
                  >
                    Explore Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-red-400">No Review Found!</p>
        )}
      </div>
    </div>
  );
};

export default AllReview;
