import { DateForamat } from '../enums'

type logDates = {
  [key: string]: logUrls;
}

export type logs = {
  [key in DateForamat]: logDates
}

type logUrls = {
  count: number,
  urls: { [key: string]: logUrlCount }
}

type logUrlCount = {
  count: number
}

export type query = {
  count: number,
  query: string
}
