import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import assignmentBuilder from "../builders/assignmentBuilder";
import studentBuilder from "../builders/studentBuilder";
import studentAssignmentBuilder from "../builders/studentAssignmentBuilder";
import { Assignment, Class, Student, StudentAssignment } from "@prisma/client";
import assignmentSubmissionBuilder from "../builders/assignmentSubmissionBuilder";
import classBuilder from "../builders/classBuilder";

const feature = loadFeature(path.join(__dirname, "../features/get_all_student_submitted_assignments.feature"));

defineFeature(feature, (test) => {
  let student: Student | undefined;
  let cls: Class | undefined;
  let assignment: Assignment | undefined;
  let studentAssignment: StudentAssignment | undefined;
  let response: any;

  beforeEach(async () => {
    await resetDatabase();
    response = {};
    student = undefined;
    assignment = undefined;
    studentAssignment = undefined;
    cls = undefined;
  });

  test("Successfully get all student submitted assignments", ({ given, when, then }) => {
    given("the student exists and has assignments marked as 'submitted'", async () => {
      // Create a student
      student = await studentBuilder()
        .withEmail("jane.doe@example.com")
        .withName("Jane Doe")
        .build();
        
      // Create the class
      cls = await classBuilder()
      .withName("Math")
      .build()
      
      // Create an assignment
      assignment = await assignmentBuilder()
        .withTitle("Math Homework")
        .fromClassRoom(cls)
        .build();

      // Assign the student to the assignment
      studentAssignment = await studentAssignmentBuilder()
        .fromAssignment(assignment!)
        .fromStudent(student!)
        .build();
        
      // submit the assignment and grade
      await assignmentSubmissionBuilder()
      .fromAssignment(studentAssignment)
      .build()
    });

    when("I request to get the student's submitted assignments", async () => {
      response = await request(app).get(`/student/${student!.id}/assignments`);
    });

    then("I should receive a list of the student's submitted assignments with their details", () => {
      expect(response.status).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].status).toBe('submitted');
      expect(response.body.data[0].assignment.title).toBe(assignment!.title);
    });
  });

  test("Fail to get student submitted assignments for a non-existent student", ({ given, when, then }) => {
    given("the student does not exist in the database", async () => {
      student = undefined; // No student is created, simulating a non-existent student
    });

    when("I request to get the student's submitted assignments", async () => {
      response = await request(app).get(`/student/non-existent-id/assignments`);
    });

    then("I should receive an error", () => {
      expect(response.status).toBe(400);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("ValidationError");
    });
  });
});
