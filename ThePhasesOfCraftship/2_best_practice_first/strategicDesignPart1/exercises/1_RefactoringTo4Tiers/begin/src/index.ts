import express from 'express';
import createStudentController from './controllers/createStudentController';
import createClassController from './controllers/createClassController';
import createAssingmentController from './controllers/createAssignmentController';
import { errorHandler } from './error/errorHandler';
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


const studentController = createStudentController(errorHandler)
const classController = createClassController(errorHandler)
const assingmentController = createAssingmentController(errorHandler)

app.use(studentController)
app.use(classController)
app.use(assingmentController)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
