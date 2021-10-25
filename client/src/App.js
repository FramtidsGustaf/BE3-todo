import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TodoPage from "./pages/TodoPage";
import AddTodoPage from "./pages/AddTodoPage";
import EditTodoPage from "./pages/EditTodoPage";
import { Container } from "react-bootstrap";
import TodoDetailPage from "./pages/TodoDetailPage";

const App = () => {
  return (
    <Container>
      <Switch>
        <Route path="/edit-todo/:id" component={EditTodoPage} />
        <Route path="/todo/:id" component={TodoDetailPage} />
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
    </Container>
  );
};

export default App;
