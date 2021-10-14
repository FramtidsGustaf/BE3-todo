import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LogInPage />
      </Route>
      <Route path="/">
        <SignUpPage />
      </Route>
    </Switch>
  );
}

export default App;
