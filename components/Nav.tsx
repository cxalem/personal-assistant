"use client";

import Link from "next/link";
import { LoginButton } from "@/components/LoginButton";
import { useAccount } from "wagmi";

export const Nav = () => {
  const { address, isConnected } = useAccount();

  const isPersonal = address === process.env.PERSONAL_ADDRESS;
  return (
    <header className="flex justify-between items-center py-3 rounded-md mt-4 bg-white md:px-10 max-w-6xl mx-auto shadow-md shadow-gray-100">
      <Link href={"/"} className="text-lg text-center font-bold">
        TRAVIS P.A.
      </Link>
      <div className="flex gap-10 items-center text-gray-500">
        {isConnected && isPersonal && (
          <Link href={`/${address}`}>Assistant</Link>
        )}
        <LoginButton>Login</LoginButton>
      </div>
    </header>
  );
};
