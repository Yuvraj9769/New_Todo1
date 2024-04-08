import React, { useContext, useRef } from "react";
import { TodoContext } from "../Store/ContextAPI";
import { toast } from "react-toastify";

const AddTodo = () => {
  const { addTodo, upDateval, checkUpdate, todos, setTodos, setcheckUpdate } =
    useContext(TodoContext);
  const inpData = useRef("");

  if (checkUpdate && todos.length !== 0) {
    inpData.current.value = upDateval?.text;
  }

  const getData = () => {
    if (inpData.current.value === "" || !inpData.current.value.trim()) {
      toast.error("Please  enter the task!");
    } else {
      const sendData = {
        text: inpData.current.value,
      };
      addTodo(sendData);
      inpData.current.value = "";
    }
  };

  const updateData = () => {
    if (inpData.current.value === "" || !inpData.current.value.trim()) {
      toast.error("Please  enter the task!");
    } else {
      if (todos.includes(upDateval)) {
        const update = {
          type: "Update",
          payload: {
            data: upDateval,
            text: inpData.current.value,
          },
        };
        setTodos(update);
        inpData.current.value = "";
        setcheckUpdate(false);
      }
    }
  };

  return (
    <div className="w-full p-2 flex flex-col items-center gap-6">
      <h1 className="text-6xl font-bold uppercase text-slate-50 my-4">
        Todo List
      </h1>
      <div className="w-full p-2 flex flex-col sm:flex-row items-center gap-5 border border-teal-600 rounded-lg lg:justify-between">
        <input
          type="text"
          className="outline-none rounded-lg p-2 w-full lg:w-[55%] text-lg"
          ref={inpData}
          onKeyDown={(e) =>
            e.key === "Enter" && (checkUpdate ? updateData() : getData())
          }
        />
        {checkUpdate && todos.length !== 0 ? (
          <button
            className="bg-teal-500 px-5 py-3 rounded-lg text-base text-slate-50 font-semibold hover:bg-teal-600"
            onClick={updateData}
          >
            Update
          </button>
        ) : (
          <button
            className="bg-blue-700 px-5 py-3 rounded-lg text-base text-slate-50 font-semibold hover:bg-blue-800"
            onClick={getData}
          >
            Add Todo
          </button>
        )}
      </div>
    </div>
  );
};

export default AddTodo;
