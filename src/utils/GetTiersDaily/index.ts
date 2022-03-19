import { randomNumbers } from "../../functions/randomNumbers"

export const getTiersDaily = (cards: number) => {
  const arr: number[] = [];
  for (let index = 0; index < cards; index++) {
    const randomNumber = Number((Math.random() * 100).toFixed(4))

    console.log(randomNumber);

    if(randomNumber < 0.3) {
      arr.push(6)
    } else if(randomNumber < 1) {
      arr.push(5)
    } else if(randomNumber < 6) {
      arr.push(4)
    } else if(randomNumber < 18) {
      arr.push(3)
    } else if(randomNumber < 50) {
      arr.push(2)
    } else {
      arr.push(1)
    }
  }

  return arr;
}