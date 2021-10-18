import React from "react";
import { Link, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useVerifyToken } from "../hooks/useVerifyToken";
import { useFetchTodos } from "../hooks/useFetchTodos";
import { Card, Container, Col, Row, Button } from "react-bootstrap";

const TodoPage = () => {
  const history = useHistory();
  useVerifyToken().then((res) => {
    if (res === -1) history.push("/login");
  });
  const { todos } = useFetchTodos();

  return (
    <Container>
      <h1>Hej du är på todo</h1>
      <Link to="/add-todo">
        <Button>Lägg till todo</Button>
      </Link>
      <Row>
        {todos &&
          todos.map((todo) => (
            <Col className="my-3">
              <Link
                className="col-md-4 text-decoration-none text-black"
                to={`/edit-todo/${todo._id}`}
              >
                <Card className="h-100">
                  <Card.Body className="">
                    <ReactMarkdown>{todo.todos}</ReactMarkdown>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default TodoPage;
