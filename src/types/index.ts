import { DateForamat } from '../enums'

type logDate = {
  [key: string]: logUrl;
}

export type logFile = {
  [key in DateForamat]: logDate
}

type logUrl = {
  count: number,
  urls: { [key: string]: logUrlCount }
}

type logUrlCount = {
  count: number
}
