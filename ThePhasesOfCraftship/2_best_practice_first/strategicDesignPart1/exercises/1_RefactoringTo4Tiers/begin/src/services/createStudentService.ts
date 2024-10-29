import { Database } from "../persistence"
import { ErrorExceptionType } from "../constants"
import { CreateStudentDto } from "../dto/CreateStudentDto"
import { GetStudentByIdDto } from "../dto/GetStudentByIdDto"

export interface IStudentService {
  createStudent: (dto: CreateStudentDto) => any
  getAllStudents: () => any
  getAStudentById: (dto: GetStudentByIdDto) => any
  getAllStudentSubmittedAssignments: (dto: GetStudentByIdDto) => any
  getAllStudentGrades: (dto: GetStudentByIdDto) => any
}

export default function createStudentService(database: Database): IStudentService {
  const createStudent = async(dto: CreateStudentDto) => { 
    const student = await database.student.create(dto.name)
    return student
  }
  
  const getAllStudents = async () => {
    const students = await database.student.getAll()
    return students
  }
  
  const getAStudentById = async (dto: GetStudentByIdDto) => {
    const student = await database.student.getById(dto.id)

  if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound)
  }
  
  return student
  }
  
  const getAllStudentSubmittedAssignments = async (dto: GetStudentByIdDto) => {
     // check if student exists
     const student = await database.student.getById(dto.id)

  if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound)
  }

  const studentAssignments = await database.student.getAllSubmittedAssignmentsById(dto.id)
  
  return studentAssignments
  }
  
  const getAllStudentGrades = async (dto: GetStudentByIdDto) => {
    const student = await database.student.getById(dto.id)

  if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound)
  }

  const studentGrades = await database.student.getAllGradesById(dto.id)
  
  return studentGrades
  }
  
  return {createStudent, getAllStudents, getAStudentById, getAllStudentSubmittedAssignments, getAllStudentGrades}
}
