import { tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { Agent, createTool } from "@convex-dev/agent";
import { components } from "./_generated/api";
import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

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
    const userId = "123"; // Replace with actual user ID logic
    // Start a new thread for the user.
    const { threadId } = await supportAgent.createThread(ctx, { userId });
    return { threadId };
  },
});

// Pick up where you left off:
export const continueThread = action({
  args: { prompt: v.string(), threadId: v.string() },
  handler: async (ctx, { prompt, threadId }): Promise<string> => {
    // await authorizeThreadAccess(ctx, threadId);
    // This includes previous message history from the thread automatically.
    const { thread } = await supportAgent.continueThread(ctx, { threadId });
    const result = await thread.generateText({ prompt });
    return result.text;
  },
});

// Query to list thread messages
export const listThreadMessages = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { threadId, paginationOpts }) => {
    // await authorizeThreadAccess(ctx, threadId);
    const paginated = await supportAgent.listMessages(ctx, { threadId, paginationOpts });
    return paginated;
  },
});

// export const listThreadMessages = query({
//   args: {
//     threadId: v.string(),
//     paginationOpts: paginationOptsValidator,
//     //... other arguments you want
//   },
//   handler: async (
//     ctx, { threadId, paginationOpts },
//   ): PaginationResult<MessageDoc> => {
//     // await authorizeThreadAccess(ctx, threadId);
//     const paginated = await agent.listMessages(ctx, {
//       threadId,
//       paginationOpts,
//     });
//     // Here you could filter out / modify the documents
//     return paginated;
//   },
// });

