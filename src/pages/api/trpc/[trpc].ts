import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "@/utils/prisma";

export const appRouter = trpc
  .router()
  .mutation("addUrl", {
    input: z.object({
      name: z.string(),
      url: z.string(),
    }),
    async resolve({ input: { name, url } }) {
      return await prisma.short.create({
        data: {
          url,
          name,
        },
      });
    },
  })
  .query("urls", {
    async resolve() {
      return await prisma.short.findMany();
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
