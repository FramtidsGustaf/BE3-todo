import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import BASE_URL from '../constants';

const AuthPage = ({login}) => {
  const [formData, setFormData] = useState({email: '', password: ''});
  const history = useHistory();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}user/${login ? 'login' : ''}`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'application/json'},
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      history.push('/');
    }
  };

  const handleOnChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
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
