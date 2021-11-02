import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Button, Container, Row, Col } from 'react-bootstrap';

const TodoDetailPage = (props) => {
  const [todo, setTodo] = useState();
  const history = useHistory();
  const id = props.match.params.id;

  useEffect(() => {
    const fetchtodo = async () => {
      const res = await fetch(`http://localhost:3000/api/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      setTodo(data.todos);
    };
    fetchtodo();
  }, [id]);

  const onClickHandler = async () => {
    const res = await fetch('http://localhost:3000/api', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });
    if (res.ok) {
      history.push('/');
    } else console.log(res);
  };

  return (
    <Container>
      <h1 className='text-success'>Lägg till todo</h1>
      {todo && (
        <Row>
          <Col>
            <ReactMarkdown className='bg-success text-white p-4 rounded overflow-auto'>
              {todo}
            </ReactMarkdown>
            <div>
              <Link to={`/edit-todo/${id}`} className='btn btn-warning'>
                Edit
              </Link>
              <Button variant='danger' className='m-3' onClick={onClickHandler}>
                Delete
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default TodoDetailPage;
