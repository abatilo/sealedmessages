import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import { useClient } from "../Client/Provider";

const LoginPage = () => {
  const c = useClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  console.log(c.authenticated());

  const login = useCallback(
    (event) => {
      event.preventDefault();
      c.login(username, password);
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
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={({ target: { value } }) => setPassword(value)}
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
