import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {useVerifyToken} from '../hooks/useVerifyToken';
import {fetchTodos} from '../api/api';
import {
  Card,
  Container,
  Col,
  Row,
  Button,
  Badge,
  Spinner,
} from 'react-bootstrap';

const TodoPage = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchTodos().then((data) => {
      setTodos(data);
    });

    useVerifyToken().then((res) => {
      if (res === -1) history.push('/login');
      else setLoading(false);
    });
  }, []);

  const onClickHandler = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <Container>
      {!loading ? (
        <>
          <Link to='/add-todo'>
            <Button variant='warning'>Lägg till todo</Button>
          </Link>
          <Button variant='danger' className='m-3' onClick={onClickHandler}>
            Logout
          </Button>
          <Row>
            {todos ? (
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
                            {new Date(todo.updatedAt).toDateString()}
                          </Badge>
                        }
                      </Card.Text>
                    </Card>
                  </Link>
                </Col>
              ))
            ) : (<h2 className="text-success">Inga todos ännu!</h2>)}
          </Row>
        </>
      ) : (
        <Spinner
          variant='success'
          animation='border'
          role='status'
        >
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}
    </Container>
  );
};

export default TodoPage;
