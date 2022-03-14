
import { Message } from 'discord.js'

import { EmbedCard } from '../../components/EmbedCard';

import { LevelModel } from '../../db/models/LevelModel'
import { UserGachaModel } from '../../db/models/UserGachaModel';

import { dropGacha } from '../../utils/DropGacha';
import { getCards } from '../../utils/GetCards';
import { capitalizeStr } from '../../functions/capitalize'

type GachaSystemProps = {
  amountValue: number;
  amountCards: number;
}

export const GachaSystem = async (message: Message, { amountValue, amountCards, }: GachaSystemProps) => {
  const { xp } = await LevelModel.findOne({
    userId: message.author.id
  })

  if(xp < amountValue) {
    return message.channel.send(
      `${message.author}, você não tem xp points suficientes para comprar esse pacote.\n` +
      `Seu xp points atual é de: **${xp}**`
    ).then(msg => msg.delete({ timeout: 8000 }))
  }

  await LevelModel.findOneAndUpdate({
    userId: message.author.id,
  }, {
    $set: { xp: xp - amountValue, }
  })

  const ranks = dropGacha(amountCards);
  const cards = await getCards(ranks);
  const cardsId = cards.map(item => item._id)

  let userGacha = await UserGachaModel.findOne({
    userId: message.author.id,
  })

  if(!userGacha) {
    userGacha = await UserGachaModel.create({
      userName: message.author.username,
      userId: message.author.id,
      cards: cardsId,
      timestamp: Date.now(),
    })
  } else {
    userGacha = await UserGachaModel.findOneAndUpdate({
      userId: message.author.id,
    }, {
      $push: { cards: cardsId }
    })
  }
  
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
}