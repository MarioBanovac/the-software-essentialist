import { Database } from "../persistence";
import { parseForResponse } from "../utils";
import { ErrorExceptionType } from "../constants";
import { AssignmentRequestDto } from "../dto/AssignmentRequestDto";

export interface IAssignmentService {
  createAssignment: (dto: AssignmentRequestDto) => Promise<any>;
  getAssignmentById: (dto: AssignmentRequestDto) => Promise<any>;
  assignToStudent: (dto: AssignmentRequestDto) => Promise<any>;
  submitAssignment: (dto: AssignmentRequestDto) => Promise<any>;
  gradeAssignment: (dto: AssignmentRequestDto) => Promise<any>;
}

export const createAssignmentService = (database: Database): IAssignmentService => {
  const createAssignment = async (dto: AssignmentRequestDto) => {
    let assignment = undefined
    if(dto.classId && dto.title) {
      assignment = await database.assignment.create(dto.classId, dto.title);
    }
    return parseForResponse(assignment);
  };

  const getAssignmentById = async (dto: AssignmentRequestDto) => {
    let assignment = undefined
    if(dto.assignmentId) {
      assignment = await database.assignment.getById(dto.assignmentId);
    }
    if (!assignment) {
      throw new Error(ErrorExceptionType.AssignmentNotFound);
    }

    return parseForResponse(assignment);
  };

  const assignToStudent = async (dto: AssignmentRequestDto) => {
    let student, assignment, studentAssignment = undefined
    if(dto.studentId) {
      student = await database.student.getById(dto.studentId); // Assuming a getById method exists in student persistence
    }
    if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound);
    }

    if(dto.assignmentId) {
      assignment = await database.assignment.getById(dto.assignmentId);
    }
    if (!assignment) {
      throw new Error(ErrorExceptionType.AssignmentNotFound);
    }

    if(dto.studentId && dto.assignmentId) {
      studentAssignment = await database.studentAssignment.assignToStudent(dto.studentId, dto.assignmentId);
    }
    return parseForResponse(studentAssignment);
  };

  const submitAssignment = async (dto: AssignmentRequestDto) => {
    let studentAssignment = undefined
    if(dto.assignmentId) {
      studentAssignment = await database.studentAssignment.submit(dto.assignmentId);
    }
    if (!studentAssignment) {
      throw new Error(ErrorExceptionType.AssignmentNotFound);
    }

    return parseForResponse(studentAssignment);
  };

  const gradeAssignment = async (dto: AssignmentRequestDto) => {
    let studentAssignment = undefined
    if(dto.id && dto.grade) {
      studentAssignment = await database.studentAssignment.grade(dto.id, dto.grade);
    }
    if (!studentAssignment) {
      throw new Error(ErrorExceptionType.AssignmentNotFound);
    }

    return parseForResponse(studentAssignment);
  };

  return {
    createAssignment,
    getAssignmentById,
    assignToStudent,
    submitAssignment,
    gradeAssignment
  };
};

export default createAssignmentService
