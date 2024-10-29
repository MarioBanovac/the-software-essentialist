import { ErrorExceptionType } from "../constants"
import { isUUID } from "../utils"

export type AssignmentRequestDto = {
 classId?: string
 title?: string
 id?: string  
 studentId?: string
 assignmentId?: string
 grade?: 'A' | 'B' | 'C' | 'D'
}

export default function createAssingmentRequestDto(data: unknown) {
  if(!data || typeof data !== 'object') {
    throw new Error(ErrorExceptionType.ValidationError)
  }
  
  const {classId , title, id, studentId, assignmentId, grade } = data as Partial<AssignmentRequestDto>
  
  if (classId === undefined && title === undefined && id === undefined && studentId === undefined && assignmentId === undefined && grade === undefined ) {
    throw new Error(ErrorExceptionType.ValidationError)
  }
  
  
  if(classId !== undefined) {
    if(typeof classId !== 'string') {
      throw new Error(ErrorExceptionType.ValidationError);
    }
  }
  
    
  if(title !== undefined) {
    if(typeof title !== 'string') {
      throw new Error(ErrorExceptionType.ValidationError);
    }
  }
  
  if(id !== undefined) {
    if(typeof id !== 'string' || !isUUID(id)) {
      throw new Error(ErrorExceptionType.ValidationError);
    }
  }
  
  if(studentId !== undefined) {
    if(typeof studentId !== 'string') {
      throw new Error(ErrorExceptionType.ValidationError);
    }
  }
  
  if(assignmentId !== undefined) {
    if(typeof assignmentId !== 'string') {
      throw new Error(ErrorExceptionType.ValidationError);
    }
  }
  
  if(grade !== undefined) {
    if (!["A", "B", "C", "D"].includes(grade)) {
      throw new Error(ErrorExceptionType.ValidationError);
    }
  }
  
  
  return {
    classId,
    title,
    id,
    studentId,
    assignmentId,
    grade
  }
  
}
