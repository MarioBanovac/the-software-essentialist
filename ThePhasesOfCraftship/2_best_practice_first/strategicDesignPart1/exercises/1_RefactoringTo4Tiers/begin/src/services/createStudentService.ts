import { Student, StudentAssignment } from "@prisma/client"
import { prisma } from "../database"
import { ErrorExceptionType } from "../constants"

export interface IStudentService {
  createStudent: (name: string) => Promise<Student>
  getAllStudents: () => Promise<Student[]>
  getAStudentById: (id: string) => Promise<Student>
  getAllStudentSubmittedAssignments: (id: string) => Promise<StudentAssignment[]>
  getAllStudentGrades: (id: string) => Promise<StudentAssignment[]>
}

export default function createStudentService(): IStudentService {
  const createStudent = async(name: string) => {
    const student = await prisma.student.create({
			data: {
				name
			}
		});
    return student
  }
  
  const getAllStudents = async () => {
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
  }
  
  const getAStudentById = async (id: string) => {
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

  if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound)
  }
  
  return student
  }
  
  const getAllStudentSubmittedAssignments = async (id: string) => {
     // check if student exists
     const student = await prisma.student.findUnique({
      where: {
          id
      }
  });

  if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound)
  }

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
  }
  
  const getAllStudentGrades = async (id:string) => {
    const student = await prisma.student.findUnique({
      where: {
          id
      }
  });

  if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound)
  }

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
  
  return {createStudent, getAllStudents, getAStudentById, getAllStudentSubmittedAssignments, getAllStudentGrades}
}
