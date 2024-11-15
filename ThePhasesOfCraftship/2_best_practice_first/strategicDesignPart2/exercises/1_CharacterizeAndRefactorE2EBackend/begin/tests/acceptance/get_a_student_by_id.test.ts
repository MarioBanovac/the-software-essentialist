import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path"
import { app } from "../../src/index"
import { resetDatabase } from "../fixtures/reset"
import studentBuilder from '../builders/studentBuilder'
import { Student } from "@prisma/client";


interface IRequestBody {
  name?: string
  email?: string
}



const feature = loadFeature(path.join(__dirname, "../features/get_a_student_by_id.feature"))


defineFeature(feature, (test) => {
  let requestBody: IRequestBody
  let response: any
  let student: Student
  
  beforeEach(async() => {
    await resetDatabase()
    requestBody = {} 
    response = {}
  })

  
  test('Successfully get a student', ({ given, when, then }) => {
    given('there is an existing student', async () => {
       student = await studentBuilder()
       .withName('John')
       .withEmail('john@email.com')
       .build()
    });

    when('I request to access the student details', async () => {
       response = await request(app).get(`/students/${student.id}`)
    });

    then('I should recieve the student details', () => {
       expect(response.status).toBe(200)
       expect(response.body.data.email).toBeDefined()
       expect(response.body.data.name).toBeDefined()
       expect(response.body.data.reportCards).toBeDefined()
       expect(response.body.data.classes).toBeDefined()
    });
});
})
