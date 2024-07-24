import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono();

const route = app.post(
	"/posts",
	zValidator("form", z.object({ title: z.string(), body: z.string() })),
	(c) => {
		const { title, body } = c.req.valid("form");
		return c.json({ ok: true, message: "Created!", title, body }, 201);
	},
);

export type AppType = typeof route;
export default app;
