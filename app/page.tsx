import { AudioRecorder } from "@/components/AudioRecorder";

export default function Home() {
  return (
    <div className="grid grid-cols-[400px_1fr]">
      <aside className="flex flex-col items-center bg-slate-800 p-10 justify-between">
        <div className="space-y-4">
          <h1>This is Alejandro&apos;s personal assistant</h1>
          <AudioRecorder />
        </div>
        <footer>Made by Ale</footer>
      </aside>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Main content here
      </main>
    </div>
  );
}
