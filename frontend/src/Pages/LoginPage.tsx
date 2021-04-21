import { useCallback, useEffect, useState } from "react";
import { BackendClient } from "../Client/Client";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCSRFToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getCSRF = async () => {
      const c = new BackendClient();
      const { csrfToken } = await c.getCSRF();
      setCSRFToken(csrfToken);

      const sessionResponse = await fetch("/api/v1/session", {
        credentials: "same-origin",
      });

      if (sessionResponse.ok) {
        const { isAuthenticated } = await sessionResponse.json();
        setIsAuthenticated(isAuthenticated);
      }
    };
    getCSRF();
  }, []);

  const login = useCallback(
    (event) => {
      event.preventDefault();

      const sendLogin = async () => {
        const resp = await fetch("/api/v1/login", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          body: JSON.stringify({ username, password }),
        });

        if (resp.ok) {
          setIsAuthenticated(true);
        }
      };

      sendLogin();
    },
    [username, password, csrfToken]
  );

  const logout = useCallback(() => {
    const sendLogout = async () => {
      await fetch("/api/v1/logout", {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });
      setIsAuthenticated(false);
    };

    sendLogout();
  }, [csrfToken]);

  return (
    <div>
      <h1>React Cookie Auth</h1>
      <br />
      {!isAuthenticated ? (
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
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
};
export default LoginPage;
