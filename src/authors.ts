import { Hono } from "hono";

const app = new Hono();

const routes = app
	.get("/", (c) => c.json("list authors"))
	.post("/", (c) => c.json("create an author", 201))
	.get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export type AppType = typeof routes;
export default app;
