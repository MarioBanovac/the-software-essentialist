Feature: Create a class room

    As an administrator
    I want to create a class
    So that I can add students to it

    Scenario: Sucessfully create a class room
        Given I want to create a class room named "Math"
        When I request to create a class room
        Then the class room should be successfully created
    
    Scenario: Fail to create a class room
        Given I want to create a class room without name
        When I request to create a class room
        Then the class room should not be created
