import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path"
import { app } from "../../src/index"
import { resetDatabase } from "../fixtures/reset"
import studentBuilder from '../builders/studentBuilder'
import { Assignment, Student } from "@prisma/client";
import assignmentBuilder from "../builders/assignmentBuilder";
import classBuilder from "../builders/classBuilder";


const feature = loadFeature(path.join(__dirname, "../features/assign_student_to_an_assignment.feature"))


defineFeature(feature, (test) => {
  let assignment: Assignment | undefined
  let student: Student
  let response: any
  
  beforeEach(async() => {
    await resetDatabase()
    response = {}
    assignment = undefined
  })

  
  test('Successfully assign student to an assignment', ({ given, and, when, then }) => {
    given('there is an existing assignment', async () => {
       assignment = await assignmentBuilder()
       .fromClassRoom(await classBuilder().withName('Math').build())
       .withTitle('Semester test')
       .build()
    });

    and('there is an existing student', async () => {
       student = await studentBuilder()
       .withEmail('john@email.com')
       .withName('John')
       .build()
    });

    when('I assign the student to the assignment', async () => {
        response = await request(app).post('/student-assignments').send({
          studentId: student.id,
          assignmentId: assignment?.id
        })
    });

    then('the student should be assigned to the assignment', () => {
        expect(response.body.data.studentId).toBe(student.id)  
        expect(response.body.data.assignmentId).toBe(assignment?.id)  
    });
})

test('Failed to assign student to an assignment', ({ given, and, when, then }) => {

  given('there is an existing assignment', async () => {
    // Create an assignment but use an invalid ID in the test
    assignment = await assignmentBuilder()
      .fromClassRoom(await classBuilder().withName('Math').build())
      .withTitle('Semester test')
      .build();

  });

  and('there is an existing student', async () => {
    student = await studentBuilder()
      .withEmail('john@email.com')
      .withName('John')
      .build();
  });

  when('I assign the student to the assignment', async () => {
    response = await request(app).post('/student-assignments').send({
      studentId: student.id,
      assignmentId: assignment?.id + '_invalid' // Use the invalid assignment ID here
    });
  });

  then('the student should not be assigned to the assignment', () => {
    expect(response.status).toBe(404); // Adjust status code as per API's error response
    expect(response.body.success).toBeFalsy();
    expect(response.body.error).toBe('AssignmentNotFound') // Ensure an error message is present
  });
});
})
