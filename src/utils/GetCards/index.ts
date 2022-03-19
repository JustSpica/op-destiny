import { CardsModel, CardsModelType } from "../../db/models/CardsModel";

import { randomNumbers } from '../../functions/randomNumbers';

export const getCards = async (tiers: number[]) => {
  const arr: CardsModelType[] = [];
  
  for (let index = 0; index < tiers.length; index++) {
    const card = await CardsModel.find({
      tier: tiers[index]
    })
    const randomIndex = randomNumbers(0, (card.length - 1));

    arr.push(card[randomIndex]);
  }

  return arr;
}