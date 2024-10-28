import { isMissingKeys } from "../utils"
import { ErrorExceptionType } from "../constants"

export type CreateStudentDto = {
  name: string
}

export default function createStudentDtoFromRequest (body: unknown) {
  if(!body || typeof body !== 'object' ||  isMissingKeys(body, ['name'])) {
    throw new Error(ErrorExceptionType.ValidationError)
  }
  
  const { name } = body as {name: string}
  
  return {
    name
  }
}
