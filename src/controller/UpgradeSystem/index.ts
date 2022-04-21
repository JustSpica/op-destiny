import { Message } from "discord.js";
import { CardEmbed } from "../../components/CardEmbed";
import { CardsModel } from "../../db/models/CardsModel";

import { UserModel, IUserModel } from "../../db/models/UsersModel";
import { capitalizeStr } from "../../functions/capitalize";
import { randomNumbers } from "../../functions/randomNumbers";

export const UpgradeSystem = async (message: Message, idCard: string) => {
  const user: IUserModel | null = await UserModel.findOne({
    idUser: message.author.id,
  })

  if(!user) {
    return message.channel.send(
      `Ops! ${message.author} não consegui achar você na minha lista. ` + 
      `Tente interagir um pouco mais com o pessoal. 🙂`
    )
  }

  const cards = user.cards.filter(item => item === idCard)

  if(cards.length < 3) {
    return message.channel.send(
      `Ops! ${message.author}, você precisa ter no minimo 3 cards iguais a esse para dar upgrade.` + 
      `\n\nAtualmente você possui: **${cards.length}** cards com o id #${idCard}`
    )
  }

  const card = await CardsModel.findOne({
    idCard: cards[0]
  })

  const allTierCards = await CardsModel.find({
    tier: card?.tier! + 1
  })
  const randomIndex = randomNumbers(0, allTierCards.length - 1);

  const newCard = allTierCards[randomIndex];
  user.cards.push(newCard.idCard);
 
  for (let index = 0; index < 3; index++) {
    user.cards.splice(user.cards.indexOf(idCard), 1);
  }

  await UserModel.findOneAndUpdate({
    idUser: message.author.id,
  }, {
    $set: {
      cards: user.cards
    }
  })
  
  CardEmbed(message, { 
    color: '#F4F5FA', 
    title: `#${newCard.idCard} - ${capitalizeStr(newCard.name)}`,
    description: 
      `Anime: **${capitalizeStr(newCard.anime)}**\n` + 
      `Valor de venda: **${newCard.amount}** DTC <:DTC:965680653255446629>\n` +
      `Carta de: **${message.author.username}**`,
    linkURL: newCard.linkURL
  }).then(msg => msg.react('<:DTC:965680653255446629>'))
}