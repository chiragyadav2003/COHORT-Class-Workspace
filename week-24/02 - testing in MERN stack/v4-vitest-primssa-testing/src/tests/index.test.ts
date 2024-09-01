import { describe, expect, it, vi } from 'vitest';
import request from "supertest";
import { app } from "../index";

//* mocking our prismaClient
vi.mock("../db.ts", () => {
  return {
    prismaClient: {
      sum: {
        create: vi.fn()
      }
    }
  }
})


describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it("should return the sum of two negative", async () => {
    const res = await request(app).post("/sum").send({
      a: -4,
      b: -2
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(-6);
  });

  it("should return the sum of two zero", async () => {
    const res = await request(app).post("/sum").send({
      a: 0,
      b: 0
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(0);
  });

  it('should return 411 if no inputs are provided', async () => {
    const res = await request(app).post("/sum").send({});
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("Incorrect inputs");
  })

  it('should return 411 if inputs are invalid', async () => {
    const res = await request(app).post("/sum").send({
      a: 'apple',
      b: [1, 2, 3]
    });
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("Incorrect inputs");
  })

});

describe("GET /sum", () => {
  it('should return the sum of the 2 numbers', async () => {
    const res = await request(app)
      .get("/sum")
      .set({
        a: "1",
        b: "2"
      })
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it('it should return 411 if no inputs are provided', async () => {
    const res = await request(app)
      .get("/sum")
      .send();

    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("Incorrect inputs");
  })
})