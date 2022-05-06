import LogFile from '../services/logs/LogFile';
import LogFileParser from '../services/logs/LogFileParser';
import { query } from '../types'
import { Router } from 'express';

const logFile: LogFile = new LogFile(new LogFileParser('./data/hn_logs.tsv'))
const routes: Router = Router();

routes.get('/count/:date', (req, res) => {
  const startTime: number = performance.now();

  if (!req.params.date) res.sendStatus(404);

  const result: number | null = logFile.CountUniqueUrl(req.params?.date)

  if (!result) res.sendStatus(404);

  const endTime: number = performance.now();

  console.log(`${endTime - startTime} milliseconds`);

  res.json({ count: result });
});

routes.get('/popular/:date', (req, res) => {
  const startTime: number = performance.now();

  if (!req.params.date || !req.query?.size || Number(req.query?.size) === NaN) res.sendStatus(404);

  const result: query[] = logFile.getPopularQueries(req.params.date, Number(req.query?.size))

  if (result.length === 0) res.sendStatus(404);

  const endTime: number = performance.now();

  console.log(`${endTime - startTime} milliseconds`);

  res.json({ queries: result });
});

export default routes;