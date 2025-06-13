import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

// A Convex query function
export const getAllIncompleteTasks = query({
  args: {},
  handler: async (ctx, args) => {
    // Query the database to get all items that are not completed
    const incompleteTasks = await ctx.db
      .query("tasks")
      .withIndex("by_isCompleted", (q) => q.eq(("isCompleted"), false))
      .collect();
    return incompleteTasks;
  },
});

// Query function to get the completed tasks
export const getCompletedTasks = query({
  args: {},
  handler: async (ctx, args) => {
    // Query the database to get all items that are completed
    const completedTasks = await ctx.db
      .query("tasks")
      .withIndex("by_isCompleted", (q) => q.eq(("isCompleted"), true))
      .collect();
    return completedTasks;
  },
});

// A Convex mutation function
export const setTaskCompleted = mutation({
  args: { taskId: v.id("tasks"), isCompleted: v.boolean() },
  handler: async (ctx, { taskId, isCompleted }) => {
    // Update the database using TypeScript
    await ctx.db.patch(taskId, { isCompleted });
  },
});
