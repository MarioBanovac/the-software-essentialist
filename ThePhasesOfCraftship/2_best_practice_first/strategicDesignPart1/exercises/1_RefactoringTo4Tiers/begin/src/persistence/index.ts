import { PrismaClient } from "@prisma/client";

interface StudentPersistence {
  create: (name: string) => any;
  getAll: () => any;
  getById: (id: string) => any;
  getAllSubmittedAssignmentsById: (id:string) => any;
  getAllGradesById: (id:string) => any;
}

interface ClassPersistence {
  create: (name: string) => any;
  getAll: () => any;
  getById: (id: string) => any;
}

interface ClassEnrollmentPersistence {
  enrollStudent: (studentId: string, classId: string) => any;
  getEnrollmentByStudentAndClass: (studentId: string, classId: string) => any;
}

interface AssignmentPersistence {
  create: (classId: string, title: string) => any;
  getAllForClass: (classId: string) => any;
  getById: (id: string) => any;
}

interface StudentAssignmentPersistence {
  assignToStudent: (studentId: string, assignmentId: string) => any
  submit: (assignmentId: string) => any
  grade: (id: string, grade: string) => any
}

export interface Database {
  student: StudentPersistence
  class: ClassPersistence;
  classEnrollment: ClassEnrollmentPersistence; 
  assignment: AssignmentPersistence;
  studentAssignment: StudentAssignmentPersistence;
}

export default function createDatabase(prisma: PrismaClient): Database {
  return { 
    student: {
      create: async (name:string) => {
        const student = await prisma.student.create({
          data: {
            name
          }
        });
        return student
      },
      getAll: async() => {
        const students = await prisma.student.findMany({
          include: {
              classes: true,
              assignments: true,
              reportCards: true
          }, 
          orderBy: {
              name: 'asc'
          }
      });
      
      return students
      },
      getById: async(id) => {
        const student = await prisma.student.findUnique({
          where: {
              id
          },
          include: {
              classes: true,
              assignments: true,
              reportCards: true
          }
      });
      return student
      },
      getAllSubmittedAssignmentsById: async(id) => {
        const studentAssignments = await prisma.studentAssignment.findMany({
          where: {
              studentId: id,
              status: 'submitted'
          },
          include: {
              assignment: true
          },
      });
      return studentAssignments
      },
      getAllGradesById: async(id) => {
        const studentAssignments = await prisma.studentAssignment.findMany({
          where: {
              studentId: id,
              status: 'submitted',
              grade: {
                  not: null
              }
          },
          include: {
              assignment: true
          },
      });
      return studentAssignments
      }
    },
    class: {
      create: async (name: string) => {
        return await prisma.class.create({
          data: { name }
        });
      },
      getAll: async () => {
        return await prisma.class.findMany({
          orderBy: { name: 'asc' }
        });
      },
      getById: async (id: string) => {
        return await prisma.class.findUnique({
          where: { id }
        });
      }
    },
    classEnrollment: {
      enrollStudent: async (studentId: string, classId: string) => {
        return await prisma.classEnrollment.create({
          data: { studentId, classId }
        });
      },
      getEnrollmentByStudentAndClass: async (studentId: string, classId: string) => {
        return await prisma.classEnrollment.findFirst({
          where: { studentId, classId }
        });
      }
    },
    assignment: {
      create: async (classId: string, title: string) => {
        return await prisma.assignment.create({
          data: { classId, title }
        });
      },
      getAllForClass: async (classId: string) => {
        return await prisma.assignment.findMany({
          where: { classId },
          include: { class: true, studentTasks: true }
        });
      },
      getById: async (id: string) => {
        return await prisma.assignment.findUnique({
          where: { id },
          include: { class: true, studentTasks: true }
        });
      }
    },
    studentAssignment: {
      assignToStudent: async (studentId: string, assignmentId: string) => {
        return await prisma.studentAssignment.create({
          data: { studentId, assignmentId }
        });
      },
      submit: async (assignmentId: string) => {
        return await prisma.studentAssignment.update({
          where: { id: assignmentId },
          data: { status: "submitted" }
        });
      },
      grade: async (id: string, grade: string) => {
        return await prisma.studentAssignment.update({
          where: { id },
          data: { grade }
        });
      }
    }
  }
  }
