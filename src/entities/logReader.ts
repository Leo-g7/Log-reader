import { DateForamat } from '../enums'
import fs from 'fs';
import { logFile } from '../types'

class LogFileReader {
  logs: logFile = {
    [DateForamat.year]: {},
    [DateForamat.month]: {},
    [DateForamat.day]: {},
    [DateForamat.hour]: {},
    [DateForamat.minute]: {},
    [DateForamat.second]: {}
  };

  constructor(path: string) {
    console.log(path + ' data loding...');

    const file: string | null = this.readFile(path);

    if (!file) return;

    const lines = this.splitLogFileLines(file);

    this.setLogs(lines);

    console.log(path + ' data loading complete');
  }

  addFillingCharacter(index: number): "-" | " " | ":" | "" {
    if (index < 3 && index != 0) return '-';
    else if (index === 3) return ' ';
    else if (index > 3) return ':';
    else return '';
  }

  advanceDateFormat(dateKey: string, dataFormat: DateForamat, splitedDate: string[]): string {
    return dateKey + this.addFillingCharacter(dataFormat) + splitedDate[dataFormat];
  }

  readFile(path: string): string | null {
    try {
      return fs.readFileSync(path, 'utf8');
    } catch (error) {
      console.log('file ' + path + " could not be found")
      return null;
    }
  }

  setLogs(lines: string[]): void {
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

  setLogsDate(dateFormat: DateForamat, dateKey: string, url: string): void {
    if (!this.logs[dateFormat][dateKey]) {
      this.logs[dateFormat][dateKey] = { count: 1, urls: {} };
    } else if (!this.logs[dateFormat][dateKey].urls[url]) {
      this.logs[dateFormat][dateKey].count++;
    }
  }

  setLogsUrl(dateFormat: DateForamat, dateKey: string, url: string): void {
    if (!this.logs[dateFormat][dateKey].urls[url]) {
      this.logs[dateFormat][dateKey].urls[url] = { count: 1 };
    } else if (typeof this.logs[dateFormat][dateKey].urls[url] !== 'number') {
      this.logs[dateFormat][dateKey].urls[url].count++
    }
  }

  splitLogFileLines(file: string): string[] {
    return file.split('\n');
  }
}

export default LogFileReader;