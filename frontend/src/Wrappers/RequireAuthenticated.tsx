import { ReactNode } from "react";
import { Redirect } from "react-router";
import { useClient } from "../Client/Provider";

type Props = {
  children: ReactNode;
};
export const RequireAuthenticated = ({ children }: Props) => {
  const c = useClient();
  console.log("From RequireAuthenticated: " + c.authenticated());
  if (c.authenticated()) {
    return <>{children}</>;
  }
  return <Redirect to="/login" />;
};
