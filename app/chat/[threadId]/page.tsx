"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/convex/_generated/api";
import { useThreadMessages, toUIMessages } from "@convex-dev/agent/react";
import { useAction } from "convex/react";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot } from "lucide-react";
import Message from "@/components/Message";
import { useParams } from 'next/navigation'

export default function ChatThreadPage() {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { threadId } = useParams<{ threadId: string }>();

  const messages = useThreadMessages(
    api.agent.listThreadMessages,
    threadId ? { threadId } : "skip",
    { initialNumItems: 50 }
  );
  const uiMessages = toUIMessages(messages.results ?? []);
  const continueThread = useAction(api.agent.continueThread);

  const isLoading = messages.isLoading && uiMessages.length === 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [uiMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !threadId) return;

    const userMessage = input.trim();
    setInput("");

    try {
      await continueThread({
        prompt: userMessage,
        threadId: threadId,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex items-center space-x-2 text-gray-400">
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        ) : uiMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Bot size={48} className="mb-4" />
            <h2 className="text-2xl font-semibold">How can I help you today?</h2>
          </div>
        ) : (
          uiMessages.map((message) => (
            <Message key={message.key} message={message} user={user} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
            placeholder="Type your message here..."
            className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl p-4 pr-12 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 resize-none"
            rows={1}
            disabled={!threadId || messages.isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full"
            disabled={!input.trim() || !threadId || messages.isLoading}
          >
            <Send size={20} />
          </Button>
        </form>
      </div>
    </>
  );
} 