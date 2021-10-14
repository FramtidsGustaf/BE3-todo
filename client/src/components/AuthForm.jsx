import React from 'react';
import { Form, Button } from 'react-bootstrap';

function AuthForm({ handleOnSubmit, formData, handleOnChange }) {
  return (
    <>
      <h2>Sign In</h2>
      <Form
        className='w-25 position-absolute top-50 start-50 translate-middle'
        onSubmit={handleOnSubmit}
      >
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            onChange={handleOnChange}
            value={formData.email}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
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
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default AuthForm;
