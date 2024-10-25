import { Class, ClassEnrollment } from "@prisma/client";
import { prisma } from "../database";
import { ErrorExceptionType } from "../constants";

export interface IClassService {
  createClass: (name: string) => Promise<Class>;
  enrollStudentToClass: (studentId: string, classId: string) => Promise<ClassEnrollment>;
}

export default function createClassService(): IClassService {
  const createClass = async (name: string) => {
    const cls = await prisma.class.create({
      data: {
        name
      }
    });
    return cls;
  };

  const enrollStudentToClass = async (studentId: string, classId: string) => {
    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound);
    }

    // Check if class exists
    const cls = await prisma.class.findUnique({
      where: { id: classId }
    });

    if (!cls) {
      throw new Error(ErrorExceptionType.ClassNotFound);
    }

    // Check if student is already enrolled in the class
    const existingEnrollment = await prisma.classEnrollment.findFirst({
      where: { studentId, classId }
    });

    if (existingEnrollment) {
      throw new Error(ErrorExceptionType.StudentAlreadyEnrolled);
    }

    // Enroll student in the class
    const classEnrollment = await prisma.classEnrollment.create({
      data: {
        studentId,
        classId
      }
    });

    return classEnrollment;
  };

  return { createClass, enrollStudentToClass };
}
