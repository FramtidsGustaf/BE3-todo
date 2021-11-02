import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';

function AuthForm({handleOnSubmit, formData, handleOnChange, login}) {
  return (
    <div className='w-25 position-absolute top-50 start-50 translate-middle'>
      <h1 className='text-success mb-4'>{login ? 'Login' : 'Signup'}</h1>
      <Form className='mx-auto w-100 mb-3' onSubmit={handleOnSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label className='text-success'>Email address</Form.Label>
          <Form.Control
            className='bg-success text-white border-dark'
            type='email'
            name='email'
            onChange={handleOnChange}
            value={formData.email}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label className='text-success'>Password</Form.Label>
          <Form.Control
            className='bg-success text-white border-dark'
            type='password'
            name='password'
            onChange={handleOnChange}
            value={formData.password}
            autoComplete='on'
          />
        </Form.Group>
        <Button variant='success' type='submit'>
          {login ? 'Log in' : 'Sign Up'}
        </Button>
      </Form>
      {login && (
        <Link className='text-warning' to='/signup'>
          Dont have an account?
        </Link>
      )}
      {!login && (
        <Link className='text-warning' to='/login'>
          Already have an account?
        </Link>
      )}
    </div>
  );
}

export default AuthForm;
