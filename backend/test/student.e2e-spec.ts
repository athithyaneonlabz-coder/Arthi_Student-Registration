// @ts-nocheck

import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("StudentController", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = testingModule.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true
      })
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("creates, lists, and deletes a student", async () => {
    const createResponse = await request(app.getHttpServer())
      .post("/students")
      .send({
        firstName: "Sara",
        lastName: "Osei",
        email: "sara.osei@school.edu",
        program: "Data Science",
        registrationNumber: "REG-2026-999",
        yearLevel: 1,
        status: "active"
      })
      .expect(201);

    expect(createResponse.body).toMatchObject({
      firstName: "Sara",
      lastName: "Osei",
      email: "sara.osei@school.edu"
    });

    const listResponse = await request(app.getHttpServer()).get("/students").expect(200);

    expect(Array.isArray(listResponse.body)).toBe(true);
    expect(listResponse.body.length).toBeGreaterThan(0);

    await request(app.getHttpServer()).delete(`/students/${createResponse.body.id}`).expect(200);
  });
});