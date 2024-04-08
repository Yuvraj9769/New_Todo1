import React, { useContext } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { TodoContext } from "../Store/ContextAPI";

const TodoList = () => {
  const {
    todos,
    delTodo,
    setupDateval,
    setcheckUpdate,
    checkUpdate,
    upDateval,
  } = useContext(TodoContext);

  const updateTodoData = (ind) => {
    const getDataToModify = todos.filter((e, index) => ind === index)[0];
    setupDateval(getDataToModify);
    setcheckUpdate(!checkUpdate);
  };

  return (
    <div className="w-full py-2 px-1 bg-slate-950 rounded-lg flex justify-center items-center">
      <ul className="py-2 px-1 flex w-full flex-col items-center gap-5">
        {todos.map((e, ind) => (
          <li
            className={`w-full flex text-black text-[22px] font-semibold px-2 gap-5 sm:gap-0 flex-col sm:flex-row py-3 items-center justify-between border border-teal-300 rounded-lg sm:text-start text-center bg-slate-50 ${
              checkUpdate && todos.indexOf(upDateval) === ind
                ? "pointer-events-none opacity-80"
                : ""
            }`}
            key={ind}
          >
            <p className="w-full sm:w-[65%]">{e.text}</p>
            <div className="flex flex-row gap-5 items-center">
              <span
                className="text-xl text-slate-50 hover:cursor-pointer bg-teal-500 hover:bg-teal-600 p-3 rounded-md"
                onClick={() => updateTodoData(ind)}
              >
                <MdModeEditOutline />
              </span>
              <span
                className="text-xl text-slate-50 hover:cursor-pointer bg-red-600 hover:bg-red-700 p-3 rounded-md"
                onClick={() => delTodo(ind)}
              >
                <MdDelete />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
