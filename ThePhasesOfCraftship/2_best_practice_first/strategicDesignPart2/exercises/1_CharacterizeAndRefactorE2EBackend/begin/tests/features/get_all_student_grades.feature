Feature: Get all student grades
    Scenario: Successfully get all student grades
        Given that the student exists and has assignments that have been graded
        When I request to get the grades of the student
        Then I should receive a list of the student's assignments with their grades

    Scenario: Fail to get grades for a non-existent student
        Given that the student does not exist in the database
        When I request to get the grades of the student
        Then I should receive an error indicating that the student was not found
