import request from "supertest";
import { app } from "../../app";

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
