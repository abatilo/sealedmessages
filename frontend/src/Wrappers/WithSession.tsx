import { ReactNode, useEffect, useState } from "react";
import { useClient } from "../Client/Provider";

type Props = {
  children: ReactNode;
};
export const WithSession = ({ children }: Props) => {
  const [sessionCreated, setSessionCreated] = useState(false);
  const c = useClient();

  useEffect(() => {
    const startSession = async () => {
      await c.getCSRF();
      await c.getSession();
      setSessionCreated(true);
    };
    startSession();
  }, [c]);

  if (sessionCreated) {
    return <>{children}</>;
  }
  return <></>;
};
