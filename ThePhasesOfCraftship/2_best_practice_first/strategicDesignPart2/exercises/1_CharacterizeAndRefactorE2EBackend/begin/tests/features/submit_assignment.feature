Feature: Submit assignment

    As a student
    I want to be able to submit the assignment
    So that I can recieve the grade on the assignment from the teacher
    
    Scenario: successfully submit an assignment
        Given there is a valid student assignment
        When student submits the assignment
        Then the assignment should be submitted
