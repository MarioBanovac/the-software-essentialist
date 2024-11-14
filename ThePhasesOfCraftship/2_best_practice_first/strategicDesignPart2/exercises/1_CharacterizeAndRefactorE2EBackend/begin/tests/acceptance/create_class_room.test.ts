import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path"
import { app } from "../../src/index"
import { resetDatabase } from "../fixtures/reset"


interface IRequestBody {
  name: string
}



const feature = loadFeature(path.join(__dirname, "../features/create_class_room.feature"))


defineFeature(feature, (test) => {
  let requestBody: IRequestBody
  let response: any
  
  beforeEach(async() => {
    await resetDatabase()
    requestBody = {} as IRequestBody
    response = {}
  })
  
  
  test('Sucessfully create a class room', ({ given, when, then }) => {
    given(/^I want to create a class room named "(.*)"$/, (name) => {
        requestBody = {
          name
        }
    });

    when('I request to create a class room', async() => {
        response = await request(app).post('/classes').send(requestBody)
    });

    then('the class room should be successfully created', () => {
       expect(response.status).toBe(201)
       expect(response.body.success).toBeTruthy()
    });
    
    test('Fail to create a class room', ({ given, when, then }) => {
      given('I want to create a class room without name', () => {

      });

      when('I request to create a class room', async() => {
        response = await request(app).post('/classes').send({})
      });

      then('the class room should not be created', () => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('ValidationError')
        expect(response.body.success).toBeFalsy()
      });
  });
})})

