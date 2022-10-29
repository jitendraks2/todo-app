import React from "react";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FaCheck, FaEdit, FaTrash, FaUndo } from "react-icons/fa";
import { db } from "../../utils/firebase";

const SingleTodo = ({ userId, todoId, todo, todoIsCompleted, handleModal }) => {
  const handleDelete = async (id) => {
    console.log("you clicked", id);
    console.log("hello", userId);

    await deleteDoc(doc(db, userId, id));
  };

  const handleComplete = async (todoId) => {
    const docRef = doc(db, userId, todoId);
    await updateDoc(docRef, {
      isCompleted: true,
    });
  };
  const handleUndo = async (todoId) => {
    const docRef = await doc(db, userId, todoId);
    await updateDoc(docRef, {
      isCompleted: false,
    });
  };

  return (
    <div
      className={`${
        todoIsCompleted ? "bg-green-800" : "bg-mainbg"
      } rounded-lg text-white py-2 px-5 mt-5 flex items-center justify-between`}
    >
      <p className="">{todo}</p>
      <div className="flex items-center align-middle">
        {todoIsCompleted && (
          <div
            className="cursor-pointer mr-5 text-[19px]"
            onClick={() => handleUndo(todoId)}
          >
            <FaUndo />
          </div>
        )}
        {!todoIsCompleted && (
          <div
            className="cursor-pointer mr-5 text-[19px]"
            onClick={() => handleComplete(todoId)}
          >
            <FaCheck />
          </div>
        )}
        {!todoIsCompleted && (
          <div
            className="cursor-pointer mr-5 text-[19px]"
            onClick={() => handleModal(todo, todoId)}
          >
            <FaEdit />
          </div>
        )}
        <div className="cursor-pointer" onClick={() => handleDelete(todoId)}>
          <FaTrash />
        </div>
      </div>
    </div>
  );
};

export default SingleTodo;
