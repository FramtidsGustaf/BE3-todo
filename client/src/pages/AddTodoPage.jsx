import React from 'react';
import {Container} from 'react-bootstrap';
import TodoForm from '../components/TodoForm';
const AddTodoPage = () => {
  return (
    <Container>
      <h1 className='text-success'>Lägg till todo</h1>
      <TodoForm />
    </Container>
  );
};

export default AddTodoPage;
