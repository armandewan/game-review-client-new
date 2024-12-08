import React from "react";
import { Link } from "react-router-dom";

const TopRatedSection = ({ reviews }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-2">
      {reviews?.map((review) => (
        <div key={review?._id} className="card bg-base-100 w-96 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src={review?.photo}
              alt={review?.title}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{review?.title}</h2>
            <p>
              {review?.description?.length > 50
                ? review?.description?.slice(0, 50)
                : review?.description}
            </p>
            <div className="card-actions">
              <Link to={`/review/${review?._id}`} className="btn btn-primary">
                Explore Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TopRatedSection;
