import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path"
import { app } from "../../src/index"
import { resetDatabase } from "../fixtures/reset"


interface IRequestBody {
  name?: string
  email?: string
}



const feature = loadFeature(path.join(__dirname, "../features/create_student.feature"))


defineFeature(feature, (test) => {
  let requestBody: IRequestBody
  let response: any
  
  beforeEach(async() => {
    await resetDatabase()
    requestBody = {} 
    response = {}
  })
  
  
  test('Successfully create a student', ({ given, when, then }) => {
    given('I want to create a student', () => {
       requestBody = {
         name: 'John',
         email: 'john@email.com'
       }
    });

    when('I request to create a student', async () => {
       response = await request(app).post('/students').send(requestBody)
    });

    then('the student should be created', () => {
      expect(response.status).toBe(201)
      expect(response.body.success).toBeTruthy()
    });
});

test('Fail to create a student', ({ given, when, then }) => {
  given('I want to create a student without a name', () => {
     requestBody = {
      name: 'John'
     }
  });

  when('I request to create a student', async () => {
    response = await request(app).post('/students').send(requestBody)
  });

  then('the student should not be created', () => {
    expect(response.status).toBe(400)
    expect(response.body.success).toBeFalsy()
    expect(response.body.error).toBe('ValidationError')
  });
});

})

