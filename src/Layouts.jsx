import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer";

const Layouts = () => {
  const [color, setColor] = useState(true);
  return (
    <div className={`${color=== true ? 'bg-white text-black' : 'bg-gray-400 text-blue-700'}`}>
      <div className="flex justify-end gap-2 p-2">
        <span>Dark</span>
        <input type="checkbox" className="toggle" defaultChecked onChange={()=>setColor(!color)}/>
        <span>light</span>
      </div>
      <nav className="bg-fuchsia-700 ">
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
      <ToastContainer />
    </div>
  );
};

export default Layouts;
