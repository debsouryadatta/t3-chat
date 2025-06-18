"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";

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
        <Loader2 size={32} className="animate-spin text-muted-foreground" />
      )}
    </div>
  );
}
