import { DateForamat } from '../enums'
import LogFileReader from '../entities/logReader';
import { Router } from 'express';

const logReader: LogFileReader = new LogFileReader('./logs/hn_logs.tsv');
const routes: Router = Router();

routes.get('/', function (req, res) {
  res.sendStatus(200);
});

// TODO do a LogParser class that return ParsedLog and a Log class that you call in your routes
routes.get('/count/:date', (req, res) => {
  if (!req.params.date) res.sendStatus(400);

  const startTime: number = performance.now();
  const dateFormatIndex: number = req.params?.date.split(/[ :-]+/).length - 1;
  let result: number | null = null;

  for (const key in DateForamat) {
    const dataFormat: DateForamat = Number(key)

    if (!isNaN(dataFormat)) {
      if (dataFormat === dateFormatIndex) {
        result = logReader.logs[dataFormat][req.params?.date].count;
      }
    }
  }
  const endTime: number = performance.now();

  console.log(`${endTime - startTime} milliseconds`);

  res.json({ count: result });
});

routes.get('/popular/:date&:size', (req, res) => {
  console.log(req.params);

  //TODO: Add a queries prop and sort them
  res.sendStatus(200);
});

export default routes;