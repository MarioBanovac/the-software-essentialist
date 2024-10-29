import express,  { NextFunction, Request, Response } from "express";
import { parseForResponse, isUUID } from "../utils";
import { ErrorHandler } from "../error/errorHandler";
import { ErrorExceptionType } from "../constants";
import { IStudentService } from "../services/createStudentService";
import createStudentDtoFromRequest from "../dto/CreateStudentDto";
import getStudentByIdDtoFromRequest from "../dto/GetStudentByIdDto";

export default function createStudentController (errorHandler: ErrorHandler, studentService: IStudentService) {
  const router = express.Router()
  
  const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await studentService.getAllStudents()
        res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
    } catch (error) {
        next(error)
    }
  }
  
  const getAStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = getStudentByIdDtoFromRequest(req.params)
        const student = await studentService.getAStudentById(dto)
        res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
    } catch (error) {
        next(error)
    }
}

  const getAllStudentSubmittedAssignments =  async (req: Request, res: Response, next:NextFunction) => {
    try {
      const dto = getStudentByIdDtoFromRequest(req.params)

        const studentAssignments = await studentService.getAllStudentSubmittedAssignments(dto)
    
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
        next(error)
    }
}

  const getAllStudentGrades = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        if(!isUUID(id)) {
            throw new Error(ErrorExceptionType.ValidationError)
        }

        const studentGrades = await studentService.getAllStudentGrades(id)
    
        res.status(200).json({ error: undefined, data: parseForResponse(studentGrades), success: true });
    } catch (error) {
        next(error)
    }
}
 
  const createAStudent = async (req: Request, res: Response, next:NextFunction) => {
	try {    
    const dto = createStudentDtoFromRequest(req.body)

		const student = await studentService.createStudent(dto)

		res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
	} catch (error) {
		next(error)
	}
}

  const setupRoutes = () => {
    router.get('/students', getAllStudents)
    router.get('/students/:id', getAStudentById)
    router.get('/student/:id/assignments', getAllStudentSubmittedAssignments)
    router.get('/student/:id/grades', getAllStudentGrades)
    router.post('/students', createAStudent);
  }
  
  // setup the routes and add the error handler to this mini router   
  setupRoutes()
  router.use(errorHandler)
  
  return router
  
}

