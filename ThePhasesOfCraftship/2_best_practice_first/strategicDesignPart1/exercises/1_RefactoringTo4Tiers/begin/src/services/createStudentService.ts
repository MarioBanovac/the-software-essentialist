import { Database } from "../persistence"
import { ErrorExceptionType } from "../constants"
import { StudentRequestDto } from "../dto/StudentRequestDto"

export interface IStudentService {
  createStudent: (dto: StudentRequestDto) => any
  getAllStudents: () => any
  getAStudentById: (dto: StudentRequestDto) => any
  getAllStudentSubmittedAssignments: (dto: StudentRequestDto) => any
  getAllStudentGrades: (dto: StudentRequestDto) => any
}

export default function createStudentService(database: Database): IStudentService {
  const createStudent = async(dto: StudentRequestDto) => { 
    if(dto.name) {
      const student = await database.student.create(dto.name)
      return student
    }
  }
  
  const getAllStudents = async () => {
    const students = await database.student.getAll()
    return students
  }
  
  const getAStudentById = async (dto: StudentRequestDto) => {
    let student = undefined
    if(dto.id) {
      student = await database.student.getById(dto.id)
    }

  if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound)
  }
  
  return student
  }
  
  const getAllStudentSubmittedAssignments = async (dto: StudentRequestDto) => {
     // check if student exists
     let student = undefined
     if(dto.id) {
       student = await database.student.getById(dto.id)
     }

  if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound)
  }

  let studentAssignments = undefined
  if(dto.id) {
    studentAssignments = await database.student.getAllSubmittedAssignmentsById(dto.id)
  }
  
  return studentAssignments
  }
  
  const getAllStudentGrades = async (dto: StudentRequestDto) => {
    let student = undefined
    if(dto.id) {
      student = await database.student.getById(dto.id)
    }

  if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound)
  }

  let studentGrades = undefined
  if(dto.id) {
    studentGrades = await database.student.getAllGradesById(dto.id)
  }
  
  return studentGrades
  }
  
  return {createStudent, getAllStudents, getAStudentById, getAllStudentSubmittedAssignments, getAllStudentGrades}
}
