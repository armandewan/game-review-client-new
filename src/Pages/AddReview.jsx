import React, { useContext, useState } from "react";
import { AuthContext } from "../firebase/Provider/AuthProvider";
import Rating from "react-rating";
import Swal from "sweetalert2";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const photo = form.photo.value;
    const description = form.description.value;
    const year = form.year.value.split("-")[0];
    const genre = form.genre.value;
    const newRating = {
      title,
      photo,
      description,
      year,
      genre,
      rating,
      name: user?.displayName,
      email: user?.email,
    };
    fetch(`${import.meta.env.VITE_HOST}/addReview`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newRating),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Yey!",
          text: data?.message,
          icon: "success",
        });
        form.reset();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h3 className="text-center text-xl underline">Add Game Review</h3>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            placeholder="Enter Game Name"
            name="title"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Photo Link</span>
          </div>
          <input
            type="text"
            placeholder="Enter Photo Link"
            name="photo"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Your Rating</span>
          </div>
          <div className="rating rating-lg rating-half">
            <Rating
              initialRating={rating}
              onChange={(value) => setRating(value)}
            />
          </div>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Your Game Review Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Description"
            name="description"
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Publishing Year</span>
          </div>
          <input
            type="month"
            name="year"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Select Game Genre</span>
          </div>
          <select
            defaultValue=""
            name="genre"
            className="select select-bordered"
            required
          >
            <option disabled value="">
              Pick one
            </option>
            {[
              "Action",
              "Adventure",
              "Puzzle",
              "Simulation",
              "Sports",
              "Shooter",
            ].map((gnr, index) => (
              <option value={gnr} key={index}>
                {gnr}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">User Name</span>
          </div>
          <input
            type="text"
            placeholder={user?.displayName}
            className="input input-bordered w-full max-w-xs"
            readOnly
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">User Email</span>
          </div>
          <input
            type="email"
            placeholder={user?.email}
            className="input input-bordered w-full max-w-xs"
            readOnly
          />
        </label>
        <input className="btn btn-secondary my-2" type="submit" value="Share" />
      </form>
    </div>
  );
};

export default AddReview;
