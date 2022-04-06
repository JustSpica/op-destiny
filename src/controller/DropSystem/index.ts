 import { Message } from "discord.js";

import { CardEmbed } from "../../components/CardEmbed";

import { LevelModel, LevelModelType } from "../../db/models/LevelModel";
import { UsersDropModel } from "../../db/models/UsersDropModel";

import { capitalizeStr } from "../../functions/capitalize";

import { getCards } from "../../utils/GetCards";
import { getHighBonus } from "../../utils/GetHighBonus";
import { getTiers } from "../../utils/GetTiers";

type DropSystemProps = {
  amount: number;
  cardsNumber: number;
  limitedTime?: boolean;
}

export const DropSystem = async (message: Message, { amount, cardsNumber, limitedTime }: DropSystemProps) => {
  const user: LevelModelType | null = await LevelModel.findOne({
    userId: message.author.id,
  });

  if(!user) {
    return message.channel.send(
      `Ops! ${message.author} não consegui achar você na minha lista. ` + 
      `Tente interagir um pouco mais com o pessoal. 🙂`
    )
  }

  if(user.xp < amount) {
    return message.channel.send(
      `${message.author}, você não possui xp points suficiente para comprar esse pacote\n` + 
      `Seu xp atual é de **${user.xp}xp points**`
    ).then(msg => msg.delete({ timeout: 6000 }));
  } else {
    await LevelModel.findOneAndUpdate({
      userId: message.author.id,
    }, {
      $set: {
        xp: user.xp - amount,
      }
    })  
  }

  let tiers: number[] = [];

  console.log(message.author.username);

  if(limitedTime) {
    tiers = getHighBonus(cardsNumber)
  } else {
    tiers = getTiers(cardsNumber)
  }


  const cards = await getCards(tiers);
  const cardsId = cards.map(item => item.idCard)

  const userDrop = await UsersDropModel.findOne({
    userId: message.author.id,
  })

  if(!userDrop) {
    await UsersDropModel.create({
      userName: message.author.username,
      userId: message.author.id,
      cards: []
    })
  }

  await UsersDropModel.findOneAndUpdate({
    userId: message.author.id,
  }, {
    $push: { cards: cardsId }
  })

  cards.map(item => {
    CardEmbed(message, { 
      color: '#F4F5FA', 
      title: `#${item.idCard} - ${capitalizeStr(item.name)}`,
      description: 
        `Anime: **${capitalizeStr(item.anime)}**\n` + 
        `Valor de venda: **${item.amount}** xp points  <:ByteCoins:950614195290898464>` +
        `Carta de: **${message.author.username}**`,
      linkURL: item.linkURL
    }).then(msg => msg.react('<:ByteCoins:950614195290898464>'))
  })
}