import { randomNumbers } from "../../functions/randomNumbers"

export const upgradeTiers = (amount: number) => {
  let tier = 0;
  const number = Number((amount * 100) / 2500);

  const randomNumber = randomNumbers(0, 100 - number, true);

  console.log(`Valor: ${randomNumber} %`);

  if(randomNumber > 0 && randomNumber <= 5) { 
    tier = 6; //5 %
  } else if(randomNumber > 5 && randomNumber <= 13) {
    tier = 5; //8 %
  } else if(randomNumber > 13 && randomNumber <= 25) {
    tier = 4; //12 %
  } else if(randomNumber > 25 && randomNumber <= 40) {
    tier = 3; //15 %
  } else if(randomNumber > 40 && randomNumber <= 60) {
    tier = 2; //20 %
  } else {
    tier = 1; //40 %
  }

  return tier;
}