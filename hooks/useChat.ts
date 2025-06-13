"use client";

import { useState, useCallback } from "react";
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { useThreadMessages } from "@convex-dev/agent/react";

export function useChat() {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createThread = useMutation(api.agent.createThread);
  const continueThread = useAction(api.agent.continueThread);
  const messages = useThreadMessages(
    api.chatBasic.listThreadMessages,
    { threadId },
    { initialNumItems: 10 },
  );

  const startNewChat = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await createThread();
      setThreadId(result.threadId);
    } catch (error) {
      console.error("Failed to create thread:", error);
    } finally {
      setIsLoading(false);
    }
  }, [createThread]);

  const sendMessage = useCallback(async (prompt: string) => {
    if (!threadId) return;
    
    setIsLoading(true);
    try {
      await continueThread({ prompt, threadId });
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  }, [continueThread, threadId]);

  return {
    threadId,
    messages: messages?.page || [],
    isLoading,
    startNewChat,
    sendMessage,
  };
}
