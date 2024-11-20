Feature: Enroll student to a class

  As an administrator
  I want to enroll student to a class
  So that the student can have access to lectures and learning material

  Scenario: Successfully enroll a student to a class
    Given there is a valid student and class
    When the administrator enrolls the student in the class
    Then the student should be enrolled successfully

  Scenario: Fail to enroll a non-existent student
    Given there is no valid student
    When the administrator attempts to enroll the student in a class
    Then the system should return an error indicating the student is not found

  Scenario: Fail to enroll a student in a non-existent class
    Given there is a valid student but no valid class
    When the administrator attempts to enroll the student in the class
    Then the system should return an error indicating the class is not found

  Scenario: Fail to enroll a student already enrolled in a class
    Given there is a student already enrolled in a class
    When the administrator attempts to enroll the student in the same class
    Then the system should return an error indicating the student is already enrolled
