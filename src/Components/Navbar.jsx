import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../firebase/Provider/AuthProvider";
import { Tooltip } from 'react-tooltip'

const Navbar = () => {
  const { user, handleLogOut } = useContext(AuthContext);
  const links = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/addReview"}>Add Review</Link>
      </li>
      <li>
        <Link to={"/reviews"}>All Review</Link>
      </li>
      <li>
        <Link to={"/myWatchList"}>Game Watch</Link>
      </li>
      <li>
        <Link to={"/myReviews"}>My Review</Link>
      </li>
    </>
  );
  return (
    <div className="navbar w-11/12 mx-auto my-5">
      <div className="navbar-start">
        <div className="dropdown bg-orange-200 rounded-lg">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-orange-200"
          >
            {links}
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost text-xl">Exciting Games</Link>
      </div>
      <div className="navbar-center hidden lg:flex gap-2 bg-orange-200 rounded-lg">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        {user ? (
          <>
            <div className="relative group">
            <div className="avatar">
              <div data-tooltip-id="my-tooltip" className="w-12 rounded-full">
                <img src={user?.photoURL} alt={user?.displayName} />
              </div>
            </div>
          </div>
          <button onClick={handleLogOut} className="btn btn-primary btn-sm">LogOut</button>
          </>
        ) : (
          <>
            <Link className="btn btn-info" to={"/login"}>
              Login
            </Link>
            <Link className="btn btn-accent" to={"/registration"}>
              Registration
            </Link>
          </>
        )}
      </div>
      <Tooltip
        id="my-tooltip"
        place="bottom"
        variant="info"
        content={user?.displayName}
      />
    </div>
  );
};

export default Navbar;

