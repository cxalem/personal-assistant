"use client";

import { Button } from "./ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

type LoginButtonProps = {
  children?: React.ReactNode;
};

export const LoginButton: React.FC<LoginButtonProps> = ({
  children = "Login",
}) => {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <Button
        className="bg-green-500 hover:bg-green-400 px-10"
        onClick={() => disconnect()}
      >
        Disconnect
      </Button>
    );
  }

  return (
    <Button
      className="bg-green-500 hover:bg-green-400 px-10"
      onClick={() => connect()}
    >
      {children}
    </Button>
  );
};
