Feature: Get all students

    As an admin or a teacher
    I want to be able to get all students
    So that I can have the overview of the students
    
    Scenario: Successfully get all students
        Given there are total of three existing students
        When I request to get all students
        Then I should get all existing students
        
    Scenario: Failed get all students
        Given that the database is unavailable
        When I request to get all students
        Then I should get error
    
