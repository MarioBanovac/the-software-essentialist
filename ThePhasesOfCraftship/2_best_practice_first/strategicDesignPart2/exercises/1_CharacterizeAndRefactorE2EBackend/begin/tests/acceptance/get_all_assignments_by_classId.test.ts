import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path"
import { app } from "../../src/index"
import { resetDatabase } from "../fixtures/reset"
import classBuilder from "../builders/classBuilder";
import assignmentBuilder from "../builders/assignmentBuilder"
import { Assignment, Class } from "@prisma/client";


// interface IRequestBody {
//   name?: string
//   email?: string
// }



const feature = loadFeature(path.join(__dirname, "../features/get_all_assignments_by_classId.feature"))


defineFeature(feature, (test) => {
  let requestBody: any
  let response: any
  let classRoom: Class
  let assignment: Assignment | undefined
  
  beforeEach(async() => {
    await resetDatabase()
    requestBody = {}
    response = {}
  })
  
  test('Successfully get all assignments for a class', ({ given, and, when, then }) => {
    given('there is an existing class', async () => {
       classRoom = await classBuilder().withName('Math').build()
    });

    and('there is an assignment for that class', async () => {
       assignment = await assignmentBuilder().fromClassRoom(classRoom).withTitle('First test').build()
    });

    when('I request to get the class assignment', async () => {
       response = await request(app).get(`/classes/${classRoom.id}/assignments`)
    });

    then('I should successfully get the assignment details', () => {
       expect(response.body.data.length).toBe(1)
       expect(response.body.data[0].title).toBe('First test')
       expect(response.body.data[0].classId).toBe(classRoom.id)
})
  
})})
