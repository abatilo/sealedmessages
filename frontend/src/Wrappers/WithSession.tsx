import { ReactNode, useEffect, useState } from "react";
import useSWR from "swr";
import { useClient } from "../Client/Provider";

type Props = {
  children: ReactNode;
};
export const WithSession = ({ children }: Props) => {
  const [sessionCreated, setSessionCreated] = useState(false);
  const c = useClient();

  // Use SWR library to setup infinite session refreshing
  useSWR(
    "/api/v1/session",
    async () => {
      await c.getSession();
    },
    { refreshInterval: 30000 }
  );

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
