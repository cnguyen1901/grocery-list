import { initTRPC } from "@trpc/server";
import { z } from "zod";

import { Context } from "./context";

const t = initTRPC.context<Context>().create()

// Base router and procedure helpers
const router = t.router
const publicProcedure = t.procedure

export const serverRouter = router({
  findAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.groceryList.findMany()
  }),
  insertOne: publicProcedure.input(z.object({
    title: z.string(),
  })).mutation(({ input, ctx }) => {
    return ctx.prisma.groceryList.create({
      data: { title: input.title }
    })
  })
})

export type ServerRouter = typeof serverRouter