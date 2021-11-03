import BASE_URL from '../constants';

export const fetchTodo = async (id) => {
  const storageToken = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}api/${id}`, {
    headers: {
      Authorization: storageToken,
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

export const fetchTodos = async () => {
  const storageToken = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}api`, {
    headers: {
      Authorization: storageToken,
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

export const addTodo = async (data) => {
  const body = JSON.stringify(data);
  const storageToken = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}api`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': storageToken,
    },
  });
  return res.ok;
};

export const editTodo = async (data) => {
  const body = JSON.stringify(data);
  const storageToken = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}api`, {
    method: 'PUT',
    body,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': storageToken,
    },
  });
  return res.ok;
};

export const deleteTodo = async (id) => {
  const storageToken = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}api`, {
    method: 'DELETE',
    body: JSON.stringify({id}),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': storageToken,
    },
  });
  return res.ok;
};

export const signUpUser = async (formData) => {
  const body = JSON.stringify(formData);
  const res = await fetch(`${BASE_URL}user`, {
    method: 'POST',
    body,
    headers: {'Content-Type': 'application/json'},
  });
  if (res.ok) {
    const data = await res.json();
    localStorage.setItem('token', data.token);
    return true;
  }
};

export const loginUser = async (formData) => {
  const body = JSON.stringify(formData);
  const res = await fetch(`${BASE_URL}user/login`, {
    method: 'POST',
    body,
    headers: {'Content-Type': 'application/json'},
  });
  if (res.ok) {
    const data = await res.json();
    localStorage.setItem('token', data.token);
    return true;
  }
};
