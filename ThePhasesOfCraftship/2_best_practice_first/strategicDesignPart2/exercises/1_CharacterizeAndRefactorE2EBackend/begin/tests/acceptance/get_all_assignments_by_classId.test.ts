import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path"
import { app } from "../../src/index"
import { resetDatabase } from "../fixtures/reset"
import classBuilder from "../builders/classBuilder";
import assignmentBuilder from "../builders/assignmentBuilder"
import { Assignment, Class } from "@prisma/client";


const feature = loadFeature(path.join(__dirname, "../features/get_all_assignments_by_classId.feature"))


defineFeature(feature, (test) => {
  let response: any
  let classRoom: Class
  let assignment: Assignment | undefined
  
  beforeEach(async() => {
    await resetDatabase()
    response = {}
  })
  
  test('Successfully get all assignments for a class', ({ given, and, when, then }) => {
    given('there is an existing class', async () => {
       classRoom = await classBuilder().withName('Math').build()
    });

    and('there is an assignment for that class', async () => {
       assignment = await assignmentBuilder().fromClassRoom(classRoom).withTitle('First test').build()
    });

    when('I request to get the class assignments', async () => {
       response = await request(app).get(`/classes/${classRoom.id}/assignments`)
    });

    then('I should successfully get the assignment details', () => {
       expect(response.body.data.length).toBe(1)
       expect(response.body.data[0].title).toBe('First test')
       expect(response.body.data[0].classId).toBe(classRoom.id)
})
  
})

test('Failed to get all assignments for a class', ({ given, when, then }) => {
  let fakeClassId: number
  
  given('I send wrong class id to the request', () => {
    fakeClassId = Math.random()
  })

  when('I request to get the class assignments', async () => {
    response = await request(app).get(`/classes/${fakeClassId}/assignments`)
  });

  then('I should get an error', () => {
   expect(response.body.error).toBe('ValidationError')
   expect(response.status).toBe(400)
  });
});
})
