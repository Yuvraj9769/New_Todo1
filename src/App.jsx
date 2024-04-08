import { useReducer, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Conatiner from "./components/Conatiner";
import { TodoContext } from "./Store/ContextAPI";
import Errormsg from "./components/Errormsg";
import Copyright from "./components/Copyright";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

let todoReducer = (state, action) => {
  if (action.type === "Add") {
    const newArr = [...state, { ...action.payload.text }];
    return newArr;
  } else if (action.type === "Del") {
    let arr = state.filter((e, index) => index !== action.payload.ind);
    return arr;
  } else if (action.type === "Update") {
    let arrInd = state.indexOf(action.payload.data);
    let Uarr = [...state];
    let updatearr = { ...state[arrInd], text: action.payload.text };
    Uarr[arrInd] = updatearr;
    return Uarr;
  }
};

function App() {
  const [todos, setTodos] = useReducer(todoReducer, []);
  const [upDateval, setupDateval] = useState("");
  const [checkUpdate, setcheckUpdate] = useState(false);

  const addTodo = (data) => {
    const sdata = {
      type: "Add",
      payload: { text: data },
    };
    setTodos(sdata);
  };

  const delTodo = (id) => {
    const delId = {
      type: "Del",
      payload: {
        ind: id,
      },
    };

    setTodos(delId);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <TodoContext.Provider
        value={{
          todos,
          addTodo,
          delTodo,
          upDateval,
          setupDateval,
          checkUpdate,
          setcheckUpdate,
          setTodos,
        }}
      >
        <Conatiner>
          <AddTodo />
          {todos.length === 0 ? <Errormsg /> : <TodoList />}
          <Copyright />
        </Conatiner>
      </TodoContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
