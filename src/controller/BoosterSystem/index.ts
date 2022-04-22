import { Message } from "discord.js";
import { CardEmbed } from "../../components/CardEmbed";
import { UserModel ,IUserModel } from "../../db/models/UsersModel";
import { capitalizeStr } from "../../functions/capitalize";
import { timestampToDate } from "../../functions/convertDate";

import { getBoosterTiers } from "../../utils/GetBoosterTiers";
import { getCards } from "../../utils/GetCards";

export const BoosterSystem = async (message: Message) => {
  const { id } = message.author;
  const member = message.guild?.members.cache.get(id)

  const boosterRole = member?.roles.cache.find(item => item.name === 'Boosters');

  if(!boosterRole) {
    return message.channel.send(
      `${message.author}, esse pacote é apenas para boosters do servidor...\n\n` + 
      `Mas por apenas R$18 por mês, você consegue esse benefício. 😁`
    )
  }

  let user: IUserModel | null = await UserModel.findOne({
    idUser: message.author.id,
  })

  if(!user) {
    return message.channel.send(
      `Ops! ${message.author} não consegui achar você na minha lista. ` + 
      `Tente interagir um pouco mais com o pessoal. 🙂`
    )
  }

  if(!user.boosterTime) {
    await UserModel.findOneAndUpdate({
      idUser: id,
    }, {
      $set: {
        boosterTime: Date.now() - 60000 * 60 * 6,
      }
    })
  }

  if(!user.boosterTime || Date.now() - user?.boosterTime! > 60000 * 60 * 6) {
    const tiers = getBoosterTiers(1);
    const cards = await getCards(tiers);  
    const cardsId = cards.map(item => item.idCard)

    await UserModel.findOneAndUpdate({
      idUser: message.author.id,
    }, {
      $push: { cards: cardsId },
      $set: { boosterTime: Date.now() }
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
      `Olá ${message.author}, sinto lhe informar mas o seu divino bonus não se encontra disponivel. 🧐\n` + 
      `**Restante:** ${timestampToDate(60000 * 60 * 6 - (Date.now() - user?.boosterTime!))}`
    ).then(msg => msg.delete({ timeout: 6000 }))
  }
}