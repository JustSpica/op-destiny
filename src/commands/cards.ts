import { MessageEmbed } from "discord.js";
import { CardEmbed } from "../components/CardEmbed";

import { CardsModel, CardsModelType } from "../db/models/CardsModel";
import { UserModel } from "../db/models/UsersModel";

import { capitalizeStr } from "../functions/capitalize";
import { pagination } from "../functions/pagination";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'cards',
  description: 'Lista todas as cartas que você possui.',
  usage: '<cardIndex>',
  execute: async (message, args) => {
    const idCard = args[0]

    let user = await UserModel.findOne({
      idUser: message.author.id,
    })

    if(!user) {
      return message.channel.send(
        `Ops! ${message.author}, parece que eu não tenho você cadastrado nesse sistema.`
      ).then(msg => msg.delete({ timeout: 6000 }));
    }

    let allCards = await CardsModel.find({});

    if(idCard) {
      const userCard = user.cards.find(item => item === idCard);

      if(!userCard) {
        return message.channel.send(
          `${message.author}, você não possui essa carta.`
        ).then(msg => msg.delete({ timeout: 6000 }));
      }

      const card = allCards.find(item => item.idCard === userCard);

      CardEmbed(message, {
        color: '#F4F5FA', 
        title: `#${card?.idCard} - ${capitalizeStr(String(card?.name))}`,
        description: 
          `Anime: **${capitalizeStr(String(card?.anime))}**\n` + 
          `Valor de venda: **${card?.amount}** DTC <:DTC:965680653255446629>`,
        linkURL: String(card?.linkURL)
      })
    } else {
      const cards: CardsModelType[] = [];

      for (let index = 0; index < user.cards.length; index++) {
        allCards.find(item => {
          if(item.idCard === user?.cards[index]) {
            return cards.push(item);
          }
        })
      }

      if(cards.length === 0) {
        return message.channel.send(
          `Ops! ${message.author}, você não possui nenhuma carta no seu inventário.`
        )
      }

      let totalAmount = 0;

      for (let index = 0; index < cards.length; index++) {
        totalAmount += cards[index].amount;
      }

      const embeds: MessageEmbed[] = []

      for (let index = 0; index < cards.length; index = index + 15) {
        const embed = new MessageEmbed();

        const newCards = cards.sort().slice(index, index + 15);

        embeds.push(
          embed
          .setColor('#F4F5FA')
          .setAuthor(
            `Cartas de ${message.author.username}`, 
            String(message.author.avatarURL({ 
              dynamic: true, 
              format: "png", 
              size: 1024 
            })))
          .setThumbnail(String(message.author.avatarURL({ 
            dynamic: true, 
            format: "png", 
            size: 1024 
          })))
          .setDescription(newCards.map(item => (
            `\n\n#${item.idCard}⠆ ${capitalizeStr(item.name)}: **${item.amount}** DTC <:DTC:965680653255446629>`
          )) + 
          `\n\n\nTotal de DTC: **${totalAmount} DTC** <:DTC:965680653255446629>`
          )
        )
      }

      return pagination(
        message, 
        { embeds, emojis: ['◀', '▶'], timeout: 60000 * 2 }
      );
    }
  }
}