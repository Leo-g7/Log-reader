import { DateForamat } from '../../enums'
import fs from 'fs';
import { logs } from '../../types'

class LogFileParser {

  private logFile: logs = {
    [DateForamat.year]: {},
    [DateForamat.month]: {},
    [DateForamat.day]: {},
    [DateForamat.hour]: {},
    [DateForamat.minute]: {},
    [DateForamat.second]: {}
  };
  private path: string = ''

  constructor(path: string) {
    this.path = path

    console.log(this.path + ' data loding...');

    const file: string | null = this.readFile(this.path);

    if (!file) return;

    const lines: string[] = this.splitLogFileLines(file);

    this.setLogs(lines);

    console.log(this.path + ' data loading complete');
  }

  public getLogFile = (): logs => {
    return this.logFile
  }

  private addFillingCharacter = (index: number): "-" | " " | ":" | "" => {
    if (index < 3 && index != 0) return '-';
    else if (index === 3) return ' ';
    else if (index > 3) return ':';
    else return '';
  }

  private advanceDateFormat = (dateKey: string, dataFormat: DateForamat, splitedDate: string[]): string => {
    return dateKey + this.addFillingCharacter(dataFormat) + splitedDate[dataFormat];
  }

  private readFile = (path: string): string | null => {
    try {
      return fs.readFileSync(path, 'utf8');
    } catch (error) {
      console.log('file ' + path + " could not be found")
      return null;
    }
  }

  private setLogs = (lines: string[]): void => {
    for (const line of lines) {
      const splitedLine: string[] = line.split('\t');
      const date: string = splitedLine[0];
      const url: string = splitedLine[1];
      const splitedDate: string[] = date.split(/[ :-]+/);
      let dateKey: string = '';

      for (const key in DateForamat) {
        const dataFormat: number = Number(key)

        if (!isNaN(dataFormat)) {
          dateKey = this.advanceDateFormat(dateKey, dataFormat, splitedDate);
          this.setLogsDate(dataFormat, dateKey, url);
          this.setLogsUrl(dataFormat, dateKey, url);
        }
      }
    }
  }

  private setLogsDate = (dateFormat: DateForamat, dateKey: string, url: string): void => {
    if (!this.logFile[dateFormat][dateKey]) {
      this.logFile[dateFormat][dateKey] = { count: 1, urls: {} };
    } else if (!this.logFile[dateFormat][dateKey].urls[url]) {
      this.logFile[dateFormat][dateKey].count++;
    }
  }

  private setLogsUrl = (dateFormat: DateForamat, dateKey: string, url: string): void => {
    if (!this.logFile[dateFormat][dateKey].urls[url]) {
      this.logFile[dateFormat][dateKey].urls[url] = { count: 1 };
    } else if (typeof this.logFile[dateFormat][dateKey].urls[url] !== 'number') {
      this.logFile[dateFormat][dateKey].urls[url].count++
    }
  }

  private splitLogFileLines = (file: string): string[] => {
    return file.split('\n');
  }
}

export default LogFileParser;
