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

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
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

    console.log(users);

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
});
