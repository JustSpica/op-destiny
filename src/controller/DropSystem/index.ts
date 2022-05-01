 import { Message } from "discord.js";

import { CardEmbed } from "../../components/CardEmbed";

import { UserModel, IUserModel } from '../../db/models/UsersModel';

import { capitalizeStr } from "../../functions/capitalize";

import { getCards } from "../../utils/GetCards";
import { getTiers } from "../../utils/GetTiers";
import { getKeys } from "../../utils/KeysUtils";

type DropSystemProps = {
  amount: number;
  cardsNumber: number;
}

export const DropSystem = async (message: Message, { amount, cardsNumber }: DropSystemProps) => {
  const user: IUserModel | null = await UserModel.findOne({
    idUser: message.author.id,
  })

  if(!user) {
    return message.channel.send(
      `Ops! ${message.author} não consegui achar você na minha lista. ` + 
      `Tente interagir um pouco mais com o pessoal. 🙂`
    )
  }

  if(user.coins < amount) {
    return message.channel.send(
      `${message.author}, você não possui Destiny coins (DTC) suficientes para comprar esse pacote\n` + 
      `O valor atual na sua carteira é de: **${user.coins} DTC**`
    ).then(msg => msg.delete({ timeout: 6000 }));
  } else {
    await UserModel.findOneAndUpdate({
      idUser: message.author.id,
    }, {
      $set: {
        coins: user.coins - amount
      }
    })
  }

  const keySorted = getKeys();

  const tiers = getTiers(cardsNumber)

  const cards = await getCards(tiers);
  const cardsId = cards.map(item => item.idCard)

  await UserModel.findOneAndUpdate({
    idUser: message.author.id,
  }, {
    $push: { 
      cards: cardsId
    }
  });
  
  if(keySorted) {
    await UserModel.findOneAndUpdate({
      idUser: message.author.id,
    }, {
      $push: { 
        keys: keySorted
      }
    });
  }

  cards.map(item => {
    CardEmbed(message, { 
      color: '#F4F5FA', 
      title: `#${item.idCard} - ${capitalizeStr(item.name)}`,
      description: 
        `Anime: **${capitalizeStr(item.anime)}**\n` + 
        `Valor de venda: **${item.amount}** DTC <:DTC:965680653255446629>\n` +
        `Carta de: **${message.author.username}**`,
      linkURL: item.linkURL
    }).then(msg => msg.react('<:DTC:965680653255446629>'))
  })
  
  if(keySorted?.id === 1) {
    return message.channel.send(
      `Wow **${message.author.username}**, você dropou uma... Espera VOCÊ DROPOU ` + 
      `UMA <:shadeSoul:968745230985723904> **${keySorted.name}** 😮, isso é muito raro. ` + 
      `Você pode usar ela para abrir um **shade chest**.`
    )
  }

  if(keySorted?.id === 2) {
    return message.channel.send(
      `Wow **${message.author.username}**, você dropou junto com a sua carta uma ` + 
      `<:vengefulSpirit:968745284379246592> **${keySorted.name}**, isso é bom. ` + 
      `Você pode usar ela para abrir um **spirit chest**.` 
    )
  }
}