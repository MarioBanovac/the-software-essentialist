Feature: Grade assignment

  As a teacher
  I want to be able to grade the submitted assignment
  So that the student can get the feedback

  Scenario: Successfully grade a submitted assignment
    Given there is a submitted assignment for a student
    When the teacher grades the assignment with a valid grade
    Then the grade should be successfully saved
    
    
  Scenario: Fail to grade with an invalid grade
    Given there is a submitted assignment for a student
    When the teacher attempts to grade the assignment with an invalid grade
    Then the system should return an error indicating the grade is invalid
