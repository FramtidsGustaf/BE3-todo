import {useState, useEffect} from 'react';

export const useFetchTodos = (id) => {
  const [todos, setTodos] = useState(null);
  const storageToken = localStorage.getItem('token');
  let endpoint;

  if (id) endpoint = `http://localhost:3000/api/${id}`;
  else endpoint = 'http://localhost:3000/api';

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch(endpoint, {
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
  }, [storageToken, endpoint]);

  return {todos, setTodos};
};
