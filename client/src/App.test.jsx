import React from 'react';
import {render, screen} from '@testing-library/react';
import AddTodoPage from './pages/AddTodoPage';

test('renders learn react link', () => {
  render(<AddTodoPage />);
  const linkElement = screen.getByText(/Lägg till todo/i);
  expect(linkElement).toBeInTheDocument();
});
