import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { JwtContext } from "./context/JwtContext";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import TodoPage from "./pages/TodoPage";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storageToken = localStorage.getItem("token");
    const verifyToken = async (token) => {
      const res = await fetch("http://localhost:3000/user/verify-jwt", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
      });
      if (res.ok) {
        storageToken && setToken(storageToken);
      }
    };
    storageToken && verifyToken(storageToken);
  }, []);

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
