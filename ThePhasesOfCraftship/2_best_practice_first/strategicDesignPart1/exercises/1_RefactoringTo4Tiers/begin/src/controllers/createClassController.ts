import express, { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { isMissingKeys, parseForResponse } from "../utils";
import { ErrorExceptionType } from "../constants";
import { ErrorHandler } from "../error/errorHandler";

export default function createClassController(errorHandler: ErrorHandler) {
    
  const router = express.Router()
  
  const createAClass = async (req: Request, res: Response, next:NextFunction) => {
    try {
        if (isMissingKeys(req.body, ['name'])) {
            throw new Error(ErrorExceptionType.ValidationError)
        }
    
        const { name } = req.body;
    
        const cls = await prisma.class.create({
            data: {
                name
            }
        });
    
        res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
    } catch (error) {
       next(error)
    }
}

  const enrollStudentToAClass = async (req: Request, res: Response, next:NextFunction) => {
    try {
        if (isMissingKeys(req.body, ['studentId', 'classId'])) {
            throw new Error(ErrorExceptionType.ValidationError)
        }
    
        const { studentId, classId } = req.body;
    
        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        });
    
        if (!student) {
            throw new Error(ErrorExceptionType.StudentNotFound)
        }
    
        // check if class exists
        const cls = await prisma.class.findUnique({
            where: {
                id: classId
            }
        });

        // check if student is already enrolled in class
        const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
            where: {
                studentId,
                classId
            }
        });

        if (duplicatedClassEnrollment) {
            throw new Error(ErrorExceptionType.StudentAlreadyEnrolled)
        }
    
        if (!cls) {
            throw new Error(ErrorExceptionType.ClassNotFound)
        }
    
        const classEnrollment = await prisma.classEnrollment.create({
            data: {
                studentId,
                classId
            }
        });
    
        res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
    } catch (error) {
        next(error)
    }
 
} 

  const setupRoutes = () => {
    router.post('/classes', createAClass)
    router.post('/class-enrollment', enrollStudentToAClass)
  }
  
  setupRoutes()
  router.use(errorHandler)

  return router
  
}
