import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const registerUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const { email, name, clerkId } = args;
    return await ctx.db.insert("users", {
      email,
      name,
      clerkId,
    });
  },
});
