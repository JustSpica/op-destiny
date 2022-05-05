import { Message } from "discord.js";

import { CardEmbed } from "../../components/CardEmbed";
import { UserModel, IUserModel } from "../../db/models/UsersModel";

import { capitalizeStr } from "../../functions/capitalize";
import { timestampToDate } from "../../functions/convertDate";
import { DiceToCard, RandomDice } from "../../functions/randomDices"

export const DiceSystem = async (message: Message) => {
  const { id } = message.author;

  const user: IUserModel | null = await UserModel.findOne({
    idUser: message.author.id,
  })

  if(!user) {
    return message.channel.send(
      `Ops! ${message.author} não consegui achar você na minha lista. ` + 
      `Tente interagir um pouco mais com o pessoal. 🙂`
    )
  }

  if(!user.dice?.timestamp) {
    await UserModel.findOneAndUpdate({
      idUser: id,
    }, {
      $set: { dice: { timestamp: Date.now() - 60000 * 45 } }
    })

    return message.channel.send(
      `Opa parece que é sua primeira vez usando esse comando ${message.author}. ` + 
      'Salvei você no minha super memória fotográfica e você pode utilizar esse comando de novo para dropar sua carta. 🙂'
    )
  }

  if(Date.now() - user.dice!.timestamp > 60000 * 45) {
    const diceValue = RandomDice({ dice: "d20" });
    const card = await DiceToCard(Number(diceValue));

    await UserModel.findOneAndUpdate({
      idUser: id,
    }, {
      $push: { cards: card.idCard },
      $set: { dice: { timestamp: Date.now() } }
    })

    CardEmbed(message, { 
      color: '#F4F5FA', 
      title: `#${card.idCard} - ${capitalizeStr(card.name)}`,
      description: 
      `Anime: **${capitalizeStr(card.anime)}**\n` + 
      `Valor de venda: **${card.amount}** DTC <:DTC:965680653255446629>\n` +
      `Carta de: **${message.author.username}**`, 
      linkURL: card.linkURL
    }).then(msg => {
      msg.react('<:DTC:965680653255446629>')
      msg.channel.send(
        `🎲 Você tirou o número **${diceValue}** ${message.author.username} 🎲`
      )
    })
  } else {
    return message.channel.send(
      `Opa ${message.author}, seu d20 estará pronto daqui **${timestampToDate(60000 * 45 - (Date.now() - user?.dice.timestamp!))}**`
    )
  }
}