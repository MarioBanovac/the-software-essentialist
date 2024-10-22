import express from 'express';
import createStudentController from './controllers/createStudentController';
import createClassController from './controllers/createClassController';
import createAssingmentController from './controllers/createAssignmentController';
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


const studentController = createStudentController()
const classController = createClassController()
const assingmentController = createAssingmentController()


// API Endpoints

// POST student created
app.post('/students', studentController.createAStudent);

// POST class created
app.post('/classes', classController.createAClass);

// POST student assigned to class
app.post('/class-enrollments', classController.enrollStudentToAClass);

// POST assignment created
app.post('/assignments', assingmentController.createAnAssingment);


// POST student assigned to assignment
app.post('/student-assignments', assingmentController.assignToStudent);

// POST student submitted assignment
app.post('/student-assignments/submit', assingmentController.submit);

// POST student assignment graded
app.post('/student-assignments/grade', assingmentController.grade);


// GET all students
app.get('/students', studentController.getAllStudents);

// GET a student by id
app.get('/students/:id', studentController.getAStudentById );

// GET assignment by id
app.get('/assignments/:id', assingmentController.getAnAssingmentById);

// GET all assignments for class
app.get('/classes/:id/assignments', assingmentController.getAllAssignmentsForAClass);

// GET all student submitted assignments
app.get('/student/:id/assignments', studentController.getAllStudentSubmittedAssignments);

// GET all student grades
app.get('/student/:id/grades', studentController.getAllStudentGrades)


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
