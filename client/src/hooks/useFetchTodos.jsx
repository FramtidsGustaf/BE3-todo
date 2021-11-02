import { useState, useEffect } from 'react';

export const useFetchTodos = () => {
  const [todos, setTodos] = useState(null);
  const storageToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('http://localhost:3000/api', {
        headers: {
          Authorization: storageToken,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setTodos(data);
      }
    };
    fetchTodos();
  }, [storageToken]);

  return { todos, setTodos };
};
