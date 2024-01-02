"use client";

import { ReactNode } from "react";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";

type Props = {
  children: ReactNode;
};
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});
const Providers: React.FC<Props> = ({ children }) => (
  <WagmiConfig config={config}>{children}</WagmiConfig>
);

export default Providers;
