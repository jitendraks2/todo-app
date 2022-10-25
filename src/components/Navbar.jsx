import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { HiX, HiMenu } from "react-icons/hi";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const userIsLoggedIn = currentUser !== null;

  const [nav, setNav] = useState(false);

  const handleClick = () => setNav((prev) => !prev);

  let navclasses;
  if (nav) {
    navclasses =
      "md:hidden absolute left-0  text-xl bg-mainbg w-full h-[calc(100vh-80px)] flex justify-center flex-col align-middle px-8 py-10 ";
  } else {
    navclasses =
      "hidden md:hidden absolute left-0  text-xl bg-mainbg w-full h-[calc(100vh-80px)] flex justify-center flex-col align-middle px-8 py-10 ";
  }
  return (
    <header className=" h-[80px] z-10 text-white bg-mainbg  relative md:p-9 p-4">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <h1 className="text-3xl font-headingFont font-bold mr-4 sm:text-4xl">
          <Link to="/">Todos</Link>
        </h1>

        <nav className="hidden md:flex md:text-xl ">
          <ul className="hidden md:flex md:mr-10 text-xl navbar-list">
            <li className="p-4">
              <Link to="/">Home</Link>
            </li>
            {userIsLoggedIn && (
              <li className="p-4">
                <Link to="/todos">Todos</Link>
              </li>
            )}
          </ul>

          <div className=" md:flex md:pr-4 items-center">
            <div className="navbar-cta relative">
              <span className="flex items-center gap-5">
                {!userIsLoggedIn && <Link to="/signup">Signup</Link>}
                {!userIsLoggedIn && <Link to="/login">Login</Link>}
                {userIsLoggedIn && <Link to="/account">Account</Link>}
              </span>
            </div>
          </div>
        </nav>

        <div className="md:hidden cursor-pointer" onClick={handleClick}>
          {!nav ? <HiMenu className="" size={30} /> : <HiX size={30} />}
        </div>
      </div>

      {nav && (
        // <ul className="md:hidden absolute left-0  text-xl bg-mainbg w-full h-[100vh] flex justify-center flex-col align-middle px-8 py-10 ">
        <ul className={navclasses}>
          <li className="text-center py-2" onClick={handleClick}>
            <Link to="/">Home</Link>
          </li>
          {userIsLoggedIn && (
            <li className="text-center py-2" onClick={handleClick}>
              <Link to="/todos">Todos</Link>
            </li>
          )}

          <div className="flex flex-col items-center my-4">
            <div className="bg-transparent px-8  mb-4" onClick={handleClick}>
              <span className="flex flex-col gap-3 items-center">
                {!userIsLoggedIn && <Link to="/signup">Signup</Link>}
                {!userIsLoggedIn && <Link to="/login">Login</Link>}
                {userIsLoggedIn && <Link to="/account">Account</Link>}
              </span>
            </div>
          </div>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
