import { CardsModelType } from '../db/models/CardsModel'

export const sortAmount = (cards: CardsModelType[], type: '-tc' | '+tc') => {
  if(type === '+tc') {
    cards.sort((x, y) => {
      if(x.amount > y.amount) return -1;

      if(x.amount < y.amount) return 1;

      return 0
    })
  }

  if(type === '-tc') {
    cards.sort((x, y) => {
      if(x.amount < y.amount) return -1;

      if(x.amount > y.amount) return 1;

      return 0
    })
  }

  return cards;
}