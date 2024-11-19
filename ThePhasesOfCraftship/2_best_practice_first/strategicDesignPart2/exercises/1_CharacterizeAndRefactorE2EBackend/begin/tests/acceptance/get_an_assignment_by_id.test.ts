import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path"
import { app } from "../../src/index"
import { resetDatabase } from "../fixtures/reset"
import classBuilder from "../builders/classBuilder";
import assignmentBuilder from "../builders/assignmentBuilder"
import { Assignment, Class } from "@prisma/client";


const feature = loadFeature(path.join(__dirname, "../features/get_an_assignment_by_id.feature"))


defineFeature(feature, (test) => {
  let classRoom: Class
  let assignment: Assignment | undefined
  let response: any
  
  beforeEach(async() => {
    await resetDatabase()
  })
  
  test('Successfully get an assignment', ({ given, and, when, then }) => {
    given('there is an existing class', async () => {
        classRoom = await classBuilder().withName('Math').build()
    });

    and('there is an existing assignment for the class', async () => {
        assignment = await assignmentBuilder().fromClassRoom(classRoom).withTitle('Winter test').build()
    });

    when('I request to get information about the assignment', async () => {
        response = await request(app).get(`/assignments/${assignment?.id}`)
    });

    then('I should receive the information', () => {
        expect(response.body.data.classId).toBe(classRoom.id)
        expect(response.body.data.title).toBe('Winter test')
    });
});
})

