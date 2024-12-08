import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/Provider/AuthProvider";
import Rating from "react-rating";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateReview = () => {
  const data = useLoaderData();
  const [reviewData, setReviewData] = useState(null);
  const handleSubmit=(e)=>{
    e.preventDefault()
    fetch(`${import.meta.env.VITE_HOST}/review/${data?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
    .then(res=>res.json())
    .then(data=>{
      if(data?.modifiedCount>0){
        toast.success("Update Successfully!")
      }
    })
  }
  const handleChange = (e) =>{
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value
    })
  }
  useEffect(()=>{
    const {title, description, photo, genre} = data;
    setReviewData({title, description, photo, genre} )
  },[])
  return (
    <div>
      <h3 className="text-center text-xl underline">Update Game Review</h3>
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
            onChange={handleChange}
            value={reviewData?.title}
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
            onChange={handleChange}
            value={reviewData?.photo}
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Your Game Review Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={reviewData?.description}
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Select Game Genre</span>
          </div>
          <select
            defaultValue=""
            name="genre"
            className="select select-bordered"
            onChange={handleChange}
            value={reviewData?.genre}
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
        <input className="btn btn-primary my-2" type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateReview;
