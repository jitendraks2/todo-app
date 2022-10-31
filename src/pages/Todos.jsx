import React, { useState, Suspense } from "react";
import AddTodo from "../components/Todos/AddTodo";
// import FetchTodos from "../components/Todos/FetchTodos";
import { Helmet } from "react-helmet-async";
import Loader from "../components/UI/Loader";
const FetchTodos = React.lazy(() => import("../components/Todos/FetchTodos"));

const Todos = () => {
  const [add, setAdd] = useState(false);
  const addTodo = () => {
    setAdd((prev) => !prev);
  };
  return (
    <section className="p-4 md:p-9">
      <Helmet>
        <title>Todos</title>
      </Helmet>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <h2 className="font-bold text-3xl">Your Todos</h2>
          <button
            className="bg-mainbg rounded-full px-5 py-2 ml-3 text-white"
            onClick={addTodo}
          >
            {add ? "Cancel" : "Add Todo"}
          </button>
        </div>
        {add && <AddTodo />}
      </div>
      {console.log("this is infinte")}
      <Suspense fallback={<Loader mt={10} />}>
        <FetchTodos />
      </Suspense>
    </section>
  );
};

export default Todos;
