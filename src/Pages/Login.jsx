import React, { useContext, useEffect } from "react";
import { AuthContext } from "../firebase/Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../Components/GoogleLogin";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Login = () => {
  //from react router dom website for protected page
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  //protected page code end
  const { handleSignIn, user, error } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    handleSignIn(email, password);
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
        <h1 className="text-2xl font-bold text-center underline">Login Here</h1>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
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
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <GoogleLogin />
        </div>
        <p>Not Have Any Account? <Link className="link" to='/registration'>Register Here</Link></p>
      </div>
    </div>
  );
};

export default Login;
