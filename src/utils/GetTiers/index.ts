import { randomNumbers } from "../../functions/randomNumbers"

export const getTiers = (cards: number) => {
  const arr: number[] = [];
  for (let index = 0; index < cards; index++) {
    const randomNumber = Number((Math.random() * 100).toFixed(4))

    if(randomNumber < 0.010) {
      arr.push(6)
    } else if(randomNumber < 0.1) {
      arr.push(5)
    } else if(randomNumber < 3) {
      arr.push(4)
    } else if(randomNumber < 12) {
      arr.push(3)
    } else if(randomNumber < 40) {
      arr.push(2)
    } else {
      arr.push(1)
    }
  }

  return arr;
}