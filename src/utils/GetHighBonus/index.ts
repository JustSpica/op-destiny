export const getHighBonus = (cards: number) => {
  const arr: number[] = [];
  for (let index = 0; index < cards; index++) {
    const randomNumber = Number((Math.random() * 100).toFixed(4))

    if(randomNumber > 0 && randomNumber <= 5) {
      arr.push(6)
    } else if(randomNumber > 5 && randomNumber <= 35) {
      arr.push(5)
    } else {
      arr.push(4)
    }
  }

  return arr;
}