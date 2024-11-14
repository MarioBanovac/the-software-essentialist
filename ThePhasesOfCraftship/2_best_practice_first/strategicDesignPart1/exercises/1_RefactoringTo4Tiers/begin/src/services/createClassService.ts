import { Database } from "../persistence";
import { ErrorExceptionType } from "../constants";
import { ClassRequestDto } from "../dto/ClassRequestDto";

export interface IClassService {
  createClass: (dto: ClassRequestDto) => any;
  enrollStudentToClass: (dto: ClassRequestDto) => any;
}

export default function createClassService(database: Database): IClassService {
  const createClass = async (dto: ClassRequestDto) => {
    if(dto.name) {
      return await database.class.create(dto.name);
    }
  };

  const enrollStudentToClass = async (dto: ClassRequestDto) => {
    // Check if student exists
    
    let student = undefined
    if(dto.studentId) {
      student = await database.student.getById(dto.studentId); // Assuming a getById method exists in student persistence
    }

    if (!student) {
      throw new Error(ErrorExceptionType.StudentNotFound);
    }

    // Check if class exists
    let cls = undefined
    if(dto.classId) {
      cls = await database.class.getById(dto.classId);
    }

    if (!cls) {
      throw new Error(ErrorExceptionType.ClassNotFound);
    }

    // Check if student is already enrolled in the class
    let existingEnrollment = undefined
    if(dto.studentId && dto.classId) {
      existingEnrollment = await database.classEnrollment.getEnrollmentByStudentAndClass(dto.studentId, dto.classId);
    }

    if (existingEnrollment) {
      throw new Error(ErrorExceptionType.StudentAlreadyEnrolled);
    }

    let classEnrollment = undefined
    if(dto.studentId && dto.classId) {
      await database.classEnrollment.enrollStudent(dto.studentId, dto.classId);
    }
    // Enroll student in the class
    return classEnrollment
  };

  return { createClass, enrollStudentToClass };
}
