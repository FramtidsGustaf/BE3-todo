import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router";

const EditTodoPage = (props) => {
  const [todo, setTodo] = useState();
  const history = useHistory();
  const id = props.match.params.id;

  const fetchtodo = async () => {
    const res = await fetch(`http://localhost:3000/api/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    setTodo(data.todos);
  };

  useEffect(() => {
    fetchtodo();
  }, []);

  const handleOnChange = (e) => {
    setTodo(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api", {
      method: "PUT",
      body: JSON.stringify({ id, todos: todo }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.ok) {
      history.push("/");
    } else console.log(res);
  };

  const onClickHandler = async () => {
    const res = await fetch("http://localhost:3000/api", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.ok) {
      history.push("/");
    } else console.log(res);
  };

  return (
    <Container>
      <h1>Lägg till todo</h1>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Lägg till din todo här</Form.Label>
          {todo && (
            <Form.Control
              as="textarea"
              rows={20}
              onChange={handleOnChange}
              value={todo}
            />
          )}
        </Form.Group>
        <Button type="submit" variant="primary">
          Save
        </Button>
        <Button
          className="m-2"
          type="button"
          variant="danger"
          onClick={onClickHandler}
        >
          Delete
        </Button>
      </Form>
    </Container>
  );
};

export default EditTodoPage;
