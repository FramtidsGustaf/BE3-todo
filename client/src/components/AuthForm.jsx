import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function AuthForm({ handleOnSubmit, formData, handleOnChange, login }) {
  return (
    <div className='w-25 position-absolute top-50 start-50 translate-middle'>
      <Form className='mx-auto w-100' onSubmit={handleOnSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            onChange={handleOnChange}
            value={formData.email}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleOnChange}
            value={formData.password}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          {login ? 'Log in' : 'Sign Up'}
        </Button>
      </Form>
      {!login && <Link to='/login'>Already have an account?</Link>}
    </div>
  );
}

export default AuthForm;
