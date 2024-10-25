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

export interface Database {
  student: StudentPersistence
  class: ClassPersistence;
  classEnrollment: ClassEnrollmentPersistence; 
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
    }
  }
  }
