import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ClientProvider } from "./Client/Provider";
import { RequireAuthenticated } from "./Wrappers/RequireAuthenticated";
import { WithSession } from "./Wrappers/WithSession";

const CreateMessagePage = lazy(() => import("./Pages/CreateMessage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const HomePage = lazy(() => import("./Pages/HomePage"));

const App = () => {
  return (
    <ClientProvider>
      <Router>
        <Suspense fallback={<></>}>
          <Switch>
            <Route path="/create">
              <WithSession>
                <RequireAuthenticated>
                  <CreateMessagePage />
                </RequireAuthenticated>
              </WithSession>
            </Route>
            <Route path="/login">
              <WithSession>
                <LoginPage />
              </WithSession>
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </ClientProvider>
  );
};

export default App;
