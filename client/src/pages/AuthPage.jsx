import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import {signUpUser, loginUser} from '../api/api';

const AuthPage = ({login}) => {
  const [formData, setFormData] = useState({email: '', password: ''});
  const history = useHistory();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (login && await loginUser(formData)) history.push('/');
    if (!login && await signUpUser(formData)) history.push('/');
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
