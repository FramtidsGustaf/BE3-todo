import React from "react";
import { Switch, Route, } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TodoPage from "./pages/TodoPage";
import AddTodoPage from "./pages/AddTodoPage";

const App = () => {

  return (
    <div>
      <Switch>
        <Route path="/add-todo">
          <AddTodoPage />
        </Route>
        <Route path="/signup">
          <AuthPage />
        </Route>
        <Route path="/login">
          <AuthPage login />
        </Route>
        <Route path="/">
          <TodoPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
