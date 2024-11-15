import  {prisma } from '../../src/database'

export default function studentBuilder() {
  const state = {
    name: '',
    email: ''
  }
  
  const withName = (name: string) => {
    state.name = name
    return builder
  }
  
  const withEmail = (email: string) => {
    state.email = email
    return builder
  }
  
  const build = async () => {
    const student = await prisma.student.create({
      data: {
          name: state.name,
          email: state.email 
      }
  });
    return student
  }
  
  const builder = {
    withName,
    withEmail,
    build
  }
  
  return builder
}
