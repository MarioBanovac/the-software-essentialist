import { Request, Response, NextFunction} from "express";
import { ErrorExceptionType } from "../constants";

export type ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => Response;

export function errorHandler (error: Error, req: Request, res: Response, next: NextFunction) {
  if(error.message === ErrorExceptionType.ValidationError) {
   return res.status(400).json({ error: error.message, data: undefined, success: false });
  }
  if(error.message === ErrorExceptionType.StudentNotFound) {
    return res.status(404).json({ error: error.message, data: undefined, success: false });
  }
  if(error.message === ErrorExceptionType.StudentAlreadyEnrolled) {
    return res.status(400).json({ error: error.message, data: undefined, success: false });
  }
  if(error.message === ErrorExceptionType.ClassNotFound) {
    return res.status(404).json({ error: error.message, data: undefined, success: false });
  }
  if(error.message === ErrorExceptionType.AssignmentNotFound) {
    return res.status(404).json({ error: ErrorExceptionType.AssignmentNotFound, data: undefined, success: false });
  }
  return res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
}
