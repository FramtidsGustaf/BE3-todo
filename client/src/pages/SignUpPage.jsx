import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';

const SignUpPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/user', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    }).then((data) => console.log(data));
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AuthForm
      handleOnSubmit={handleOnSubmit}
      formData={formData}
      handleOnChange={handleOnChange}
    />
  );
};

export default SignUpPage;
