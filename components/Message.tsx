"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MessageProps {
  message: {
    id?: string;
    userId?: string;
    embeddingId?: string;
    fileIds?: string[];
    error?: string;
    agentName?: string;
    model?: string;
    role?: string;
    content?: string | Array<{ type: string; text?: string }>;
    type?: string;
    tool?: boolean;
    // Add other properties that might exist from Convex Agent
    [key: string]: any;
  };
}

export function Message({ message }: MessageProps) {
  // Extract content from different possible formats
  let content = "";
  let role = message.role || message.type || "assistant";

  if (typeof message.content === "string") {
    content = message.content;
  } else if (Array.isArray(message.content)) {
    content = message.content
      .map(part => part.text || "")
      .join("");
  } else if (message.error) {
    content = `Error: ${message.error}`;
    role = "error";
  }

  const isUser = role === "user";
  const isError = role === "error";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <Card
        className={cn(
          "max-w-[80%] p-4",
          isUser
            ? "bg-primary text-primary-foreground"
            : isError
            ? "bg-destructive text-destructive-foreground"
            : "bg-muted"
        )}
      >
        <div className="whitespace-pre-wrap text-sm">
          {content || "Empty message"}
        </div>
        {message.agentName && (
          <div className="text-xs opacity-75 mt-2">
            Agent: {message.agentName}
          </div>
        )}
        {message.model && (
          <div className="text-xs opacity-75">
            Model: {message.model}
          </div>
        )}
      </Card>
    </div>
  );
}
