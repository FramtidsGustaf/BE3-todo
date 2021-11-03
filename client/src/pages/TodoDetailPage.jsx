import React, {useEffect, useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {Button, Container, Row, Col} from 'react-bootstrap';
import {useVerifyToken} from '../hooks/useVerifyToken';
import {fetchTodo, deleteTodo} from '../api/api';

const TodoDetailPage = (props) => {
  const [todo, setTodo] = useState(null);
  const history = useHistory();
  const id = props.match.params.id;

  useEffect(() => {
    useVerifyToken().then((res) => {
      if (res === -1) history.push('/login');
    });
    fetchTodo(id).then((data) => setTodo(data));
  }, []);

  const onClickHandler = async () => {
    const res = await deleteTodo(id);
    if (res) history.push('/');
  };

  return (
    <Container>
      <h1 className='text-success'>Lägg till todo</h1>
      {todo && (
        <Row>
          <Col>
            <ReactMarkdown
              className='bg-success text-white p-4 rounded overflow-auto'>
              {todo.todos}
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
