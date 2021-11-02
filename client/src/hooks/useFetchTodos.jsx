import {useState, useEffect} from 'react';
import BASE_URL from '../constants';

export const useFetchTodos = (id) => {
  const [todos, setTodos] = useState(null);
  const storageToken = localStorage.getItem('token');
  let endpoint;

  if (id) endpoint = `${BASE_URL}api/${id}`;
  else endpoint = `${BASE_URL}api`;

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
