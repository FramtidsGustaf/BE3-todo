import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Container} from 'react-bootstrap';
import {useHistory} from 'react-router';
import TodoForm from '../components/TodoForm';
import {useVerifyToken} from '../hooks/useVerifyToken';
import {fetchTodo, deleteTodo} from '../api/api';

const EditTodoPage = () => {
  const [todo, setTodo] = useState(null);
  const {id} = useParams();
  const history = useHistory();

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
      {todo && <TodoForm fetchedTodo={todo.todos} todoId={id} />}
      <Button
        className='mt-2'
        type='button'
        variant='danger'
        onClick={onClickHandler}
      >
        Delete
      </Button>
    </Container>
  );
};

export default EditTodoPage;
