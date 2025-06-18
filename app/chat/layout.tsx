"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useConvexAuth, useQuery } from "convex/react";
import { useClerk, useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import {
  LogIn,
  MessageSquare,
  Plus,
  Moon,
  Sun,
  Bot,
  Trash2,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { SignInButton } from "@clerk/nextjs";
import { toast } from "sonner";

type Thread = {
  _id: string;
  title?: string;
  _creationTime?: number;
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [deletingThreadId, setDeletingThreadId] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { signOut } = useClerk();
  const { user } = useUser();
  const { isAuthenticated, isLoading: isConvexLoading } = useConvexAuth();

  const createThread = useMutation(api.agent.createThread);
  const deleteThread = useMutation(api.agent.deleteThread);
  
  // Fetch threads using the provided query
  const threadsData = useQuery(
    api.agent.listThreadsByUser,
    user ? { userId: user.id } : "skip"
  );
  
  const threads = threadsData?.page || [];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNewChat = async () => {
    setIsLoading(true);
    try {
      const { threadId } = await createThread({});
      router.push(`/chat/${threadId}`);
    } catch (error) {
      console.error("Error creating new chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteThread = async (threadId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent thread selection when clicking delete
    setDeletingThreadId(threadId);

    if (pathname === `/chat/${threadId}`) {
      toast.error("Cannot delete the current thread");
      setDeletingThreadId(null);
      return;
    }
    
    try {
      await deleteThread({ threadId });
      toast.success("Thread deleted successfully");
    } catch (error) {
      console.error("Error deleting thread:", error);
      toast.error("Error deleting thread");
    } finally {
      setDeletingThreadId(null);
    }
  };
  
  if (!isConvexLoading && !isAuthenticated) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Welcome to T3.chat</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Please sign in to continue.</p>
            <SignInButton mode="modal">
                <Button>
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
            </SignInButton>
        </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#111111] text-white">
      {/* Sidebar */}
      <div className="w-1/4 min-w-[250px] bg-black p-4 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">T3.chat</h1>
          <div className="flex items-center space-x-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            )}
          </div>
        </div>
        <Button
          onClick={handleNewChat}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          disabled={isLoading}
        >
          <Plus className="mr-2 h-4 w-4" /> New Chat
        </Button>
        <div className="mt-6 flex-1 overflow-y-auto">
          <h2 className="text-sm font-semibold text-gray-400 mb-2">Today</h2>
          <div className="space-y-2">
            {threads.map((thread: Thread) => (
              <div key={thread._id} className="group relative">
                <Button
                  variant={pathname === `/chat/${thread._id}` ? "secondary" : "ghost"}
                  className="w-full justify-start pr-8"
                  onClick={() => router.push(`/chat/${thread._id}`)}
                  disabled={deletingThreadId === thread._id}
                >
                  <MessageSquare className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{thread.title || "New Conversation"}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                  onClick={(e) => handleDeleteThread(thread._id, e)}
                  disabled={deletingThreadId === thread._id}
                >
                  {deletingThreadId === thread._id ? (
                    <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <X size={14} />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="font-bold text-sm">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </span>
              </div>
              <span className="text-sm font-medium">{user?.fullName}</span>
            </div>
            <Button
              onClick={() => signOut(() => router.push("/"))}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#111111]">
        {children}
      </div>
    </div>
  );
} 