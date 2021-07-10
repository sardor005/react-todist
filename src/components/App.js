import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState('')
  
 useEffect(() => {
   const temp = localStorage.getItem("todos");
   const loaded = JSON.parse(temp);

   if (loaded) {
     setTodos(loaded);
   }
 }, []);

 useEffect(() => {
   const json = JSON.stringify(todos);
   localStorage.setItem("todos", json);
 }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      complited: false,
    };

    setTodos((prevTodo) => [...prevTodo, newTodo]);
    setTodo("");
  }

  function deleteBtn(id) {
    const updetedTodo = [...todos].filter((todo) => todo.id !== id);
    setTodos(updetedTodo);
  }

  function toggleComplite(id) {
    const upgreded = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.complited = !todo.complited;
        return todo;
      }
    });

    setTodos(upgreded);
  }

  function submitEdit(id){
    const updated = [...todos].map(todo => {
      if(todo.id === id){
        todo.text = editingText
      }
      return todo
    })
    setTodos(updated)
    setTodoEditing(null);
    setEditingText('')

  }
///////////////////////////////////////
////////////////////

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Submit</button>
      </form>

      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            {todoEditing === todo.id ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
              />
            ) : (
              <div>{todo.text}</div>
            )}
            <button onClick={() => deleteBtn(todo.id)}>Delete</button>
            <input
              type="checkbox"
              onChange={() => toggleComplite(todo.id)}
              checked={todo.complited}
            />

            {todoEditing === todo.id ? (
              <button onClick={() => submitEdit(todo.id)}>Submit Edit</button>
              ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default App;
