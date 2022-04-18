import { MessageReaction, User, PartialUser, Message } from 'discord.js';

import { CardsModel } from '../db/models/CardsModel'
import { UserModel } from '../db/models/UsersModel';

export const event = {
  name: 'messageReactionAdd',
  on: true,
  execute: async (reaction: MessageReaction, user: User | PartialUser) => {
    if(user.bot) return;

    if(reaction.emoji.name !== 'DTC') return;

    const nameSelected = reaction.message?.embeds[0]?.title?.toLowerCase()
    if(!nameSelected) return;

    const cardSelected = await CardsModel.findOne({
      name: nameSelected.slice(7),
    })

    if(!cardSelected) return;

    let userActive = await UserModel.findOne({
      idUser: user.id
    })

    if(!userActive) {
      return reaction.message.channel.send(
        `${user}, você ainda não girou nenhum pacote de cartas, então não tenho você no sistema.\n` + 
        `De uma olhada nas opções disponíveis com o comando **op!dropList**. 😊`
      ).then(msg => msg.delete({ timeout: 6000 }));
    }

    const cardId = userActive.cards.find(item => 
      item === cardSelected.idCard
    )

    if(!cardId) {
      return reaction.message.channel.send(
        `${user}, você não possui essa carta no seu inventário.`
      ).then(msg => msg.delete({ timeout: 6000 }));
    } else {
      userActive.cards.splice(userActive.cards.indexOf(cardId), 1);
    }

    const { coins } = userActive

    await UserModel.findOneAndUpdate({
      idUser: user.id,
    }, {
      $set: { 
        cards: userActive.cards,
        coins: coins + cardSelected.amount
      }
    })
  }
}