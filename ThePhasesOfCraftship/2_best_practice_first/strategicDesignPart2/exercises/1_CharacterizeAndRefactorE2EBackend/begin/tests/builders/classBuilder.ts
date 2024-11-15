import { prisma } from '../../src/database'

export default function classBuilder () {
  const state = {
    name: ''
  } 
  
  const withName = (name: string) => {
    state.name = name
    return builder
   }
   
  const build = async () => {
    const cls = await prisma.class.create({
      data: {
          name: state.name
      }
  });
    return cls
  }
  
  const builder = {
    withName,
    build
  }
  
  return builder
}
