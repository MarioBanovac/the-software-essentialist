import { ErrorExceptionType } from "../constants";
import { isMissingKeys, isUUID } from "../utils";

export type GetStudentByIdDto = {
  id: string
}

export default function getStudentByIdDtoFromRequest (params: unknown) {
  if(!params || typeof params !== 'object' || isMissingKeys(params, ['id'])) {
    throw new Error(ErrorExceptionType.ValidationError)
  }
  
  const {id} = params as {id: string}
  
  if(!isUUID(id) || typeof id !== 'string') {
    throw new Error(ErrorExceptionType.ValidationError)
  }
  
  return {
    id
  }
}
