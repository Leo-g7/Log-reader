export const swap = (items: any[], leftIndex: number, rightIndex: number): void => {
  let item: any[] = items[leftIndex];

  items[leftIndex] = items[rightIndex];
  items[rightIndex] = item;
}
