// books.ts
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

// const idSchema = z.object({id: z.number().int().positive()});  // it dosn't work
// const idSchema = z.object({id: z.string()});
// const idSchema = z.object({id: z.string().regex(/^\d+$/, 'ID must be a number')});
const idSchema = z.object({ id: z.coerce.number().int().nonnegative() });

const app = new Hono();
const routes = app
	.get("/:id", zValidator("param", idSchema), (c) =>
		c.json(`get ${c.req.param("id")}`),
	)
	.get("/", (c) => c.json("list books"))
	.post("/", (c) => c.json("create a book", 201));

export type AppType = typeof routes;
export default app;
