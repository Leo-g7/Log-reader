import express, { Express } from 'express';
import routes from './routes/index';

const app: Express = express();
const port: number = 4000;

app.use('/1/queries', routes);

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`)
});
