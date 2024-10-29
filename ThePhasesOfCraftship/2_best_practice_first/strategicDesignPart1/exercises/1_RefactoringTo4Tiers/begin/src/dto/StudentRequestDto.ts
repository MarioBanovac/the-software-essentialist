import { isUUID } from "../utils"
import { ErrorExceptionType } from "../constants"

export type StudentRequestDto = {
  name?: string
  id?: string
}

export default function createStudentRequestDto (data: unknown) {
  if(!data || typeof data !== 'object') {
    throw new Error(ErrorExceptionType.ValidationError)
  }
  
  const {name, id} = data as Partial<StudentRequestDto>
  
  // check if both keys are empty
  if(name === undefined && id === undefined) {
    throw new Error(ErrorExceptionType.ValidationError)
  }
  
  // validate only if it exists
  if(name !== undefined) {
    if(typeof name !== 'string') {
      throw new Error(ErrorExceptionType.ValidationError)
    }
  }
  
  // validate only if it exists
  if(id !== undefined) {
    if(!isUUID(id) || typeof id !== 'string') {
      throw new Error(ErrorExceptionType.ValidationError)
    }
  }
  
  
  return {
    name,
    id
  }
}
