import { CardModel, GachaObjectType } from '../../db/models/CardModel';

export const getCards = async (rank: number[]) => {
  const arr: GachaObjectType[] = [];
  
  for (let index = 0; index < rank.length; index++) {
    const card = await CardModel.find({
      rank: rank[index]
    })
    const randomIndex = Math.floor((Math.random() * (card.length)));

    arr.push(card[randomIndex])
  }

  return arr
}