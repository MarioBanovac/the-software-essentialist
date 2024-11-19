import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import assignmentBuilder from "../builders/assignmentBuilder";
import studentBuilder from "../builders/studentBuilder";
import studentAssignmentBuilder from "../builders/studentAssignmentBuilder";
import assignmentSubmissionBuilder from "../builders/assignmentSubmissionBuilder";
import { Assignment, Class, Student, StudentAssignment } from "@prisma/client";
import classBuilder from "../builders/classBuilder";

const feature = loadFeature(path.join(__dirname, "../features/get_all_student_grades.feature"));

defineFeature(feature, (test) => {
  let cls: Class | undefined
  let student: Student | undefined;
  let assignment: Assignment | undefined;
  let studentAssignment: StudentAssignment | undefined
  let response: any;

  beforeEach(async () => {
    await resetDatabase();
    response = {};
    student = undefined;
    assignment = undefined;
    studentAssignment = undefined
    cls = undefined
  });

  test("Successfully get all student grades", ({ given, when, then }) => {
    given("that the student exists and has assignments that have been graded", async () => {
      // Create a student
      student = await studentBuilder()
        .withEmail("jane.doe@example.com")
        .withName("Jane Doe")
        .build();
      // Create a class  
      cls = await classBuilder()
        .withName('Math')
        .build()

      // create an assignment  
      assignment = await assignmentBuilder()
        .fromClassRoom(cls)
        .withTitle("Math Homework")
        .build();
      // assing the student the assignment
        studentAssignment = await studentAssignmentBuilder()
          .fromAssignment(assignment!)
          .fromStudent(student!)
          .build()
          
      // submit the assignment & grade it immediately
      await assignmentSubmissionBuilder().fromAssignment(studentAssignment).build()

    });

    when("I request to get the grades of the student", async () => {
      response = await request(app).get(`/student/${student!.id}/grades`);
    });

    then("I should receive a list of the student's assignments with their grades", () => {
      expect(response.status).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].status).toBe('submitted')
    });
  });

  test("Fail to get grades for a non-existent student", ({ given, when, then }) => {
    given("that the student does not exist in the database", async () => {
      student = undefined; // Student doesn't exist
    });

    when("I request to get the grades of the student", async () => {
      response = await request(app).get(`/student/non-existent-id/grades`);
    });

    then("I should receive an error indicating that the student was not found", () => {
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("ValidationError");
    });
  });
});
