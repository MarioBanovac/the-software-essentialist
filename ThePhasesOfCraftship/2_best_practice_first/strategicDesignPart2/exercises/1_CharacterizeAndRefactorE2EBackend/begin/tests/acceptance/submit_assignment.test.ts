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

const feature = loadFeature(path.join(__dirname, "../features/submit_assignment.feature"));

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

  test('successfully submit an assignment', ({ given, when, then }) => {
    given('there is a valid student assignment', async () => {
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

    when('student submits the assignment', async () => {
      response = await request(app).post('/student-assignments/submit').send({
        assignmentId: studentAssignment?.assignmentId,
        studentId: student?.id
      });
    });

    then('the assignment should be submitted', () => {
      expect(response.status).toBe(200); // Ensure a success response
      expect(response.body.success).toBeTruthy();
      expect(response.body.data.status).toBe('submitted');
    });
  });
});
