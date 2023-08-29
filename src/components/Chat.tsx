"use client";
import { useChat } from "ai/react";
export default function Chat(chartData: any, artices:any) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="outline outline-gray-400 p-10 rounded-2xl">
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="">
        <label className="text-lg font-semibold">
          Chat with AI!
        </label>
          <input
            className="border border-gray-300 rounded text-sm font-normal"
            value={input}
            onChange={handleInputChange}
          />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
