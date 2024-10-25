import { Database } from "../persistence"
import { ErrorExceptionType } from "../constants"

export interface IStudentService {
  createStudent: (name: string) => any
  getAllStudents: () => any
  getAStudentById: (id: string) => any
  getAllStudentSubmittedAssignments: (id: string) => any
  getAllStudentGrades: (id: string) => any
}

export default function createStudentService(database: Database): IStudentService {
  const createStudent = async(name: string) => {
    const student = await database.student.create(name)
    return student
  }
  
  const getAllStudents = async () => {
    const students = await database.student.getAll()
    return students
  }
  
  const getAStudentById = async (id: string) => {
    const student = await database.student.getById(id)

  if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound)
  }
  
  return student
  }
  
  const getAllStudentSubmittedAssignments = async (id: string) => {
     // check if student exists
     const student = await database.student.getById(id)

  if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound)
  }

  const studentAssignments = await database.student.getAllSubmittedAssignmentsById(id)
  
  return studentAssignments
  }
  
  const getAllStudentGrades = async (id:string) => {
    const student = await database.student.getById(id)

  if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound)
  }

  const studentGrades = await database.student.getAllGradesById(id)
  
  return studentGrades
  }
  
  return {createStudent, getAllStudents, getAStudentById, getAllStudentSubmittedAssignments, getAllStudentGrades}
}
