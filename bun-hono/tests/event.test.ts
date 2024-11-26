import app from "..";

describe("Event", () => {
  test("GET /api/v1/events", async () => {
    const res = await app.request("/api/v1/events");
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchSnapshot();
  });
});
