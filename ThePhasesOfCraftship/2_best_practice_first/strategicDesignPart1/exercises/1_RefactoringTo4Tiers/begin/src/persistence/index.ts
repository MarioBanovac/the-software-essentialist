import { PrismaClient } from "@prisma/client";

interface StudentPersistence {
  create: (name: string) => any;
  getAll: () => any;
  getById: (id: string) => any;
  getAllSubmittedAssignmentsById: (id:string) => any;
  getAllGradesById: (id:string) => any;
}

export interface Database {
  student: StudentPersistence
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
    }
  }
  }
