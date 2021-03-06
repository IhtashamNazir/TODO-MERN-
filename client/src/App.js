import React from "react";
import './App.css';
import './Todo.css';
import  {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, InputGroup, FormControl} from "react-bootstrap";
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoId, setTodoId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect( async () => {
    // const json = localStorage.getItem("todos");
    // const loadedTodos = JSON.parse(json);
    // if (loadedTodos) {
    //   setTodos(loadedTodos);
    // }
    updateState()
  }, []);

  // useEffect(() => {
  //   const json = JSON.stringify(todos);
  //   localStorage.setItem("todos", json);
  // }, [todos]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      var todooo = todo;
      var res = await axios({
          method: 'post',
          url: 'http://localhost:5000/todo',
          data: {
            todoo: todooo,
          }
      })
      var result = res.data;
      if (result.success) {
          alert("Todo Added Successfully");
          setTodo("")
      }
      else if (result && result.success === false) {
          setTodo("")
          alert(result.err);
      }
  }
  catch (e) {
      console.log(e);
  }
  updateState()
  }


  async function deleteTodo(id) {
      if (window.confirm('Delete the item?')) {
        try {
            var ID = id;
            var res = await axios({
                method: 'delete',
                url: 'http://localhost:5000/todo',
                data: {
                  Id: ID
                }
            })
            var result = res.data;
            console.log(result);
            if (result.success) {
                alert("Delete Success");
            }
            else if (result && result.success === false) {
                alert(result.err);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    updateState()
  }


  async function todoEditing(id) {
    setTodoId(id)
    alert(id)
    try {
      var ID = id;
      var res = await axios({
          method: 'get',
          url: `http://localhost:5000/todo/${ID}`,
          params: {
            id: ID
        }
      })
      var result = res.data;
      console.log(result);
      if (result.success) {
        setEditingText(result.todoo)
      }
      else if (result && result.success === false) {
          alert(result.err);
      }
      console.log(result);

  }
  catch (e) {
      console.log(e);
  }

    updateState()
  }


  async function updateState(){
    try {
      var res = await axios({
          method: 'get',
          url: `http://localhost:5000/todo`,
      })
      var result = res.data;
      // console.log(result.success);
      if (result.success) {
        setTodos(result.todoList)
      }
      else if (result || result.success === false) {
          alert(result.err);
      }
      console.log(result);
    }
    catch (e) {
        console.log(e);
    }
  }


  async function submitEdits(id) {
    try {
      var edited = editingText;
      var res = await axios({
          method: 'put',
          url: 'http://localhost:5000/todo',
          data: {
              ID: id,
              toodo: edited
          }
      })
      var result = res.data;
      if (result.success) {
          alert("Todo Updated");
      }
      else if (result && result.success === false) {
          alert(result.err);
      }
  }
  catch (e) {
      console.log(e);
  }
  updateState()
  setTodoId('')
  }


  async function toggleComplete(id) {
    try {
      var edited = editingText;
      var res = await axios({
          method: 'put',
          url: 'http://localhost:5000/todo/toggle',
          data: {
              ID: id,
              toodo: edited
          }
      })
      var result = res.data;
      if (result.success) {
          alert("Todo State Updated");
      }
      else if (result && result.success === false) {
          alert(result.err);
      }
    }
    catch (e) {
        console.log(e);
    }
    updateState()
    setTodoId('')
  }


  return (
      <div className="App">
        <header className="App-header">
          <div id="todo-list">
            <h1>Todo List</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                  type="text"
                  onChange={(e) => setTodo(e.target.value)}
                  value={todo} />
              <Button variant="success"  className="addtodo" type="submit">Add Todo</Button>
            </Form>
            {todos.map((todo) => (
                <div key={todo.ID} className="todo">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox  aria-label="Checkbox for following text input"
                                            id="completed"
                                            checked={todo.completed}
                                            onChange={() => toggleComplete(todo.ID)} />
                    </InputGroup.Prepend>
                    {todo.ID === todoId ? (
                        <FormControl  aria-label="Text input with checkbox" 
                                      value = {editingText}
                                      onChange={(e) => setEditingText(e.target.value)}/>
                    ) : (
                        <div>{todo.todo}</div>
                    )}

                    <div className="todo-actions">
                      {todo.ID === todoId ? (
                          <Button variant="success" onClick={() => submitEdits(todo.ID)}>Submit Edits</Button>
                      ) : (
                          <Button onClick={() => todoEditing(todo.ID)}>Edit</Button>
                      )}
                      <Button variant="danger" onClick={() => deleteTodo(todo.ID)}>Delete</Button>
                    </div>
                  </InputGroup>
                </div>
            ))}
          </div>
        </header>
      </div>
  );
}


export default App;