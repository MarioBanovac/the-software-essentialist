import { Request, Response } from "express";
import { prisma } from "../database";
import { parseForResponse } from "../utils";
import { Errors } from "../constants";

export default function createStudentController () {
  
  const getAllStudents = async (req: Request, res: Response) => {
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
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
  
  return { getAllStudents }
  
}

