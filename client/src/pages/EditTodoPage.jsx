import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router';
import TodoForm from '../components/TodoForm';
import { useFetchTodos } from '../hooks/useFetchTodos';

const EditTodoPage = (props) => {
  const id = props.match.params.id;
  const { todos: todo } = useFetchTodos(id);
  const history = useHistory();

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
