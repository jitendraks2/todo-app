import { useForm } from "react-hook-form";
import { nanoid } from "nanoid/non-secure";
import { useState } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Helmet } from "react-helmet-async";
const AddTodo = () => {
  const [userID, setUserID] = useState(null);
  const id = nanoid();
  // console.log(id);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUserID(uid);
    } else {
    }
  });

  const { register, handleSubmit, reset } = useForm();

  const handleTodos = async (data) => {
    try {
      await setDoc(doc(db, userID, id), {
        todo: data.todos,
        isCompleted: false,
        createdAt: Timestamp.now(),
      });
    } catch (err) {
      console.log("Error", err);
    }

    reset();
  };

  return (
    <div>
      <Helmet>
        <title>Add Todos</title>
      </Helmet>
      <form className=" mt-3" onSubmit={handleSubmit(handleTodos)}>
        <div className="mb-6">
          <input
            type="textarea"
            {...register("todos")}
            id="todos"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your todo"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add todo
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
