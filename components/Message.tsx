"use client";

import { useState } from "react";
import { Bot, Check, Copy, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

type MessageProps = {
  message: {
    key: string;
    role: string;
    content: string;
  };
  user: { firstName: string | null; lastName: string | null } | null | undefined;
};

const Message = ({ message, user }: MessageProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex items-start gap-4 ${
        message.role === "user" ? "justify-end" : ""
      }`}
    >
      {message.role !== "user" && (
        <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
          <Bot size={20} className="text-primary-foreground" />
        </div>
      )}
      <div
        className={`max-w-2xl p-4 rounded-xl ${
          message.role === "user"
            ? "bg-muted"
            : "bg-card"
        }`}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-foreground">
          {message.content}
        </div>
        {message.role !== "user" && (
          <div className="mt-2 flex items-center gap-2 text-muted-foreground">
            {/* <span className="text-xs">Gemini 2.5 Flash</span> */}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleCopy}
            >
              {copied ? (
                <Check size={14} className="text-green-600 dark:text-green-500" />
              ) : (
                <Copy size={14} />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <RefreshCcw size={14} />
            </Button>
          </div>
        )}
      </div>
      {message.role === "user" && (
        <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
          <span className="font-bold text-sm text-secondary-foreground">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </span>
        </div>
      )}
    </div>
  );
};

export default Message; 