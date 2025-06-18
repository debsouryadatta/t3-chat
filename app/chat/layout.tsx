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
  Menu,
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <h1 className="text-2xl font-semibold mb-4 text-foreground">
          Welcome to T3.chat
        </h1>
        <p className="text-muted-foreground mb-8">
          Please sign in to continue.
        </p>
        <SignInButton mode="modal">
          <Button>
            <LogIn className="mr-2 h-4 w-4" /> Sign In
          </Button>
        </SignInButton>
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">T3.chat</h1>
        <div className="flex items-center space-x-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-foreground" />
              ) : (
                <Moon size={20} className="text-foreground" />
              )}
            </Button>
          )}
        </div>
      </div>
      <Button
        onClick={handleNewChat}
        className="w-full"
        disabled={isLoading}
      >
        <Plus className="mr-2 h-4 w-4" /> New Chat
      </Button>
      <div className="mt-6 flex-1 overflow-y-auto">
        <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">
          Conversations
        </h2>
        <div className="space-y-1">
          {threads.map((thread: Thread) => (
            <div key={thread._id} className="group relative">
              <Button
                variant={pathname === `/chat/${thread._id}` ? "secondary" : "ghost"}
                className="w-full justify-start pr-10"
                onClick={() => router.push(`/chat/${thread._id}`)}
                disabled={deletingThreadId === thread._id}
              >
                <MessageSquare className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">
                  {thread.title || "New Conversation"}
                </span>
              </Button>
              <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-red-500"
                  onClick={(e) => handleDeleteThread(thread._id, e)}
                  disabled={deletingThreadId === thread._id}
                  aria-label="Delete thread"
                >
                  {deletingThreadId === thread._id ? (
                    <div className="w-3 h-3 border-2 border-border border-t-primary rounded-full animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <span className="font-bold text-sm text-muted-foreground">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {user?.fullName}
            </span>
          </div>
          <Button
            onClick={() => signOut(() => router.push("/"))}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col md:w-72 bg-card border-r border-border p-4">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div className="relative flex flex-col w-72 bg-card border-r border-border h-full p-4">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background">
        <div className="md:hidden flex items-center justify-between p-2 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </Button>
          <h1 className="text-lg font-semibold truncate">
            {threads.find((t: Thread) => pathname === `/chat/${t._id}`)?.title || "T3.chat"}
          </h1>
          <div className="w-10"></div>
        </div>
        {children}
      </div>
    </div>
  );
} 