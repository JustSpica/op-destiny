import { MessageReaction, User, PartialUser, Message } from 'discord.js';

import { CardsModel } from '../db/models/CardsModel'
import { LevelModel } from '../db/models/LevelModel';
import { UsersDropModel } from '../db/models/UsersDropModel';

export const event = {
  name: 'messageReactionAdd',
  on: true,
  execute: async (reaction: MessageReaction, user: User | PartialUser) => {
    if(user.bot) return;

    if(reaction.emoji.name !== 'ByteCoins') return;

    const nameSelected = reaction.message?.embeds[0]?.title?.toLowerCase()
    if(!nameSelected) return;

    const cardSelected = await CardsModel.findOne({
      name: nameSelected.slice(7),
    })

    if(!cardSelected) return;

    let userActive = await UsersDropModel.findOne({
      userId: user.id
    })

    if(!userActive) {
      return reaction.message.channel.send(
        `${user}, você ainda não girou nenhum pacote de cartas, então não tenho você no sistema.\n` + 
        `De uma olhada nas opções disponíveis com o comando **op!dropList**. 😊`
      ).then(msg => msg.delete({ timeout: 10000 }));
    }

    const cardId = userActive.cards.find(item => 
      item === cardSelected.idCard
    )

    if(!cardId) {
      return reaction.message.channel.send(
        `${user}, você não pode vender cartas que você não possui né. 🙄`
      ).then(msg => msg.delete({ timeout: 8000 }));
    };

    await UsersDropModel.bulkWrite(
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
      { userId: user.id },
      { $set: { xp: xp + cardSelected.amount } }
    )
  }
}