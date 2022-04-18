import { Message } from 'discord.js'

import { CardEmbed } from '../../components/CardEmbed';

import { IUserModel, UserModel } from '../../db/models/UsersModel';

import { capitalizeStr } from '../../functions/capitalize';
import { timestampToDate } from '../../functions/convertDate';

import { getCards } from '../../utils/GetCards';
import { getTiersDaily } from '../../utils/GetTiersDaily';

export const DropSystemDaily = async (message: Message, cardsNumber: number) => {
  let user: IUserModel | null = await UserModel.findOne({
    idUser: message.author.id,
  })

  if(!user) {
    return message.channel.send(
      `Ops! ${message.author} não consegui achar você na minha lista. ` + 
      `Tente interagir um pouco mais com o pessoal. 🙂`
    )
  }

  if(Date.now() - user.timestamp > 86400000) {
    const tiers = getTiersDaily(cardsNumber);
    const cards = await getCards(tiers);
    const cardsId = cards.map(item => item.idCard)

    await UserModel.findOneAndUpdate({
      idUser: message.author.id,
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
          `Valor de venda: **${item.amount}** DTC <:DTC:965680653255446629>`,
        linkURL: item.linkURL
      }).then(msg => msg.react('<:DTC:965680653255446629>'))
    })
  } else {
    message.channel.send(
      `${message.author} seu pacote daily ainda não está disponivel.\n` + 
      `**Restante:** ${timestampToDate(86400000 - (Date.now() - user.timestamp))}`
    ).then(msg => msg.delete({ timeout: 8000 }))
  }
}