export const bubbleSort = (arry: number[]): number[] => {
  if (!arry.length) {
    return arry;
  }

  for (
    let lastUnsortedIndex = arry.length - 1;
    lastUnsortedIndex > 0;
    lastUnsortedIndex--
  ) {
    for (let index = 0; index < lastUnsortedIndex; index++) {
      if (arry[index] > arry[index + 1]) {
        //swap
        let temp = arry[index];
        arry[index] = arry[index + 1];
        arry[index + 1] = temp;
      }
    }
  }

  return arry;
};
