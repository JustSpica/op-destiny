import { randomNumbers } from "../../functions/randomNumbers"

export const upgradeTiers = (amount: number) => {
  let tier = 0;
  const number = Number((amount * 100) / 2500).toFixed(4);
  console.log(number);
  const randomNumber = randomNumbers(Number(number), 100, true);
  console.log(randomNumber);

  if(randomNumber < 100 && randomNumber >= 95) {
    tier = 6;
  } else if(randomNumber < 95 && randomNumber >= 75) {
    tier = 5;
  }
}