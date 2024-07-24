import { describe, expect, test } from "bun:test";
import app from "./rpc";

describe("rpc app", () => {
	test("POST /posts", async () => {
		// zValidator("form")だと、testClient()で書けない...
		// 参照: <https://hono.dev/docs/guides/testing>
		const title = "hello";
		const body = "goodbye";
		const res = await app.request("/posts", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({ title, body }),
		});
		expect(res.status).toEqual(201);
		expect(await res.json()).toEqual({
			ok: true,
			message: "Created!",
			title,
			body,
		});
	});
});
