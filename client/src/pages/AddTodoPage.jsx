import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Form, Button } from 'react-bootstrap';
const AddTodoPage = () => {
  const [todo, setTodo] = useState('');
  const history = useHistory();

  const handleOnChange = (e) => {
    setTodo(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api', {
      method: 'POST',
      body: JSON.stringify({ todos: todo }),
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
    <div>
      <h1>Lägg till todo</h1>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Lägg till din todo här</Form.Label>
          <Form.Control as='textarea' rows={20} onChange={handleOnChange} />
        </Form.Group>
        <Button type='submit' variant='primary'>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default AddTodoPage;
