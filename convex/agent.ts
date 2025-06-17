import { tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { Agent, createTool, MessageDoc } from "@convex-dev/agent";
import { components } from "./_generated/api";
import { action, ActionCtx, mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator, PaginationResult } from "convex/server";

async function authorizeThreadAccess(ctx: ActionCtx | QueryCtx, threadId: string) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not Authorized");
  }
  const userId = identity.subject;
  // Fetch the thread and check if the user has access
  const thread = await ctx.runQuery(components.agent.threads.getThread, { threadId });
  if (!thread || thread.userId !== userId) {
    throw new Error("Unauthorized");
  }
  return userId;
}

// Define an agent similarly to the AI SDK
const supportAgent = new Agent(components.agent, {
  chat: openai.chat("gpt-4o-mini"),
  instructions: "You are a helpful assistant.",
  tools: {},
  textEmbedding: openai.embedding("text-embedding-3-small"),
});

// Use the agent from within a normal action:
export const createThread = mutation({
  args: {},
  handler: async (ctx): Promise<{ threadId: string }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authorized");
    }
    const userId = identity.subject;
    // Start a new thread for the user.
    const { threadId } = await supportAgent.createThread(ctx, { userId });
    return { threadId };
  },
});

// Pick up where you left off:
export const continueThread = action({
  args: { prompt: v.string(), threadId: v.string() },
  handler: async (ctx, { prompt, threadId }): Promise<string> => {
    const userId = await authorizeThreadAccess(ctx, threadId);
    const { thread } = await supportAgent.continueThread(ctx, { threadId, userId });
    const result = await thread.generateText({ prompt });
    return result.text;
  },
});

// Query to list thread messages
export const listThreadMessages = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
    //... other arguments you want
  },
  handler: async (
    ctx, { threadId, paginationOpts },
  ): Promise<PaginationResult<MessageDoc>> => {
    await authorizeThreadAccess(ctx, threadId);
    const paginated = await supportAgent.listMessages(ctx, {
      threadId,
      paginationOpts,
    });
    return paginated;
  },
});


