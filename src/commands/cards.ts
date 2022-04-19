import { MessageEmbed } from "discord.js";
import { CardEmbed } from "../components/CardEmbed";

import { CardsModel, CardsModelType } from "../db/models/CardsModel";
import { UserModel } from '../db/models/UsersModel';

import { capitalizeStr } from "../functions/capitalize";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'cards',
  description: 
    "Lista todas as cartas que você possui.",
  aliases: ['myCards'],
  usage: '<cardIndex>',
  execute: async (message, args) => {
    if(message.channel.type !== 'dm') return;

    const cardId = args[0];
    const embed = new MessageEmbed()

    let userActive = await UserModel.findOne({
      idUser: message.author.id,
    })

    if(!userActive) {
      return message.channel.send(
        `Ops! ${message.author}, eu não tenho você cadastrado nesse sistema. ` + 
        `Você precisa girar alguns pacotes de cartas para usar esse comando. 🙂`
      ).then(msg => msg.delete({ timeout: 6000 }));
    }

    let allCards = await CardsModel.find({})

    if(!cardId) {
      const cardsArr: CardsModelType[]  = [];

      for (let index = 0; index < userActive.cards.length; index++) {
        const cardSelected = allCards.find(item => 
          item.idCard === userActive?.cards[index]
        )

        cardsArr.push(cardSelected as CardsModelType);
      }

      if(cardsArr.length === 0) {
        embed
          .setColor('#F4F5FA')
          .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
          .setThumbnail(String(message.author.avatarURL({ 
            dynamic: true, 
            format: "png", 
            size: 1024 
          })))
          .setDescription(
            `Opa ${message.author}, você não possui nenhuma carta no seu inventário. ` + 
            `Experimente girar algum pacote para conseguir mais cartas. 🙂`
          )

        return message.channel.send(embed);
      }

      let totalXP = 0;

      for (let index = 0; index < cardsArr.length; index++) {
        const cardValue = cardsArr[index].amount

        totalXP += cardValue;
      }

      embed
        .setColor('#F4F5FA')
        .setTitle(`Essas são suas cartas ${message.author.username} 😊`)
        .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
        .setThumbnail(String(message.author.avatarURL({ 
          dynamic: true, 
          format: "png", 
          size: 1024 
        })))
        .setDescription('utilize `op!cards <id>` para ver sua carta 😀.\n'+ 
          cardsArr.map(item => (
            `\n#${item.idCard}⠆ ${capitalizeStr(item.name)}: **${item.amount}** DTC <:DTC:965680653255446629>`
          )) + `\n\n\nTotal: **${totalXP}** DTC <:DTC:965680653255446629>`
        )

      return message.channel.send(embed);
    } else {
      const newCardId = userActive.cards.find(item => item === cardId)
      
      if(!newCardId) return

      const card = allCards.find(item => item.idCard === newCardId);

      if(!card) return;

      CardEmbed(message, { 
        color: '#F4F5FA', 
        title: `#${card.idCard} - ${capitalizeStr(String(card.name))}`,
        description: 
          `Anime: **${capitalizeStr(String(card.anime))}**\n` + 
          `Valor de venda: **${card.amount}** DTC <:DTC:965680653255446629>`,
        linkURL: String(card.linkURL)
      })
    }
  }
}