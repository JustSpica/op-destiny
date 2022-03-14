import { MessageReaction, User, PartialUser } from 'discord.js';

import { CardModel } from '../db/models/CardModel'
import { LevelModel } from '../db/models/LevelModel';
import { UserGachaModel } from '../db/models/UserGachaModel';

export const event = {
  name: 'messageReactionAdd',
  on: true,
  execute: async (reaction: MessageReaction, user: User | PartialUser) => {
    if(user.bot) return;

    if(reaction.emoji.name) return;

    const nameSelected = reaction.message?.embeds[0]?.title?.toLowerCase()
    if(!nameSelected) return;

    const cardSelected = await CardModel.findOne({
      name: nameSelected
    })
    if(!cardSelected) return;

    let userActive = await UserGachaModel.findOne({
      userId: user.id,
    })
    if(!userActive) return

    const cardId = userActive.cards.find(item => 
      item.toString() === cardSelected._id.toString()
    )
    if(!cardId) return

    await UserGachaModel.bulkWrite(
      [
        { updateOne: {
          filter: { cards: cardId },
          update: {
            $unset: { "cards.$": "" }
          }
        }},
        { updateOne: {
          filter: { cards: null },
          update: {
            $pull: { "cards": null }
          }
        }}
      ]
    )

    const { xp } = await LevelModel.findOne({
      userId: user.id
    })

    await LevelModel.findOneAndUpdate(
      {
        userId: user.id
      },
      {
        $set: {
          xp: xp + cardSelected.amount
        }
      }
    )
  }
}