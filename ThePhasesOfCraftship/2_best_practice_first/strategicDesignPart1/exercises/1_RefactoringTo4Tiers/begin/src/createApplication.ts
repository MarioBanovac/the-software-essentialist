import express, { RequestHandler } from 'express';
const cors = require('cors');


export default function createApplication(controllers: RequestHandler[]) {
  
  const app = express();
  app.use(express.json());
  app.use(cors());
  
  app.use(...controllers)
  
  const start = (PORT: string | number) => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`)
    })
  }
  
  return {
    start
  }
}
