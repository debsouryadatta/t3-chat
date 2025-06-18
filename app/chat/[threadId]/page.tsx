"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "@/convex/_generated/api";
import { useThreadMessages, toUIMessages } from "@convex-dev/agent/react";
import { useAction } from "convex/react";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, Loader2 } from "lucide-react";
import Message from "@/components/Message";
import { useParams } from 'next/navigation'

export default function ChatThreadPage() {
  const [input, setInput] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);
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
  }, [uiMessages, isAiResponding]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !threadId) return;

    const userMessage = input.trim();
    setInput("");
    setIsAiResponding(true);
    try {
      await continueThread({
        prompt: userMessage,
        threadId: threadId,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsAiResponding(false);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 size={48} className="animate-spin text-muted-foreground" />
          </div>
        ) : uiMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Bot size={48} className="mb-4" />
            <h2 className="text-2xl font-semibold text-center">
              How can I help you today?
            </h2>
          </div>
        ) : (
          uiMessages.map((message) => (
            <Message key={message.key} message={message} user={user} />
          ))
        )}
        {isAiResponding && (
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
              <Bot size={20} className="text-primary-foreground" />
            </div>
            <div className="max-w-2xl p-4 rounded-xl bg-card flex items-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 md:p-6 bg-card border-t border-border">
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
            className="w-full resize-none pr-16"
            rows={1}
            disabled={!threadId || messages.isLoading || isAiResponding}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2.5 top-1/2 -translate-y-1/2"
            disabled={!input.trim() || !threadId || messages.isLoading || isAiResponding}
          >
            <Send size={20} />
          </Button>
        </form>
      </div>
    </>
  );
} 