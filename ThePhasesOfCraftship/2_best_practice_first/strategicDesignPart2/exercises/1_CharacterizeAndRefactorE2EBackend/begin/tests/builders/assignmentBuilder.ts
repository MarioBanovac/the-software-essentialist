import { Assignment, Class } from '@prisma/client'
import { prisma } from '../../src/database'

interface IAssignmentBuilder {
  fromClassRoom: (classRoom: Class) => IAssignmentBuilder
  withTitle: (title: string) => IAssignmentBuilder 
  build: () => Promise<Assignment | undefined>
}

export default function assignmentBuilder(): IAssignmentBuilder {
  const state : {
    classRoom: Class | null
    title: string
  } = {
    classRoom: null,
    title: ''
  }
  
  const fromClassRoom = (classRoom: Class) => {
    state.classRoom = classRoom
    return builder
  }
  
  const withTitle = (title: string) => {
    state.title = title
    return builder
  }
  
  const build = async () => {
    if (state.classRoom?.id) {
      return await prisma.assignment.create({
        data: {
            classId: state.classRoom.id,
            title: state.title
        }
    }); 
    }
  
  return undefined
  }
  
  const builder = {
    fromClassRoom,
    withTitle,
    build
  }
  
  return builder

}
