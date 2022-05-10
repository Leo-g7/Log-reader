import { DateForamat } from '../../enums'
import LogFileParser from './LogFileParser'
import { logs, query } from '../../types'
import quickSelectQueries from '../../helpers/quickSelectQueries';
import quickSortQueries from '../../helpers/quickSortQueries';

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

          let sortable: query[] = [];

          for (const url in this.logs[dataFormat][date].urls) {
            sortable.push({ query: url, count: this.logs[dataFormat][date].urls[url].count });
          }

          result = quickSortQueries(quickSelectQueries(sortable, size))
          break
        }
      }
    }

    return result
  }
}

export default LogFile;
