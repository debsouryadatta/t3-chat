"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ChatPage() {
  const { isAuthenticated } = useConvexAuth();
  const router = useRouter();
  const createThread = useMutation(api.agent.createThread);
  const [isLoading, setIsLoading] = useState(true);
  const isCreatingThread = useRef(false); // required to prevent 2 thread creation due to react's strict mode

  useEffect(() => {
    if (isAuthenticated && !isCreatingThread.current) {
      isCreatingThread.current = true;
      
      const handleCreateThread = async () => {
        try {
          const { threadId } = await createThread({});
          router.replace(`/chat/${threadId}`);
        } catch (error) {
          console.error("Error creating new thread:", error);
          setIsLoading(false);
        } finally {
          isCreatingThread.current = false;
        }
      };
      
      handleCreateThread();
    } else if (!isAuthenticated) {
      setIsLoading(false);
    }
  }, [isAuthenticated, createThread, router]);

  return (
    <div className="flex justify-center items-center h-full">
      {isLoading && (
        <div className="flex items-center space-x-2 text-gray-400">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
        </div>
      )}
    </div>
  );
}
