import { Message } from 'discord.js'

import { CardEmbed } from '../../components/CardEmbed';

import { LevelModel, LevelModelType } from "../../db/models/LevelModel";
import { UsersDropModel } from '../../db/models/UsersDropModel';

import { capitalizeStr } from '../../functions/capitalize';
import { timestampToDate } from '../../functions/convertDate';

import { getCards } from '../../utils/GetCards';
import { getTiersDaily } from '../../utils/GetTiersDaily';

export const DropSystemDaily = async (message: Message, cardsNumber: number) => {
  const user: LevelModelType | null = await LevelModel.findOne({
    userId: message.author.id,
  });

  if(!user) {
    return message.channel.send(
      `Ops! ${message.author} não consegui achar você na minha lista. ` + 
      `Tente interagir um pouco mais com o pessoal. 🙂`
    )
  }

  let userDrop = await UsersDropModel.findOne({
    userId: message.author.id,
  })

  if(!userDrop) {
    userDrop = await UsersDropModel.create({
      userName: message.author.username,
      userId: message.author.id,
      cards: [],
      timestamp: Date.now() - 86400000,
    })
  }

  if(Date.now() - userDrop.timestamp > 86400000 || !userDrop.timestamp) {
    const tiers = getTiersDaily(cardsNumber);
    const cards = await getCards(tiers);
    const cardsId = cards.map(item => item.idCard)
  
    await UsersDropModel.findOneAndUpdate({
      userId: message.author.id,
    }, {
      $push: { cards: cardsId },
      $set: { timestamp: Date.now() }
    })

    cards.map(item => {
      CardEmbed(message, { 
        color: '#F4F5FA', 
        title: `#${item.idCard} - ${capitalizeStr(item.name)}`,
        description: 
          `Anime: **${capitalizeStr(item.anime)}**\n` + 
          `Valor de venda: **${item.amount}** xp points  <:ByteCoins:950614195290898464>`,
        linkURL: item.linkURL
      }).then(msg => msg.react('<:ByteCoins:950614195290898464>'))
    })
  } else {
    message.channel.send(
      `${message.author} seu pacote daily ainda não está disponivel.\n` + 
      `**Restante:** ${timestampToDate(86400000 - (Date.now() - userDrop.timestamp))}`
    ).then(msg => msg.delete({ timeout: 8000 }))
  }
}