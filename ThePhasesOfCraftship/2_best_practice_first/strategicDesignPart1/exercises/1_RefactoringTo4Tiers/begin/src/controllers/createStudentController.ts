import express,  { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { parseForResponse, isUUID, isMissingKeys } from "../utils";
import { ErrorHandler } from "../error/errorHandler";
import { ErrorExceptionType } from "../constants";

export default function createStudentController (errorHandler: ErrorHandler) {
  const router = express.Router()
  
  const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await prisma.student.findMany({
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }, 
            orderBy: {
                name: 'asc'
            }
        });
        res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
    } catch (error) {
        next(error)
    }
  }
  
  const getAStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if(!isUUID(id)) {
            throw new Error(ErrorExceptionType.ValidationError)
        }
        const student = await prisma.student.findUnique({
            where: {
                id
            },
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }
        });
    
        if (!student) {
            throw new Error(ErrorExceptionType.StudentNotFound)
        }
    
        res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
    } catch (error) {
        next(error)
    }
}

  const getAllStudentSubmittedAssignments =  async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        if(!isUUID(id)) {
            throw new Error(ErrorExceptionType.ValidationError)
        }

        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id
            }
        });

        if (!student) {
            throw new Error(ErrorExceptionType.StudentNotFound)
        }

        const studentAssignments = await prisma.studentAssignment.findMany({
            where: {
                studentId: id,
                status: 'submitted'
            },
            include: {
                assignment: true
            },
        });
    
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

        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id
            }
        });

        if (!student) {
            throw new Error(ErrorExceptionType.StudentNotFound)
        }

        const studentAssignments = await prisma.studentAssignment.findMany({
            where: {
                studentId: id,
                status: 'submitted',
                grade: {
                    not: null
                }
            },
            include: {
                assignment: true
            },
        });
    
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
        next(error)
    }
}
 
  const createAStudent = async (req: Request, res: Response, next:NextFunction) => {
	try {
		if (isMissingKeys(req.body, ['name'])) {
			throw new Error(ErrorExceptionType.ValidationError)
		}

		const { name } = req.body;

		const student = await prisma.student.create({
			data: {
				name
			}
		});

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

