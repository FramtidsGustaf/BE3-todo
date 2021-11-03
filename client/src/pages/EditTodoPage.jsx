import React from 'react';
import {useParams} from 'react-router-dom';
import {Button, Container} from 'react-bootstrap';
import {useHistory} from 'react-router';
import TodoForm from '../components/TodoForm';
import {useFetchTodos} from '../hooks/useFetchTodos';
import BASE_URL from '../constants';

const EditTodoPage = () => {
  const {id} = useParams();
  const {todos: todo} = useFetchTodos(id);
  const history = useHistory();

  const onClickHandler = async () => {
    const res = await fetch(`${BASE_URL}api`, {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
    });
    if (res.ok) {
      history.push('/');
    } else console.log(res);
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
