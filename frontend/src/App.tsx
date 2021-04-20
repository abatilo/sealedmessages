import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const CreateMessagePage = lazy(() => import("./Pages/CreateMessage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const HomePage = lazy(() => import("./Pages/HomePage"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<></>}>
        <Switch>
          <Route path="/create">
            <CreateMessagePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
