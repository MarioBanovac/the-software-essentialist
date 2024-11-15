import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path"
import { app } from "../../src/index"
import { resetDatabase } from "../fixtures/reset"
import classBuilder from '../builders/classBuilder'
import { Class } from "@prisma/client";


interface IRequestBody {
  classId?: string
  title?: string
}

const feature = loadFeature(path.join(__dirname, "../features/create_assignment.feature"))


defineFeature(feature, (test) => {
    let requestBody: IRequestBody
    let response: any
    let cls: Class
    
    beforeEach(async() => {
      await resetDatabase()
      requestBody = {}
      response = {}
    })
    
    test('Successfully create an assignment', ({ given, and, when, then }) => {
      given('I have an existing class', async () => {
       cls = await classBuilder().withName('Math').build()
      });

      and('when I want to create an assignment for it', () => {
       requestBody = {
        classId: cls.id,
        title: 'Math assignment'
       }
      });

      when('I request to create an assignment', async () => {
        response = await request(app).post('/assignments').send(requestBody)
      });

      then('the assignment should be created', () => {
        expect(response.status).toBe(201)
        expect(response.body.data.classId).toBe(cls.id)
        expect(response.body.data.title).toBe(requestBody.title)
        expect(response.body.success).toBeTruthy()
      });
  });
  test('Failed to create an assignment', ({ given, and, when, then }) => {
    given('I have an existing class', async () => {
      cls = await classBuilder().withName('Math').build()
    });

    and('when I want to create an assignment without a class id for it', () => {       
      requestBody = {
        title: 'Math assignment'
       }
    });

    when('I request to create an assignment', async () => {
      response = await request(app).post('/assignments').send(requestBody)
    });

    then('the assignment should not be created', () => {
        expect(response.status).toBe(400)
        expect(response.body.success).toBeFalsy()
        expect(response.body.error).toBe('ValidationError')
    });
});
})
