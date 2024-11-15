import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import { app } from "../../src/index";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import studentBuilder from "../builders/studentBuilder";
import { prisma } from "../../src/database";

const feature = loadFeature(
  path.join(__dirname, "../features/get_all_students.feature")
);

defineFeature(feature, (test) => {
  let response: any
  beforeEach(async () => {
    await resetDatabase()
    response = {}
  })
  
  test('Successfully get all students', ({ given, when, then }) => {
    given('there are total of three existing students', async () => {
        const randomStudents = [{
          email: 'gmail@gmail.com',
          name: 'John'
        },
        {
          email: 'yahoo@yahoo.com',
          name: 'Jane'
        },
        {
          email: 'proton@protonmail.com',
          name: 'Joe'
        }]
        for (const {name, email} of randomStudents) {
          await studentBuilder().withName(name).withEmail(email).build()
        }   
    });

    when('I request to get all students', async () => {
       response = await request(app).get('/students')
    });

    then('I should get all existing students', () => {
       expect(response.body.data.length).toBe(3)
       expect(response.body.success).toBeTruthy()
    });
});

test('Failed get all students', ({ given, when, then }) => {
  given('that the database is unavailable', () => {
    jest.spyOn(prisma.student, 'findMany').mockRejectedValue(new Error(''))
  });

  when('I request to get all students', async () => {
    response = await request(app).get('/students')
  });

  then('I should get error', () => {
    expect(response.status).toBe(500)
    expect(response.body.error).toBe('ServerError')
    expect(response.body.success).toBeFalsy()
  });
});
})
