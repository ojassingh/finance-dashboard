"use client";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
export default function Chat(chartData: any, artices:any) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="outline outline-gray-400 p-4 rounded-2xl grid gap-4 bg-black">
      <h1 className="font-medium text-lg">Chat with AI!</h1>
      <h1 className="text-sm text-gray-500">Ask any finance questions!</h1>
      <div className="overflow-y-scroll h-60 w-72">
      {messages.map((m) => (
        <div key={m.id} className="bg-gray-900 py-1 px-3 rounded-2xl my-2">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}
      </div>

      <form onSubmit={handleSubmit} className="flex h-8 gap-2 place-content-center">
          <input
            className="border border-gray-300 rounded-lg text-sm font-normal"
            value={input}
            onChange={handleInputChange}
          />
        <Button variant="outline" type="submit">Send</Button>
      </form>
    </div>
  );
}
