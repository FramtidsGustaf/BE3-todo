import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import {Form, Button} from 'react-bootstrap';
import {addTodo, editTodo} from '../api/api';

const TodoForm = ({fetchedTodo, todoId}) => {
  const history = useHistory();
  const [todo, setTodo] = useState('');
  const id = todoId ?? false;

  useEffect(() => {
    if (fetchedTodo) setTodo(fetchedTodo);
  }, [fetchedTodo]);

  const handleOnChange = (e) => {
    setTodo(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      const res = await editTodo({id, todos: todo});
      if (res) history.push('/');
    } else {
      const res = await addTodo({todos: todo});
      if (res) history.push('/');
    }
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
