import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ClientProvider } from "./Client/Provider";

const CreateMessagePage = lazy(() => import("./Pages/CreateMessage"));
const MessageDetailPage = lazy(() => import("./Pages/MessageDetailPage"));
const HomePage = lazy(() => import("./Pages/HomePage"));

const App = () => {
  return (
    <ClientProvider>
      <Router>
        <Suspense fallback={<></>}>
          <Switch>
            <Route path="/create">
              <CreateMessagePage />
            </Route>
            <Route path="/:id">
              <MessageDetailPage />
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
