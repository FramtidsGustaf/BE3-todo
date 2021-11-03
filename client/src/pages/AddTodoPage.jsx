import React, {useEffect} from 'react';
import {Container} from 'react-bootstrap';
import TodoForm from '../components/TodoForm';
import {useVerifyToken} from '../hooks/useVerifyToken';

const AddTodoPage = () => {
  useEffect(() => {
    useVerifyToken().then((res) => {
      if (res === -1) history.push('/login');
    });
  }, []);

  return (
    <Container>
      <h1 className='text-success'>Lägg till todo</h1>
      <TodoForm />
    </Container>
  );
};

export default AddTodoPage;
