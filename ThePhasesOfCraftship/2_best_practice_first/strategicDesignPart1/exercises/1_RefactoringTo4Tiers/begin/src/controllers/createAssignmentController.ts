import express, { NextFunction, Request, Response } from "express";
import { isMissingKeys, parseForResponse, isUUID } from "../utils";
import { ErrorHandler } from "../error/errorHandler";
import { ErrorExceptionType } from "../constants";
import { IAssignmentService } from "../services/createAssingmentService";

export default function createAssignmentController(
  errorHandler: ErrorHandler,
  assignmentService: IAssignmentService
) {
  const router = express.Router();

  const createAnAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (isMissingKeys(req.body, ["classId", "title"])) {
        throw new Error(ErrorExceptionType.ValidationError);
      }
      const { classId, title } = req.body;

      const assignment = await assignmentService.createAssignment({ classId, title });
      res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
      next(error);
    }
  };


  const getAnAssignmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        throw new Error(ErrorExceptionType.ValidationError);
      }

      const assignment = await assignmentService.getAssignmentById(id);
      res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
    } catch (error) {
      next(error);
    }
  };

  const assignToStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (isMissingKeys(req.body, ["studentId", "assignmentId"])) {
        throw new Error(ErrorExceptionType.ValidationError);
      }
      const { studentId, assignmentId } = req.body;

      const studentAssignment = await assignmentService.assignToStudent({ studentId, assignmentId });
      res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
    } catch (error) {
      next(error);
    }
  };

  const grade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (isMissingKeys(req.body, ["id", "grade"])) {
        throw new Error(ErrorExceptionType.ValidationError);
      }
      const { id, grade } = req.body;

      if (!["A", "B", "C", "D"].includes(grade)) {
        throw new Error(ErrorExceptionType.ValidationError);
      }

      const studentAssignmentUpdated = await assignmentService.gradeAssignment({ id, grade });
      res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
    } catch (error) {
      next(error);
    }
  };

  const submit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (isMissingKeys(req.body, ["id"])) {
        throw new Error(ErrorExceptionType.ValidationError);
      }
      const { id } = req.body;

      const studentAssignmentUpdated = await assignmentService.submitAssignment(id);
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
