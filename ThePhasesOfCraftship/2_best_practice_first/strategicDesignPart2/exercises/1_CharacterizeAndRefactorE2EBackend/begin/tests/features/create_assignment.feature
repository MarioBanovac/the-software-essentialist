Feature: Create assignment

    As a teacher
    I want to be able to create an assignment
    So that I can test students
    
    Scenario: Successfully create an assignment
        Given I have an existing class
        And when I want to create an assignment for it
        When I request to create an assignment
        Then the assignment should be created
