import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {useVerifyToken} from '../hooks/useVerifyToken';
import {useFetchTodos} from '../hooks/useFetchTodos';
import {Card, Container, Col, Row, Button, Badge} from 'react-bootstrap';

const TodoPage = () => {
  const history = useHistory();
  useVerifyToken().then((res) => {
    if (res === -1) history.push('/login');
  });
  const {todos} = useFetchTodos();

  const onClickHandler = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <Container>
      <Link to='/add-todo'>
        <Button variant='warning'>Lägg till todo</Button>
      </Link>
      <Button variant='danger' className='m-3' onClick={onClickHandler}>
        Logout
      </Button>
      <Row>
        {todos &&
          todos.map((todo) => (
            <Col className='my-3' key={todo._id}>
              <Link
                className='col-md-4 text-decoration-none'
                to={`/todo/${todo._id}`}
              >
                <Card className='h-100 bg-success text-white shadow-lg'>
                  <Card.Body>
                    <ReactMarkdown>{todo.todos}</ReactMarkdown>
                  </Card.Body>
                  <Card.Text className='mx-auto'>
                    {
                      <Badge bg='dark text-warning'>
                        {new Date(todo.createdAt).toDateString()}
                      </Badge>
                    }
                  </Card.Text>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default TodoPage;
