import { DateForamat } from '../../enums'
import LogFileParser from './LogFileParser'
import { logs, query, sortableQuery } from '../../types'

class LogFile {
  private logs: logs = {
    [DateForamat.year]: {},
    [DateForamat.month]: {},
    [DateForamat.day]: {},
    [DateForamat.hour]: {},
    [DateForamat.minute]: {},
    [DateForamat.second]: {}
  };

  constructor(parsedLogFile: LogFileParser) {
    this.logs = parsedLogFile.getLogFile()
  }

  public CountUniqueUrl = (date: string): number | null => {
    const dateFormatIndex: number = this.getDateFormatIndex(date)
    let result: number | null = null;

    for (const key in DateForamat) {
      const dataFormat: DateForamat = Number(key)

      if (!isNaN(dataFormat)) {
        if (dataFormat === dateFormatIndex && this.logs[dataFormat][date]) {
          result = this.logs[dataFormat][date].count;
          break
        }
      }
    }

    return result
  }

  private getDateFormatIndex = (date: string): number => {
    return date.split(/[ :-]+/).length - 1;
  }

  public getPopularQueries = (date: string, size: number): query[] => {
    const dateFormatIndex: number = this.getDateFormatIndex(date)
    let result: query[] = [];

    for (const key in DateForamat) {
      const dataFormat: DateForamat = Number(key)

      if (!isNaN(dataFormat)) {
        if (dataFormat === dateFormatIndex && this.logs[dataFormat][date]) {

          const sortable: sortableQuery[] = [];

          for (const url in this.logs[dataFormat][date].urls) {
            sortable.push([url, this.logs[dataFormat][date].urls[url].count]);
          }

          sortable.sort((a, b) => {
            return b[1] - a[1];
          });

          const queries: sortableQuery[] = sortable.slice(0, size)

          for (const querie of queries) {
            result.push({
              query: querie[0],
              count: querie[1]
            })
          }
          break
        }
      }
    }

    return result
  }
}

export default LogFile;
