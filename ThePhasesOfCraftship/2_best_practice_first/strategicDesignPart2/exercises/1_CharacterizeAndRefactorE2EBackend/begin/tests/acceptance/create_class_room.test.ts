import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path"
import { app } from "../../src/index"
import { resetDatabase } from "../fixtures/reset"


interface IRequestBody {
  name: string
}



beforeEach(async() => {
  await resetDatabase()
})


const feature = loadFeature(path.join(__dirname, "../features/create_class_room.feature"))


defineFeature(feature, (test) => {
  test('Sucessfully create a class room', ({ given, when, then }) => {
    let requestBody: IRequestBody
    let response: any
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
});
})
