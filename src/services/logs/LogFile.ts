import { DateForamat } from '../../enums'
import { logs } from '../../types'
import LogFileParser from './LogFileParser'

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
    const dateFormatIndex: number = date.split(/[ :-]+/).length - 1;
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
}

export default LogFile;