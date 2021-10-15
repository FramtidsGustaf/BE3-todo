import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { verifyToken } from './utils/verifyToken';
import { JwtContext } from "./context/JwtContext";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import TodoPage from "./pages/TodoPage";

const App = () => {
  const [token, setToken] = useState(null);
  const history = useHistory();

  useEffect(() => {
    verifyToken()
      .then((verifiedToken) => {
        setToken(verifiedToken);
        if (token) history.push('/todos');
      })
  }, [history, token]);

  return (
    <div>
      <JwtContext.Provider value={{ token, setToken }}>
        <Switch>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          {token && (
            <Route path="/todos">
              <TodoPage />
            </Route>
          )}
          <Route path="/">
            <LogInPage />
          </Route>
        </Switch>
      </JwtContext.Provider>
    </div>
  );
};

export default App;
