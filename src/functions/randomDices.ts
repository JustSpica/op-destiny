import { CardsModel } from '../db/models/CardsModel';
import { randomNumbers } from './randomNumbers';

interface IRandomDices {
  dice: 'd20' | 'd10' | 'd8';
}

export const RandomDice = ({ dice }: IRandomDices) => {
  if(dice === 'd20') {
    const number = randomNumbers(0, 20);

    return number;
  }
}

export const DiceToCard = async (value: number) => {
  let tier;

  if(value >= 0 && value <= 6) {
    tier = 1;
  } else if(value <= 10) {
    tier = 2;
  } else if(value <= 14) {
    tier = 3;
  } else if(value <= 17) {
    tier = 4;
  } else if(value <= 19) {
    tier = 5;
  } else {
    tier = 6;
  }

  const cards = await CardsModel.find({
    tier: tier,
  })
  const randomIndex = randomNumbers(0, cards.length - 1)

  return cards[randomIndex];
}