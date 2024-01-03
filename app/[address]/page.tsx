import { AudioRecorder } from "@/components/AudioRecorder";
import { redirect } from "next/navigation";

export default function Page({ params }: { params: { address: string } }) {
  const address = params.address;

  if (address !== process.env.PERSONAL_ADDRESS) redirect("/");
  return (
    <>
    <div>Hello!</div>
      <AudioRecorder />
    </>
  );
}
