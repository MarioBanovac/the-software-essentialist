import { Class, ClassEnrollment } from "@prisma/client";
import { Database } from "../persistence";
import { ErrorExceptionType } from "../constants";

export interface IClassService {
  createClass: (name: string) => any;
  enrollStudentToClass: (studentId: string, classId: string) => any;
}

export default function createClassService(database: Database): IClassService {
  const createClass = async (name: string): Promise<Class> => {
    return await database.class.create(name);
  };

  const enrollStudentToClass = async (studentId: string, classId: string): Promise<ClassEnrollment> => {
    // Check if student exists
    const student = await database.student.getById(studentId); // Assuming a getById method exists in student persistence

    if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound);
    }

    // Check if class exists
    const cls = await database.class.getById(classId);

    if (!cls) {
      throw new Error(ErrorExceptionType.ClassNotFound);
    }

    // Check if student is already enrolled in the class
    const existingEnrollment = await database.classEnrollment.getEnrollmentByStudentAndClass(studentId, classId);

    if (existingEnrollment) {
      throw new Error(ErrorExceptionType.StudentAlreadyEnrolled);
    }

    // Enroll student in the class
    return await database.classEnrollment.enrollStudent(studentId, classId);
  };

  return { createClass, enrollStudentToClass };
}
