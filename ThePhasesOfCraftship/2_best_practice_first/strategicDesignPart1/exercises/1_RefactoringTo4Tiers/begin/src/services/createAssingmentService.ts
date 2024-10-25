import { prisma } from "../database";
import { parseForResponse } from "../utils";
import { ErrorExceptionType } from "../constants";

export interface IAssignmentService {
  createAssignment: (data: { classId: string; title: string }) => Promise<any>;
  getAllAssignmentsForClass: (classId: string) => Promise<any>;
  getAssignmentsByClassId: (classId: string) => Promise<any>;
  getAssignmentById: (assignmentId: string) => Promise<any>;
  assignToStudent: (data: { studentId: string; assignmentId: string }) => Promise<any>;
  submitAssignment: (assignmentId: string) => Promise<any>;
  gradeAssignment: (data: { id: string; grade: string }) => Promise<any>;
}

export const createAssignmentService = (): IAssignmentService => {
  const createAssignment = async ({ classId, title }: { classId: string; title: string }) => {
    const assignment = await prisma.assignment.create({ data: { classId, title } });
    return parseForResponse(assignment);
  };

  const getAllAssignmentsForClass = async (classId: string) => {
    const cls = await prisma.class.findUnique({ where: { id: classId } });
    if (!cls) {
      throw new Error(ErrorExceptionType.ClassNotFound);
    }

    const assignments = await prisma.assignment.findMany({
      where: { classId },
      include: { class: true, studentTasks: true }
    });
    return parseForResponse(assignments);
  };

  const getAssignmentsByClassId = async (classId: string) => {
    const cls = await prisma.class.findUnique({ where: { id: classId } });
    if (!cls) {
      throw new Error(ErrorExceptionType.ClassNotFound);
    }

    const assignments = await prisma.assignment.findMany({
      where: { classId },
      include: { class: true, studentTasks: true }
    });
    return parseForResponse(assignments);
  };

  const getAssignmentById = async (assignmentId: string) => {
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: { class: true, studentTasks: true }
    });
    if (!assignment) {
      throw new Error(ErrorExceptionType.AssignmentNotFound);
    }

    return parseForResponse(assignment);
  };

  const assignToStudent = async ({ studentId, assignmentId }: { studentId: string; assignmentId: string }) => {
    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound);
    }

    const assignment = await prisma.assignment.findUnique({ where: { id: assignmentId } });
    if (!assignment) {
      throw new Error(ErrorExceptionType.AssignmentNotFound);
    }

    const studentAssignment = await prisma.studentAssignment.create({ data: { studentId, assignmentId } });
    return parseForResponse(studentAssignment);
  };

  const submitAssignment = async (assignmentId: string) => {
    const studentAssignment = await prisma.studentAssignment.findUnique({ where: { id: assignmentId } });
    if (!studentAssignment) {
      throw new Error(ErrorExceptionType.AssignmentNotFound);
    }

    const updatedAssignment = await prisma.studentAssignment.update({
      where: { id: assignmentId },
      data: { status: "submitted" }
    });
    return parseForResponse(updatedAssignment);
  };

  const gradeAssignment = async ({ id, grade }: { id: string; grade: string }) => {
    const studentAssignment = await prisma.studentAssignment.findUnique({ where: { id } });
    if (!studentAssignment) {
      throw new Error(ErrorExceptionType.AssignmentNotFound);
    }

    const updatedAssignment = await prisma.studentAssignment.update({
      where: { id },
      data: { grade }
    });
    return parseForResponse(updatedAssignment);
  };

  return {
    createAssignment,
    getAllAssignmentsForClass,
    getAssignmentsByClassId,
    getAssignmentById,
    assignToStudent,
    submitAssignment,
    gradeAssignment
  };
};

export default createAssignmentService
