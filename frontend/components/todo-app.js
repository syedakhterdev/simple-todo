import React from "react";
import FetchApi from "../fetch-api";
import TodoForm from "./todo-form";
import { Button } from "@material-ui/core";
import { TodosCount } from "./todos-count";

const listStyle = {
  paddingLeft: 0,
  border: "1px solid #cfcfcf",
  width: "100%",
};

const listItemStyle = {
  listStyleType: "none",
  padding: "10px",
  borderBottom: "1px solid #cfcfcf",
};

const listCompletedStyles = {
  width: "250px",
  padding: "10px",
  lineBreak: "anywhere",
};

const listColumnStyle = {
  maxWidth: "767px",
  width: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default class TodoApp extends React.Component {
  state = { todos: [] };

  constructor(props) {
    super(props);
    this.getTodos();
  }

  getTodos = () => {
    return FetchApi.get("/todo")
      .then((todos) => this.setState({ todos }))
      .catch(() => alert("There was an error getting todos"));
  };

  createTodo = (text, isCompleted) => {
    FetchApi.post("/todo", { text, isCompleted })
      .then((newTodo) => {
        const newTodos = Array.from(this.state.todos);
        newTodos.push(newTodo);
        this.setState({ todos: newTodos, isCompleted });
      })
      .catch(() => alert("There was an error creating the todo"));
  };

  handleDeleteRequest = (id) => {
    FetchApi.delete(`/todo/${id}`)
      .then(() => {
        const newTodos = Array.from(this.state.todos);
        const todoIndex = newTodos.findIndex(
          (todo) => todo.id.toString() === id.toString()
        );
        newTodos.splice(todoIndex, 1);
        this.setState({ todos: newTodos });
      })
      .catch(() => alert("There was an error removing todo"));
  };

  handleUpdateRequest = (id, text, isCompleted) => {
    FetchApi.put(`/todo/${id}`, { id, text, isCompleted })
      .then(() => {
        const newTodos = this.state.todos.map((todo) =>
          todo.id === id ? { id, text, isCompleted } : todo
        );
        this.setState({ todos: newTodos });
      })
      .catch(() => alert("There was an error updating todo"));
  };

  render() {
    return (
      <div>
        <div style={listColumnStyle}>
          <h1>Todos</h1>
          <TodosCount todos={this.state.todos} />
          <br />
          <TodoForm
            onSubmit={(text, isCompleted) => this.createTodo(text, isCompleted)}
          />
          <br />
          <ul style={listStyle}>
            {this.state.todos.map((todo) => (
              <li style={listItemStyle} key={todo.id}>
                <div
                  style={{
                    display: "flex",
                    flexDirections: "row",
                  }}
                >
                  <label
                    style={{
                      ...listCompletedStyles,
                      textDecoration: todo.isCompleted
                        ? "line-through"
                        : "unset",
                    }}
                  >
                    {todo.text}
                  </label>
                  <TodoForm
                    todo={todo}
                    onSubmit={(text, isCompleted) =>
                      this.handleUpdateRequest(todo.id, text, isCompleted)
                    }
                  />
                  <Button
                    style={{ margin: "auto" }}
                    color="secondary"
                    variant="contained"
                    onClick={() => this.handleDeleteRequest(todo.id)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
