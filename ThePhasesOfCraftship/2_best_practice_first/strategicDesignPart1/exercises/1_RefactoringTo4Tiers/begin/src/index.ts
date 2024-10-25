import express from 'express';
import createStudentService from './services/createStudentService';
import createStudentController from './controllers/createStudentController';
import createClassController from './controllers/createClassController';
import createAssingmentController from './controllers/createAssignmentController';
import { errorHandler } from './error/errorHandler';
import createClassService from './services/createClassService';
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


const studentService = createStudentService()
const classService = createClassService()

const studentController = createStudentController(errorHandler, studentService)
const classController = createClassController(errorHandler, classService)
const assingmentController = createAssingmentController(errorHandler)

app.use(studentController)
app.use(classController)
app.use(assingmentController)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
