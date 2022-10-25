import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Homepage = () => {
  const { currentUser } = useContext(AuthContext);

  const userLoggedIn = currentUser !== null;
  return (
    <div className=" h-[calc(100vh-80px)] bg-mainbg md:p-20 p-5 flex items-center justify-center flex-col text-white ">
      <h1 className="text-3xl md:text-5xl  font-extrabold ">
        The best todo app
      </h1>
      {/* 
   { userLoggedIn ?   <Link to="/signup">
        <button className="bg-transparent border-white border-2 border-solid mt-10 px-5 py-2 rounded-full text-bold">
          Get Started
        </button>
      </Link>} */}

      <button className="bg-transparent border-white border-2 border-solid mt-10 px-5 py-2 rounded-full text-bold">
       { userLoggedIn ?  <Link  to="/todos">Get Started</Link> : <Link  to="/signup">Get Started</Link>}
      </button>
    </div>
  );
};

export default Homepage;
