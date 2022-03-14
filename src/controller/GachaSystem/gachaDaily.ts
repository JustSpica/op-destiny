import { Message } from 'discord.js'

import { EmbedCard } from '../../components/EmbedCard';

import { UserGachaModel } from '../../db/models/UserGachaModel';

import { dropGacha } from '../../utils/DropGacha';
import { getCards } from '../../utils/GetCards';
import { capitalizeStr } from '../../functions/capitalize';
import { timestampToDate } from '../../functions/convertDate';

export const GachaDaily = async (message: Message, amountCards: number) => {
  let userGacha = await UserGachaModel.findOne({
    userId: message.author.id,
  })

  if(!userGacha) {
    userGacha = await UserGachaModel.create({
      userName: message.author.username,
      userId: message.author.id,
      cards: [],
      timestamp: Date.now() - 86400000,
    })
  }

  if(Date.now() - userGacha.timestamp > 86400000) {
    const ranks = dropGacha(amountCards);
    const cards = await getCards(ranks);
    const cardsId = cards.map(item => item._id)

    userGacha = await UserGachaModel.findOneAndUpdate({
      userId: message.author.id,
    }, {
      $push: { cards: cardsId },
      $set: { timestamp: Date.now() }
    })

    console.log('teste2');

    cards.map(item => {
      EmbedCard(message, {
        title: capitalizeStr(item.name),
        description: `Anime: **${capitalizeStr(item.anime)}**\n` + 
        `Xp points: **${item.amount}** <:ByteCoins:950614195290898464>`,
        imageUrl: item.link
      }).then(msg => {
        msg.react('<:ByteCoins:950614195290898464>')
      })
    })
  } else {
    message.channel.send(
      `${message.author} seu pacote daily ainda não está disponivel.\n` + 
      `**Restante:** ${timestampToDate(86400000 - (Date.now() - userGacha.timestamp))}`
    ).then(msg => msg.delete({ timeout: 6000 }))
  }
}