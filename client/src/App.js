import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { verifyToken } from './utils/verifyToken';
import { JwtContext } from "./context/JwtContext";
import AuthPage from "./pages/AuthPage";
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
            <AuthPage />
          </Route>
          {token && (
            <Route path="/todos">
              <TodoPage />
            </Route>
          )}
          <Route path="/">
            <AuthPage login />
          </Route>
        </Switch>
      </JwtContext.Provider>
    </div>
  );
};

export default App;
