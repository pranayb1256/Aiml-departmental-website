import request from "supertest";
import { app } from "../index.js";

describe("Health API", () => {
  it("should return a 200 OK status on GET /api/health", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body).toHaveProperty("timestamp");
  });
});
