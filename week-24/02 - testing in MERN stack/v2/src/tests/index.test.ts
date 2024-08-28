import { describe, expect, it } from '@jest/globals';
import request from "supertest";
import { app } from "../index"

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

});
