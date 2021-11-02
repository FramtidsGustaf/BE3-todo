import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Form, Button } from 'react-bootstrap';

const TodoForm = ({ fetchedTodo, todoId }) => {
  const history = useHistory();
  const [todo, setTodo] = useState('');
  const method = fetchedTodo ? 'PUT' : 'POST';
  const id = todoId ?? false;

  useEffect(() => {
    if (fetchedTodo) setTodo(fetchedTodo);
  }, [fetchedTodo]);

  const handleOnChange = (e) => {
    setTodo(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const body = id
      ? JSON.stringify({ id, todos: todo })
      : JSON.stringify({ todos: todo });
    const res = await fetch('http://localhost:3000/api', {
      method,
      body,
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
    <Form onSubmit={handleOnSubmit}>
      <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
        <Form.Label className='text-success'>
          {fetchedTodo ? 'Ändra din todo här' : 'Lägg till din todo här'}
        </Form.Label>
        <Form.Control
          className='bg-success text-white border-dark'
          as='textarea'
          rows={20}
          onChange={handleOnChange}
          value={todo && todo}
        />
      </Form.Group>
      <Button type='submit' variant='warning'>
        Save
      </Button>
    </Form>
  );
};

export default TodoForm;
