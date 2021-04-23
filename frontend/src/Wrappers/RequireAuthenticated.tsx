import { ReactNode } from "react";
import { Redirect } from "react-router";
import { useClient } from "../Client/Provider";

type Props = {
  children: ReactNode;
};
export const RequireAuthenticated = ({ children }: Props) => {
  const c = useClient();
  if (c.authenticated()) {
    return <>{children}</>;
  }
  return <Redirect to="/login" />;
};
