import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../firebase/Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";

const MyReview = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [userReview, setUserReview] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_HOST}/review/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserReview(data));
  }, [isLoading, refetch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you really want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_HOST}/review/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.deletedCount > 0) {
              Swal.fire({
                title: "Yey!",
                text: "Review Deleted Successfully!",
                icon: "success",
              });
              setRefetch(true);
            }
          });
      }
    });
    
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {userReview?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Rating</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userReview?.map((review) => (
                <tr key={review?._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={review?.photo} alt={review?.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          <Link to={`/review/${review?._id}`} className="link">
                            {review?.title}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {review?.description?.length > 50
                      ? review?.description?.slice(0, 50)
                      : review?.description}
                  </td>
                  <td>
                    <div className="rating">
                      <input
                        type="radio"
                        name="rating-1"
                        className="mask mask-star"
                      />
                    </div>
                  </td>
                  <th>
                    <Link
                      to={`/review/update/${review?._id}`}
                      className="btn btn-primary btn-xs"
                    >
                      Update
                    </Link>
                    ||{" "}
                    <button
                      onClick={() => handleDelete(review?._id)}
                      className="btn btn-info btn-xs"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-xl text-red-400">No Review Found!</p>
      )}
    </div>
  );
};

export default MyReview;
