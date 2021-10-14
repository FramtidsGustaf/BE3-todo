import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const LogInPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
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
        login
      />
    </>
  );
};

export default LogInPage;
