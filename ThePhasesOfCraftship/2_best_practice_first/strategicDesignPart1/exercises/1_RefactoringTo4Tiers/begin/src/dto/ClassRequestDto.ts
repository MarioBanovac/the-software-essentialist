import { ErrorExceptionType } from "../constants"

export type ClassRequestDto = {
 name?: string
 classId?: string
 studentId?: string  
}

export default function createClassRequestDto(data: unknown) {
  if(!data || typeof data !== 'object') {
    throw new Error(ErrorExceptionType.ValidationError)
  }
  
  const {name , classId, studentId} = data as Partial<ClassRequestDto>
  
  if (name === undefined && classId === undefined && studentId === undefined) {
    throw new Error(ErrorExceptionType.ValidationError)
  }
  
  
  if(name !== undefined) {
    if(typeof name !== 'string') {
      throw new Error(ErrorExceptionType.ValidationError);
    }
  }
  
  if(classId !== undefined || studentId !== undefined) {
    if(typeof classId !== 'string' || typeof studentId !== undefined) {
      throw new Error(ErrorExceptionType.ValidationError)
    }
  }
  
  return {
    name,
    classId,
    studentId
  }
  
}
