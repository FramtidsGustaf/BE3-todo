import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { JwtContext } from '../context/JwtContext';

const AuthPage = ({ login }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setToken } = useContext(JwtContext);
  const history = useHistory();
  const url = 'http://localhost:3000/user';

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}${login ? '/login' : ''}`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
      localStorage.setItem('token', data.token);
      history.push('/todos');
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AuthForm
        handleOnSubmit={handleOnSubmit}
        formData={formData}
        handleOnChange={handleOnChange}
        login={login}
      />
    </>
  );
};

export default AuthPage;
