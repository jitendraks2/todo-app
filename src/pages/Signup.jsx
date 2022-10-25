import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase";
import {Helmet} from "react-helmet-async"
const Signup = () => {
  // const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  // const userIsLoggedIn = currentUser !== null;
  const { register, handleSubmit } = useForm();

    const handleSignup = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: data.name,
        email: data.email,
        timeStamp: serverTimestamp(),
      });
      await setDoc(doc(db, "todos", userCredential.user.uid), {
        id: userCredential.user.uid,
        email: data.email,
        timeStamp: serverTimestamp(),
      });

      const userDetails = userCredential.user;
      dispatch({ type: "SIGNUP", payload: userDetails });
      navigate("/todos");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[90%] md:w-[80%] m-auto bg-mainbg mt-10 text-white rounded-lg h-auto px-5 py-10 flex flex-col items-center justify-center gap-3 md:px-10">
           <Helmet>
        <title>Signup</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-4 text-center">
        Signup for an account
      </h2>
      <form className="w-[80%] m-auto" onSubmit={handleSubmit(handleSignup)}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your Name
          </label>
          <input
            type="text"
            {...register("name")}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            name="password"
            {...register("password")}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="more than 8 characters"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>

        <p className="mt-7">
          Already Registered?{" "}
          <span className="font-bold">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
};
export default Signup;
