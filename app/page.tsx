import { Chat } from "@/components/Chat";
import { LoginButton } from "@/components/LoginButton";

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="flex flex-col items-center gap-4 mx-auto max-w-2xl mt-32">
        <h1 className="w-full text-center text-4xl font-extrabold text-green-500">
          This is TRAVIS,{" "}
          <span className="text-2xl font-medium text-gray-600">
            a personal assistant build by Alejandro for Alejandro, but you could
            probably use it too!
          </span>
        </h1>
        <LoginButton>Login with your wallet</LoginButton>
      </section>

      <section className="space-y-10 px-10">
        <h2 className="text-2xl font-medium">About Ale and his personal assistant</h2>
        <Chat />
      </section>
    </div>
  );
}
