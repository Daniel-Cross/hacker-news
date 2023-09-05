export const randomiseNewsData = (array: number[], count: number) => {
  if (count >= array.length) {
    return array.slice();
  } else {
    const shuffledArray = array.slice();
    const result = [];

    for (let i = shuffledArray.length - 1; i > 0 && count > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];

      result.push(shuffledArray[i]);
      count--;
    }

    return result;
  }
};
