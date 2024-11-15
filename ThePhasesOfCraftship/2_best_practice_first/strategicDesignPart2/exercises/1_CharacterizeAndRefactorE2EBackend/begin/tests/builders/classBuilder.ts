import { Class } from '@prisma/client'
import { prisma } from '../../src/database'

interface IClassBuilder {
  withName: (name:string) => IClassBuilder
  build: () => Promise<Class> 
}

export default function classBuilder (): IClassBuilder {
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
