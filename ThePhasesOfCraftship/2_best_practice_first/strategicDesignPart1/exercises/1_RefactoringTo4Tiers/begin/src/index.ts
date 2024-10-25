import express from 'express';
import { createStudentService, createClassService, createAssignmentService } from './services';
import { createStudentController, createClassController, createAssingmentController } from './controllers';
import { errorHandler } from './error/errorHandler';
import createDatabase from './persistence';
import { prisma } from './database';
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const database = createDatabase(prisma)

const studentService = createStudentService(database)
const classService = createClassService()
const assingmentService = createAssignmentService()

const studentController = createStudentController(errorHandler, studentService)
const classController = createClassController(errorHandler, classService)
const assingmentController = createAssingmentController(errorHandler, assingmentService)

app.use(studentController)
app.use(classController)
app.use(assingmentController)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
