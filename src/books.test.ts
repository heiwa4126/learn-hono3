import { describe, expect, test } from "bun:test";
import { testClient } from "hono/testing";
import app, { type AppType } from "./books";

const client = testClient<AppType>(app);

function getZErrMsg(o: any): any | undefined {
	return o?.error?.issues?.[0]?.message;
}

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
		const res0 = await c2.$get({ param: { id: "0" } });
		expect(await res0.json()).toEqual("get 0");

		// get index with non-numeric ID
		const res2 = await c2.$get({ param: { id: "abc" } });
		expect(res2.status).toEqual(400);
		expect(getZErrMsg(await res2.json())).toEqual(
			"Expected number, received nan",
		);

		// get index with negative number ID
		const res3 = await c2.$get({ param: { id: "-1000" } });
		expect(res3.status).toEqual(400);
		expect(getZErrMsg(await res3.json())).toEqual(
			"Number must be greater than or equal to 0",
		);
	});
});
