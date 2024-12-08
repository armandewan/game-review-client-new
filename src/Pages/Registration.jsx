import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import GoogleLogin from "../Components/GoogleLogin";

const Registration = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const { handleRegister, user, error } = useContext(AuthContext);

  const [password,setPassword] = useState('');
  const validPassword = (password)=>{
    if(password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)){
      toast.error('Password must contain at least one lowercase letter.');
      return false;
    }
   return true; 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    if (validPassword(password)) {
      Swal.fire({
        title: 'Success!',
        text: 'You have successfully logged in/registered.',
        icon: 'success',
        confirmButtonText: 'OK',
      });}

    handleRegister(name, email, photo, password);
  };
  useEffect(()=>{
    if(user){
        navigate(from, { replace: true });
    }
    
    if(error){
      toast.error(error)
    }
  },[user, error])
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-center underline">Register Here</h1>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Input Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                name="photo"
                type="text"
                placeholder="Input Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
              // onChange={(e) => setPassword(e.target.value)}
              // value={password}
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <GoogleLogin />
        </div>
        <p className=" mb-2">Not Have Any Account? <Link className="link" to='/login'>Login Here</Link></p>
      </div>
    </div>
  );
};

export default Registration;
