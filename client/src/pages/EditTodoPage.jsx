import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router';
import TodoForm from '../components/TodoForm';

const EditTodoPage = (props) => {
  const [todo, setTodo] = useState();
  const history = useHistory();
  const id = props.match.params.id;

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await fetch(`http://localhost:3000/api/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      setTodo(data.todos);
    };
    fetchTodo();
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
      {todo && <TodoForm fetchedTodo={todo} todoId={id} />}
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
