import request from "supertest";
import { app } from "../../app";

const categoryName = "vegetables";

describe("try to get all categories", () => {
  it("should response with status 200", async () => {
    const response = await request(app).get("/api/categories");
    expect(response.status).toBe(200);
  });

  it("should have response is not empty", async () => {
    const response = await request(app).get("/api/categories");
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("try to get a category by name", () => {
  it("should response with status 200", async () => {
    const response = await request(app).get(
      `/api/categories?name=${categoryName}`
    );
    expect(response.status).toBe(200);
  });

  it("should be name is defined", async () => {
    const response = await request(app).get(
      `/api/categories?name=${categoryName}`
    );
    expect(response.body.name).toBeDefined();
  });
});
