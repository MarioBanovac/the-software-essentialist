Feature: Get all assignments by class id

    As an admin or a teacher
    I want to be able to get all assignments by id
    So that I get all the information I want
    
    Scenario: Successfully get all assignments for a class
        Given there is an existing class
        And there is an assignment for that class
        When I request to get the class assignments
        Then I should successfully get the assignment details
        
    Scenario: Failed to get all assignments for a class
        Given I send wrong class id to the request
        When I request to get the class assignments
        Then I should get an error
