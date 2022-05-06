import LogFile from '../services/logs/LogFile';
import LogFileParser from '../services/logs/LogFileParser';
import { Router } from 'express';

const logFile: LogFile = new LogFile(new LogFileParser('./data/hn_logs.tsv'))

const routes: Router = Router();

routes.get('/', function (req, res) {
  res.sendStatus(200);
});

routes.get('/count/:date', (req, res) => {
  if (!req.params.date) res.sendStatus(400);

  const startTime: number = performance.now();

  const result: number | null = logFile.CountUniqueUrl(req.params?.date)

  if (!result) res.sendStatus(404);

  const endTime: number = performance.now();

  console.log(`${endTime - startTime} milliseconds`);

  res.json({ count: result });
});

routes.get('/popular/:date&:size', (req, res) => {
  console.log(req.params);

  //TODO: Qick sort
  res.sendStatus(200);
});

export default routes;