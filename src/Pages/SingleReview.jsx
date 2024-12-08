import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../firebase/Provider/AuthProvider';
import Loading from '../Components/Loading';

const SingleReview = () => {
    const {user} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)
    const {id} = useParams();
    const [review, setReview] = useState({});
    const handleAddWatchList=()=>{
        const data = {
            name: user?.displayName,
            email: user?.email,
            title: review?.title,
            photo: review?.photo,  
            reviewId: review?._id         
        }
        fetch(`${import.meta.env.VITE_HOST}/addWatchList`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((data) => {
              Swal.fire({
                title: "Yey!",
                text: data?.message,
                icon: "success",
              });
            })
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        setIsLoading(true)
        fetch(`${import.meta.env.VITE_HOST}/review/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setReview(data)
            setIsLoading(false)
          });
      }, []);
      if(isLoading){
        return <Loading />
      }
    return (
        <div>
            <div className="flex flex-col items-center">
            <h3 className='text-xl font-bold'>{review?.title}</h3>
            <img className='' src={review?.photo} alt={review?.title} />
            <p>Rating: {review?.rating}</p>
            <p>Published: {review?.year}</p>
            <button onClick={handleAddWatchList} className='btn btn-sm btn-info'>Add Watch List</button>
            </div>
            <p>{review?.description}</p>
        </div>
    );
};

export default SingleReview;