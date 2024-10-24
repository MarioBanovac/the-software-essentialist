import express,  { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { isMissingKeys, parseForResponse, isUUID } from "../utils";
import { ErrorHandler } from "../error/errorHandler";
import { ErrorExceptionType } from "../constants";

export default function createAssingmentController(errorhandler: ErrorHandler) {
    
  const router = express.Router()
  
  const createAnAssingment = async (req: Request, res: Response, next:NextFunction) => {
    try {
        if (isMissingKeys(req.body, ['classId', 'title'])) {
            throw new Error(ErrorExceptionType.ValidationError)
        }
    
        const { classId, title } = req.body;
    
        const assignment = await prisma.assignment.create({
            data: {
                classId,
                title
            }
        });
    
        res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
        next(error)
    }
}

  const getAllAssignmentsForAClass = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        if(!isUUID(id)) {
            throw new Error(ErrorExceptionType.ValidationError)
        }

        // check if class exists
        const cls = await prisma.class.findUnique({
            where: {
                id
            }
        });

        if (!cls) {
            throw new Error(ErrorExceptionType.ClassNotFound)
        }

        const assignments = await prisma.assignment.findMany({
            where: {
                classId: id
            },
            include: {
                class: true,
                studentTasks: true
            }
        });
    
        res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
    } catch (error) {
        next(error)
    }
}

  const getAnAssingmentById = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        if(!isUUID(id)) {
            throw new Error(ErrorExceptionType.ValidationError)
        }
        const assignment = await prisma.assignment.findUnique({
            include: {
                class: true,
                studentTasks: true
            },
            where: {
                id
            }
        });
    
        if (!assignment) {
            throw new Error(ErrorExceptionType.AssignmentNotFound)
        }
    
        res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
        next(error)
    }
}

  const assignToStudent =  async (req: Request, res: Response, next:NextFunction) => {
    try {
        if (isMissingKeys(req.body, ['studentId', 'assignmentId'])) {
            throw new Error(ErrorExceptionType.ValidationError)
        }
    
        const { studentId, assignmentId, grade } = req.body;
    
        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        });
    
        if (!student) {
            throw new Error(ErrorExceptionType.StudentNotFound)
        }
    
        // check if assignment exists
        const assignment = await prisma.assignment.findUnique({
            where: {
                id: assignmentId
            }
        });
    
        if (!assignment) {
            throw new Error(ErrorExceptionType.AssignmentNotFound)
        }
    
        const studentAssignment = await prisma.studentAssignment.create({
            data: {
                studentId,
                assignmentId,
            }
        });
    
        res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
    } catch (error) {
        next(error)
    }

}

  const grade = async (req: Request, res: Response, next:NextFunction) => {
    try {

        if (isMissingKeys(req.body, ['id', 'grade'])) {
            throw new Error(ErrorExceptionType.ValidationError)
        }
    
        const { id, grade } = req.body;
    
        // validate grade
        if (!['A', 'B', 'C', 'D'].includes(grade)) {
            throw new Error(ErrorExceptionType.ValidationError)
        }
        
        // check if student assignment exists
        const studentAssignment = await prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });
    
        if (!studentAssignment) {
            throw new Error(ErrorExceptionType.AssignmentNotFound)
        }
    
        const studentAssignmentUpdated = await prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                grade,
            }
        });
    
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
    } catch (error) {
        next(error)
    }
}

  const submit = async (req: Request, res: Response, next:NextFunction) => {
    try {
      if (isMissingKeys(req.body, ['id'])) {
        throw new Error(ErrorExceptionType.ValidationError)
      }
  
      const { id } = req.body;
      
      // check if student assignment exists
      const studentAssignment = await prisma.studentAssignment.findUnique({
        where: {
          id
        }
      });
  
      if (!studentAssignment) {
        throw new Error(ErrorExceptionType.AssignmentNotFound)
      }
  
      const studentAssignmentUpdated = await prisma.studentAssignment.update({
        where: {
          id
        },
        data: {
          status: 'submitted'
        }
      });
  
      res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
    } catch (error) {
      next(error)
    }
  }

  const setupRoutes = () => {
    router.post('/assignments', createAnAssingment);
    router.post('/student-assignments', assignToStudent);
    router.post('/student-assignments/submit', submit);
    router.post('/student-assignments/grade', grade);
    router.get('/assignments/:id', getAnAssingmentById);
    router.get('/classes/:id/assignments', getAllAssignmentsForAClass);
  }
  
  setupRoutes()
  router.use(errorhandler)
  
  return router
  
}
