import { Assignment, Student, StudentAssignment } from '@prisma/client'
import { prisma } from '../../src/database'

interface IStudentAssignmentBuilder {
  fromAssignment: (assignment: Assignment) => IStudentAssignmentBuilder
  fromStudent: (student: Student) => IStudentAssignmentBuilder 
  build: () => Promise<StudentAssignment | undefined>
}

export default function studentAssignmentBuilder(): IStudentAssignmentBuilder {
  const state : {
    assignment: undefined | Assignment
    student: undefined | Student
  } = {
    assignment: undefined,
    student: undefined
  }
  
  const fromAssignment = (assignment: Assignment) => {
    state.assignment = assignment
    return builder
  }
  
  const fromStudent = (student: Student) => {
    state.student = student
    return builder
  }
  
  const build = async () => {
    if(state.student?.id && state.assignment?.id) {
      return await prisma.studentAssignment.create({
        data: {
            studentId: state.student?.id,
            assignmentId: state.assignment?.id,
        }
    });
    }
  return undefined
  }
  
  const builder = {
    fromAssignment,
    fromStudent,
    build
  }
  
  return builder

}
