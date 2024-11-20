Feature: Get all student submitted assignments
    As a teacher
    I want to be able to get all student submitted assignments
    So I can see where the student is good or bad

    Scenario: Successfully get all student submitted assignments
        Given the student exists and has assignments marked as 'submitted'
        When I request to get the student's submitted assignments
        Then I should receive a list of the student's submitted assignments with their details

    Scenario: Fail to get student submitted assignments for a non-existent student
         Given the student does not exist in the database
         When I request to get the student's submitted assignments
         Then I should receive an error
