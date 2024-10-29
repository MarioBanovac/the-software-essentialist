import express, { NextFunction, Request, Response } from "express";
import { parseForResponse } from "../utils";
import { ErrorHandler } from "../error/errorHandler";
import { IAssignmentService } from "../services/createAssingmentService";
import createAssingmentRequestDto from "../dto/AssignmentRequestDto";

export default function createAssignmentController(
  errorHandler: ErrorHandler,
  assignmentService: IAssignmentService
) {
  const router = express.Router();

  const createAnAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = createAssingmentRequestDto(req.body)
      const assignment = await assignmentService.createAssignment(dto);
      res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
      next(error);
    }
  };


  const getAnAssignmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = createAssingmentRequestDto(req.params)
      const assignment = await assignmentService.getAssignmentById(dto);
      res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
      next(error);
    }
  };

  const assignToStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = createAssingmentRequestDto(req.body)
      const studentAssignment = await assignmentService.assignToStudent(dto);
      res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
    } catch (error) {
      next(error);
    }
  };

  const grade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = createAssingmentRequestDto(req.body)
      const studentAssignmentUpdated = await assignmentService.gradeAssignment(dto);
      res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
    } catch (error) {
      next(error);
    }
  };

  const submit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = createAssingmentRequestDto(req.body)
      const studentAssignmentUpdated = await assignmentService.submitAssignment(dto);
      res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
    } catch (error) {
      next(error);
    }
  };

  const setupRoutes = () => {
    router.post("/assignments", createAnAssignment);
    router.post("/student-assignments", assignToStudent);
    router.post("/student-assignments/submit", submit);
    router.post("/student-assignments/grade", grade);
    router.get("/assignments/:id", getAnAssignmentById);
  };

  setupRoutes();
  router.use(errorHandler);

  return router;
}
