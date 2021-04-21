import { useCallback, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useClient } from "../Client/Provider";

const LoginPage = () => {
  const c = useClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const updateUsername = useCallback((e) => setUsername(e.target.value), []);
  const updatePassword = useCallback((e) => setPassword(e.target.value), []);

  const login = useCallback(
    async (event) => {
      event.preventDefault();
      await c.login(username, password);
      history.push("/create");
    },
    [c, username, password, history]
  );

  return (
    <div>
      <h1>React Cookie Auth</h1>
      <br />
      {!c.authenticated() ? (
        <div>
          <h2>Login</h2>
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={updateUsername}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      ) : (
        <Redirect to="/create" />
      )}
    </div>
  );
};
export default LoginPage;
