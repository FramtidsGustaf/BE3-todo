import { useState, useEffect } from 'react';

export const useFetchTodos = () => {
  const [todos, setTodos] = useState(null);
  const storageToken = localStorage.getItem('token');

  const hejsan = async () => {
    const res = await fetch('http://localhost:3000/api', {
      headers: {
        Authorization: storageToken,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setTodos(data);
      console.log(data);
    }
  };

  useEffect(() => {
    hejsan();
  }, []);
  
  return { todos, setTodos };
};
