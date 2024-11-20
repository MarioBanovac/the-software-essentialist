Feature: Assign student to assignment

    As a teacher
    I want to be able to assign student to an assignment
    So that the student can achieve his learning objectives
    
    Scenario: Successfully assign student to an assignment
        Given there is an existing assignment
        And there is an existing student
        When I assign the student to the assignment
        Then the student should be assigned to the assignment
        
    Scenario: Failed to assign student to an assignment
        Given there is an existing assignment
        And there is an existing student
        When I assign the student to the assignment
        Then the student should not be assigned to the assignment
