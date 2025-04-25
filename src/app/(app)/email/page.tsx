import { ChatInput } from "@/components/chat-input";

export default function ChatPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <ChatInput />
      </div>
    </main>
  );
}
