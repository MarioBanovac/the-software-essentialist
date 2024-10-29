import express, { NextFunction, Request, Response } from "express";
import { isMissingKeys, parseForResponse } from "../utils";
import { ErrorExceptionType } from "../constants";
import { ErrorHandler } from "../error/errorHandler";
import { IClassService } from "../services/createClassService";
import createClassRequestDto from "../dto/ClassRequestDto";

export default function createClassController(
  errorHandler: ErrorHandler,
  classService: IClassService
) {
  const router = express.Router();

  const createAClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = createClassRequestDto(req.body)
      const cls = await classService.createClass(dto);
      res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
    } catch (error) {
      next(error);
    }
  };

  const enrollStudentToAClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // if (isMissingKeys(req.body, ["studentId", "classId"])) {
      //   throw new Error(ErrorExceptionType.ValidationError);
      // }

      // const { studentId, classId } = req.body;
      const dto = createClassRequestDto(req.body)

      const classEnrollment = await classService.enrollStudentToClass(dto);

      res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
    } catch (error) {
      next(error);
    }
  };

  const setupRoutes = () => {
    router.post("/classes", createAClass);
    router.post("/class-enrollment", enrollStudentToAClass);
  };

  setupRoutes();
  router.use(errorHandler);

  return router;
}
