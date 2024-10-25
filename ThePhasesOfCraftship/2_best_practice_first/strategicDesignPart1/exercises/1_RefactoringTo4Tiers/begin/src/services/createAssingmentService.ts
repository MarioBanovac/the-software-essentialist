import { Database } from "../persistence";
import { parseForResponse } from "../utils";
import { ErrorExceptionType } from "../constants";

export interface IAssignmentService {
  createAssignment: (data: { classId: string; title: string }) => Promise<any>;
  getAllAssignmentsForClass: (classId: string) => Promise<any>;
  getAssignmentById: (assignmentId: string) => Promise<any>;
  assignToStudent: (data: { studentId: string; assignmentId: string }) => Promise<any>;
  submitAssignment: (assignmentId: string) => Promise<any>;
  gradeAssignment: (data: { id: string; grade: string }) => Promise<any>;
}

export const createAssignmentService = (database: Database): IAssignmentService => {
  const createAssignment = async ({ classId, title }: { classId: string; title: string }) => {
    const assignment = await database.assignment.create(classId, title);
    return parseForResponse(assignment);
  };

  const getAllAssignmentsForClass = async (classId: string) => {
    const cls = await database.class.getById(classId); // Assuming you have this method
    if (!cls) {
      throw new Error(ErrorExceptionType.ClassNotFound);
    }

    const assignments = await database.assignment.getAllForClass(classId);
    return parseForResponse(assignments);
  };

  const getAssignmentById = async (assignmentId: string) => {
    const assignment = await database.assignment.getById(assignmentId);
    if (!assignment) {
      throw new Error(ErrorExceptionType.AssignmentNotFound);
    }

    return parseForResponse(assignment);
  };

  const assignToStudent = async ({ studentId, assignmentId }: { studentId: string; assignmentId: string }) => {
    const student = await database.student.getById(studentId); // Assuming a getById method exists in student persistence
    if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound);
    }

    const assignment = await database.assignment.getById(assignmentId);
    if (!assignment) {
      throw new Error(ErrorExceptionType.AssignmentNotFound);
    }

    const studentAssignment = await database.studentAssignment.assignToStudent(studentId, assignmentId);
    return parseForResponse(studentAssignment);
  };

  const submitAssignment = async (assignmentId: string) => {
    const studentAssignment = await database.studentAssignment.submit(assignmentId);
    if (!studentAssignment) {
      throw new Error(ErrorExceptionType.AssignmentNotFound);
    }

    return parseForResponse(studentAssignment);
  };

  const gradeAssignment = async ({ id, grade }: { id: string; grade: string }) => {
    const studentAssignment = await database.studentAssignment.grade(id, grade);
    if (!studentAssignment) {
      throw new Error(ErrorExceptionType.AssignmentNotFound);
    }

    return parseForResponse(studentAssignment);
  };

  return {
    createAssignment,
    getAllAssignmentsForClass,
    getAssignmentById,
    assignToStudent,
    submitAssignment,
    gradeAssignment
  };
};

export default createAssignmentService
