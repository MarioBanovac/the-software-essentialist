import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import assignmentBuilder from "../builders/assignmentBuilder";
import studentBuilder from "../builders/studentBuilder";
import studentAssignmentBuilder from "../builders/studentAssignmentBuilder";
import classBuilder from "../builders/classBuilder";
import { Assignment, Student, StudentAssignment } from "@prisma/client";

const feature = loadFeature(path.join(__dirname, "../features/grade_assignment.feature"));

defineFeature(feature, (test) => {
  let assignment: Assignment | undefined;
  let student: Student | undefined;
  let studentAssignment: StudentAssignment | undefined;
  let response: any;

  beforeEach(async () => {
    await resetDatabase();
    response = {};
    assignment = undefined;
    student = undefined;
    studentAssignment = undefined;
  });

  test("Successfully grade a submitted assignment", ({ given, when, then }) => {
    given("there is a submitted assignment for a student", async () => {
      // Create an assignment and a student
      assignment = await assignmentBuilder()
        .fromClassRoom(await classBuilder().withName("Math").build())
        .withTitle("Homework 1")
        .build();

      student = await studentBuilder()
        .withEmail("john@email.com")
        .withName("John")
        .build();

      // Create a valid student assignment
      studentAssignment = await studentAssignmentBuilder()
        .fromAssignment(assignment!)
        .fromStudent(student!)
        .build();
    });

    when("the teacher grades the assignment with a valid grade", async () => {
      response = await request(app).post("/student-assignments/grade").send({
        studentId: studentAssignment?.studentId,
        assignmentId: studentAssignment?.assignmentId,
        grade: "A", // Assume grade is A
      });
    });

    then("the grade should be successfully saved", () => {
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.grade).toBe("A");
    });
  });

  test("Fail to grade with an invalid grade", ({ given, when, then }) => {
    given("there is a submitted assignment for a student", async () => {
      // Create an assignment and a student
      assignment = await assignmentBuilder()
        .fromClassRoom(await classBuilder().withName("Math").build())
        .withTitle("Homework 1")
        .build();

      student = await studentBuilder()
        .withEmail("john@email.com")
        .withName("John")
        .build();

      // Create a valid student assignment
      studentAssignment = await studentAssignmentBuilder()
        .fromAssignment(assignment!)
        .fromStudent(student!)
        .build();
    });

    when("the teacher attempts to grade the assignment with an invalid grade", async () => {
      response = await request(app).post("/student-assignments/grade").send({
        studentId: studentAssignment?.studentId,
        assignmentId: studentAssignment?.assignmentId,
        grade: "E", // Invalid grade
      });
    });

    then("the system should return an error indicating the grade is invalid", () => {
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("ValidationError");
    });
  });
});
