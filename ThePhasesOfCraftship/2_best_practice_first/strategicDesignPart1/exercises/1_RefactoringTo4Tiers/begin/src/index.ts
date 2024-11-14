import { PrismaClient } from '@prisma/client';
import { createStudentService, createClassService, createAssignmentService } from './services';
import { createStudentController, createClassController, createAssingmentController } from './controllers';
import { errorHandler } from './error/errorHandler';
import createDatabase from './persistence';
import createApplication from './createApplication';


const prisma = new PrismaClient();

const database = createDatabase(prisma)

const studentService = createStudentService(database)
const classService = createClassService(database)
const assingmentService = createAssignmentService(database)

const studentController = createStudentController(errorHandler, studentService)
const classController = createClassController(errorHandler, classService)
const assingmentController = createAssingmentController(errorHandler, assingmentService)

export const application = createApplication([studentController, classController, assingmentController])
