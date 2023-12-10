import { z } from "zod";
import type { User } from "@prisma/client";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    image: user.image,
  };
};

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis"; // see below for cloudflare and fastly adapters

// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    // const userId = posts.flatMap(post => (post.createdById))
    // const userId = posts.map((post) => post.createdById);

    // const user = await ctx.db.user.findUnique({
    //   where: {
    //     id: userId,
    //   },
    // });
    const post_userId = posts.map((post) => post.createdById);
    const users = (
      await ctx.db.user.findMany({
        where: {
          id: {
            in: post_userId,
          },
        },
      })
    ).map(filterUserForClient);

    return posts.map((post) => {
      const user = users.find((user) => user.id === post.createdById);
      if (!user || !user.name || !user.image)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for post not found",
        });

      return {
        post,
        user: {
          ...user,
          name: user.name,
          image: user.image,
        },
      };
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        content: z.string().emoji("Only emojis are allowed").min(1).max(280),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const { success } = await ratelimit.limit(userId);

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
        });
      }

      const post = await ctx.db.post.create({
        data: {
          createdById: userId,
          content: input.content,
        },
      });

      return post;
    }),
});
