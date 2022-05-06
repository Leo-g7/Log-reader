import LogFile from '../services/logs/LogFile';
import LogFileParser from '../services/logs/LogFileParser';
import { query } from '../types'
import { Router, Request, Response } from 'express';

const logFile: LogFile = new LogFile(new LogFileParser('./data/hn_logs.tsv'))
const routes: Router = Router();

routes.get('/count/:date', (req: Request, res: Response) => {

  if (!req.params.date) res.sendStatus(404);

  const result: number | null = logFile.CountUniqueUrl(req.params?.date)

  if (!result) res.sendStatus(404);

  res.json({ count: result });
});

routes.get('/popular/:date', (req: Request, res: Response) => {

  if (!req.params.date || !req.query?.size || Number(req.query?.size) === NaN) res.sendStatus(404);

  const result: query[] = logFile.getPopularQueries(req.params.date, Number(req.query?.size))

  if (result.length === 0) res.sendStatus(404);

  res.json({ queries: result });
});

export default routes;
