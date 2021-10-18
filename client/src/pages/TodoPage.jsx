import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useVerifyToken } from '../hooks/useVerifyToken';
import { useFetchTodos } from '../hooks/useFetchTodos';

const TodoPage = () => {
  useVerifyToken();
  const { todos, setTodos } = useFetchTodos();
  return (
    <div>
      <h1>Hej du är på todo</h1>
      {todos && todos.map((todo) => <ReactMarkdown>{todo.todo}</ReactMarkdown>)}
      <Link to='/add-todo'>Lätt till todo</Link>
    </div>
  );
};

export default TodoPage;
