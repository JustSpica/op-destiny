import { randomNumbers } from "../../functions/randomNumbers"

export const getTiersDaily = (cards: number) => {
  const arr: number[] = [];
  for (let index = 0; index < cards; index++) {
    const randomNumber = Number((Math.random() * 100).toFixed(4))

    if(randomNumber > 0 && randomNumber <= 0.2) {
      arr.push(6)
    } else if(randomNumber > 0.2 && randomNumber <= 1.2) {
      arr.push(5)
    } else if(randomNumber > 1.2 && randomNumber <= 5.2) {
      arr.push(4)
    } else if(randomNumber > 5.2 && randomNumber <= 25.2) {
      arr.push(3)
    } else if(randomNumber > 25.2 && randomNumber <= 53.2) {
      arr.push(2)
    } else {
      arr.push(1)
    }
  }

  return arr;
}