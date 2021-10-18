import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useVerifyToken } from '../hooks/useVerifyToken';
import { useFetchTodos } from '../hooks/useFetchTodos';

const TodoPage = () => {
  const history = useHistory();
  useVerifyToken().then((res) => {
    if (res === -1) history.push('/login');
  });
  const { todos } = useFetchTodos();
  return (
    <div>
      <h1>Hej du är på todo</h1>
      {todos && todos.map((todo) => <ReactMarkdown>{todo.todos}</ReactMarkdown>)}
      <Link to='/add-todo'>Lägg till todo</Link>
    </div>
  );
};

export default TodoPage;
