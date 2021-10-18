import React from "react";
import { Link, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useVerifyToken } from "../hooks/useVerifyToken";
import { useFetchTodos } from "../hooks/useFetchTodos";
import { Card, Container } from "react-bootstrap";

const TodoPage = () => {
  const history = useHistory();
  useVerifyToken().then((res) => {
    if (res === -1) history.push("/login");
  });
  const { todos } = useFetchTodos();

  return (
    <Container>
      <h1>Hej du är på todo</h1>
      <div className="grid">
        {todos &&
          todos.map((todo) => (
            <Link to={`/edit-todo/${todo._id}`}>
              <Card className="h-100">
                <Card.Body>
                  <ReactMarkdown>{todo.todos}</ReactMarkdown>
                </Card.Body>
              </Card>
            </Link>
          ))}
      </div>
      <Link to="/add-todo">Lägg till todo</Link>
    </Container>
  );
};

export default TodoPage;
