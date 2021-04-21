import React, { ReactNode } from "react";
import { BackendClient, Client } from "./Client";

const c = new BackendClient();
const ClientContext = React.createContext<Client>(c);

type Props = {
  children: ReactNode;
};

const ClientProvider = ({ children }: Props) => {
  return <ClientContext.Provider value={c}>{children}</ClientContext.Provider>;
};

const useClient = () => React.useContext(ClientContext);

export { ClientProvider, useClient };
