Feature: Get a student by id

    As an admin or a teacher
    I want to be able to get a student by id
    So that I get all the information I want
    
    Scenario: Successfully get a student
        Given there is an existing student
        When I request to access the student details
        Then I should recieve the student details
