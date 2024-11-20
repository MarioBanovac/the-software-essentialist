import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import classBuilder from "../builders/classBuilder";
import studentBuilder from "../builders/studentBuilder";
import { Student, Class } from "@prisma/client";

const feature = loadFeature(path.join(__dirname, "../features/enroll_student_to_a_class.feature"));

defineFeature(feature, (test) => {
  let student: Student | undefined;
  let cls: Class | undefined;
  let response: any;

  beforeEach(async () => {
    await resetDatabase();
    response = {};
    student = undefined;
    cls = undefined;
  });

  test("Successfully enroll a student to a class", ({ given, when, then }) => {
    given("there is a valid student and class", async () => {
      student = await studentBuilder().withName("Jane Doe").withEmail("jane@example.com").build();
      cls = await classBuilder().withName("Math 101").build();
    });

    when("the administrator enrolls the student in the class", async () => {
      response = await request(app).post("/class-enrollments").send({
        studentId: student?.id,
        classId: cls?.id,
      });
    });

    then("the student should be enrolled successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data.studentId).toBe(student?.id);
      expect(response.body.data.classId).toBe(cls?.id);
    });
  });

  test("Fail to enroll a non-existent student", ({ given, when, then }) => {
    given("there is no valid student", () => {
      // No student is created
    });

    when("the administrator attempts to enroll the student in a class", async () => {
      cls = await classBuilder().withName("Math 101").build();
      response = await request(app).post("/class-enrollments").send({
        studentId: "non-existent-student-id",
        classId: cls?.id,
      });
    });

    then("the system should return an error indicating the student is not found", () => {
      expect(response.status).toBe(404);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("StudentNotFound");
    });
  });

  test("Fail to enroll a student in a non-existent class", ({ given, when, then }) => {
    given("there is a valid student but no valid class", async () => {
      student = await studentBuilder().withName("Jane Doe").withEmail("jane@example.com").build();
    });

    when("the administrator attempts to enroll the student in the class", async () => {
      response = await request(app).post("/class-enrollments").send({
        studentId: student?.id,
        classId: "non-existent-class-id",
      });
    });

    then("the system should return an error indicating the class is not found", () => {
      expect(response.status).toBe(404);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("ClassNotFound");
    });
  });

  test("Fail to enroll a student already enrolled in a class", ({ given, when, then }) => {
    given("there is a student already enrolled in a class", async () => {
      student = await studentBuilder().withName("Jane Doe").withEmail("jane@example.com").build();
      cls = await classBuilder().withName("Math 101").build();

      // Enroll the student initially
      await request(app).post("/class-enrollments").send({
        studentId: student.id,
        classId: cls.id,
      });
    });

    when("the administrator attempts to enroll the student in the same class", async () => {
      response = await request(app).post("/class-enrollments").send({
        studentId: student?.id,
        classId: cls?.id,
      });
    });

    then("the system should return an error indicating the student is already enrolled", () => {
      expect(response.status).toBe(400);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("StudentAlreadyEnrolled");
    });
  });
});
