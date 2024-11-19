Feature: Get an assignment by id

    As an admin or a teacher
    I want to be able to get an assignment by id
    So that I get all the information I want
    
    Scenario: Successfully get an assignment
        Given there is an existing class
        And there is an existing assignment for the class
        When I request to get information about the assignment
        Then I should receive the information
        
    Scenario: Fail to get an assignment
        Given there is an existing class
        And there is non-existing assignment for the class
        When I request to get information about the assignment
        Then I should not receive the information
        
