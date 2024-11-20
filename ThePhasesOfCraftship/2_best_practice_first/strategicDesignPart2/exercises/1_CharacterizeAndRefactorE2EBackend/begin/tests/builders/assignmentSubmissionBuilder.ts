import { StudentAssignment } from '@prisma/client';
import { prisma } from '../../src/database';

interface IAssignmentSubmissionBuilder {
  fromAssignment: (assignment: StudentAssignment | undefined) => IAssignmentSubmissionBuilder;
  build: () => Promise<StudentAssignment | undefined>;
}

export default function assignmentSubmissionBuilder(): IAssignmentSubmissionBuilder {
  const state: {
    assignment: undefined | StudentAssignment;
  } = {
    assignment: undefined,
  };

  const fromAssignment = (assignment: StudentAssignment | undefined) => {
    state.assignment = assignment;
    return builder;
  };
  

  const build = async () => {
    if (state.assignment?.studentId && state.assignment.assignmentId) {
      await prisma.studentAssignment.update({
        where: {
            studentId_assignmentId: {
                assignmentId: state.assignment.assignmentId,
                studentId: state.assignment.studentId
            }
        },
        data: {
            status: 'submitted'
        }
    });
    
    await prisma.studentAssignment.update({
      where: {
          studentId_assignmentId: {
              assignmentId: state.assignment?.assignmentId,
              studentId: state.assignment?.studentId
          }
      },
      data: {
          grade: 'A',
      }
  });
    }
    return undefined;
  };

  const builder = {
    fromAssignment,
    build,
  };

  return builder;
}
