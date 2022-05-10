import { query } from '../types'
import { swap } from '.';

const partition = (items: query[], left: number, right: number): number => {
  let pivot: query = items[Math.floor((right + left) / 2)],
    i: number = left,
    j: number = right

  while (i <= j) {
    while (items[i].count > pivot.count) {
      i++;
    }

    while (items[j].count < pivot.count) {
      j--;
    }

    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}

const quickSort = (items: query[], left: number, right: number): query[] => {
  let index: number;

  if (items.length > 1) {
    index = partition(items, left, right);

    if (left < index - 1) {
      quickSort(items, left, index - 1);
    }

    if (index < right) {
      quickSort(items, index, right);

    }
  }

  return items;
}

const quickSortQueries = (items: query[]): query[] => {
  return quickSort(items, 0, items.length - 1)
}

export default quickSortQueries
