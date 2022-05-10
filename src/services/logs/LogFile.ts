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

          let sortable: sortableQuery[] = [];

          for (const url in this.logs[dataFormat][date].urls) {
            sortable.push([url, this.logs[dataFormat][date].urls[url].count]);
          }

          sortable = this.quickSortQueries(1, sortable, 0, sortable.length - 1)

          const queries: sortableQuery[] = sortable.slice(sortable.length - size, sortable.length).reverse();

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

  private partition = (indexToCompare: number, items: sortableQuery[], left: number, right: number): number => {
    let pivot: sortableQuery = items[Math.floor((right + left) / 2)],
      i: number = left,
      j: number = right

    while (i <= j) {
      while (items[i][indexToCompare] < pivot[indexToCompare]) {
        i++;
      }

      while (items[j][indexToCompare] > pivot[indexToCompare]) {
        j--;
      }

      if (i <= j) {
        this.swap(items, i, j);
        i++;
        j--;
      }
    }
    return i;
  }

  private quickSortQueries = (indexToCompare: number, items: sortableQuery[], left: number, right: number): sortableQuery[] => {
    let index: number;

    if (items.length > 1) {
      index = this.partition(indexToCompare, items, left, right);

      if (left < index - 1) {
        this.quickSortQueries(indexToCompare, items, left, index - 1);
      }
      if (index < right) {
        this.quickSortQueries(indexToCompare, items, index, right);
      }
    }
    return items;
  }

  private swap = (items: sortableQuery[], leftIndex: number, rightIndex: number): void => {
    let item: sortableQuery = items[leftIndex];

    items[leftIndex] = items[rightIndex];
    items[rightIndex] = item;
  }


}

export default LogFile;
