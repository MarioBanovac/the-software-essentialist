Feature: Create a student

    As an an administrator
    I want to create a student
    So I can add him to the school system
    
    Scenario: Successfully create a student
        Given I want to create a student
        When  I request to create a student
        Then the student should be created
        
