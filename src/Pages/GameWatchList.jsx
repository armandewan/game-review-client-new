import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/Provider/AuthProvider";
import { Link } from "react-router-dom";

const GameWatchList = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [watchList, setWatchList] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_HOST}/watchList/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setWatchList(data));
  }, [isLoading]);
  console.log(watchList)
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return <div>
    <h3 className="text-center text-2xl underline">Your Watch List</h3>
    {
        watchList?.length>0? <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>            
            {
                watchList?.map(watch=><tr key={watch?._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={watch?.photo}
                              alt={watch?.title} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{watch?.title}</div>
                        </div>
                      </div>
                    </td>
                    <th>
                      <Link to={`/review/${watch?.reviewId}`} className="btn btn-ghost btn-xs">details</Link>
                    </th>
                  </tr>)
            }
          </tbody>
        </table>
      </div>: <p className="text-xl text-center font-bold text-red-400">No Data Found</p>
    }
  </div>;
};

export default GameWatchList;
