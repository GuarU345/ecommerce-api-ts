import request from "supertest";
import { app } from "../app";

describe("try to create a category", () => {
  it("request of object is valid", async () => {
    const newCategory = {
      name: "Electronics",
    };

    const response = await request(app)
      .post("/api/categories")
      .send(newCategory);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newCategory.name);
  });
});

describe("try to create a category with bad request", () => {
  it("request of object is invalid", async () => {
    const newCategory = {
      name: 123,
    };

    const response = await request(app)
      .post("/api/categories")
      .send(newCategory);
    expect(response.status).toBe(404);
  });
});

describe.only("try to get all categories", () => {
  it("should response with status 200", async () => {
    const response = await request(app).get("/api/categories");
    expect(response.status).toBe(200);
  });

  it("should have response is not empty", async () => {
    const response = await request(app).get("/api/categories");
    expect(response.body.length).toBeGreaterThan(0);
  });
});
