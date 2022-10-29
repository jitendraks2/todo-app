import { useModalStore } from "../store/modalStore";
import EditTodoModal from "./Modal";
import SingleTodo from "./SingleTodo";

import { useEffect, useState } from "react";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../utils/firebase";

const FetchTodos = () => {
  const [todos, setTodos] = useState([]);

  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserID(uid);
      } else {
      }
    });
    const fetchTodos = async () => {
      if (userID !== null) {
        const q = query(collection(db, userID), orderBy("createdAt", "desc"));

        const getTodos = onSnapshot(q, (querySnapshot) => {
          let todosArray = [];
          querySnapshot.forEach((doc) => {
            // console.log({...doc.data()});
            todosArray.push({ ...doc.data(), id: doc.id });
            console.log("todos array", todosArray);
          });
          setTodos(todosArray);
        });
        return getTodos;
      }
    };

    fetchTodos();
  }, [userID]);
  const [modalData, setModalData] = useState("");
  const [modalId, setModalId] = useState("");
  const openModal = useModalStore((state) => state.openModal);

  const handleModal = (todo, todoId) => {
    openModal();
    setModalData(todo);
    setModalId(todoId);
  };
  return (
    // {TODOS.map(todos)=>(<SingleTodo/>)}
    <>
      <EditTodoModal userId={userID} todoId={modalId} todo={modalData} />
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Active Todos</h2>
        {todos.map(
          (todos) =>
            !todos.isCompleted && (
              <SingleTodo
                key={todos.id}
                userId={userID}
                todoId={todos.id}
                todo={todos.todo}
                todoIsCompleted={todos.isCompleted}
                handleModal={handleModal}
              />
            )
        )}

        <h2 className="text-2xl font-bold mt-10">Completed Todos</h2>
        {todos.map(
          (todos) =>
            todos.isCompleted && (
              <SingleTodo
                key={todos.id}
                userId={userID}
                todoId={todos.id}
                todo={todos.todo}
                todoIsCompleted={todos.isCompleted}
                handleModal={handleModal}
              />
            )
        )}
      </div>
    </>
  );
};

export default FetchTodos;
