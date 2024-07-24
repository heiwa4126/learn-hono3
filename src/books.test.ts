import { describe, expect, test } from "bun:test";
import { testClient } from "hono/testing";
import app, { type AppType } from "./books";

const client = testClient<AppType>(app);

describe("books app", () => {
	test("get index", async () => {
		const res = await client.index.$get();
		expect(await res.json()).toEqual("list books");
	});
	test("post index", async () => {
		const res = await client.index.$post();
		expect(await res.status).toEqual(201);
		expect(await res.json()).toEqual("create a book");
	});
	test("get index with ID", async () => {
		const c2 = client[":id"];
		const res1 = await c2.$get({ param: { id: "123" } });
		expect(await res1.json()).toEqual("get 123");
		const res2 = await c2.$get({ param: { id: "xyz" } });
		expect(await res2.json()).toEqual("get xyz");
	});
});
