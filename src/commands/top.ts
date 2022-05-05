import { MessageEmbed } from "discord.js";

import { CardsModel } from "../db/models/CardsModel";

import { capitalizeStr } from "../functions/capitalize";
import { pagination } from "../functions/pagination";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'top',
  description: 
    "Mostra o rank de todas as cartas do servidor",
  aliases: ['class', 'classCard', 'range'],
  execute: async (message, args) => {
    const allCards = await CardsModel.find({});

    allCards.sort((x , y) => {
      if(x.amount > y.amount) return -1;

      if(x.amount < y.amount) return 1;

      return 0;
    });

    const embeds = [];

    for (let index = 0; index <= allCards.length; index = index + 15) {
      const embed = new MessageEmbed();

      const cards = allCards.slice(index, index + 15);

      embeds.push(
        embed
          .setColor('#F4F5FA')
          .setTitle('🏆 Top 100 cards')
          .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
          .setThumbnail('https://i.imgur.com/lkMXyJ1.gif')
          .setDescription(cards.map(item => {     
            const index = allCards.findIndex(element => element.idCard === item.idCard);

            return `#${index + 1} - ${capitalizeStr(item.name)}: ${item.amount} DTC <:DTC:965680653255446629>\n`
          }))
          
      )
    }

    return pagination(message, { embeds, emojis: ['◀', '▶'], timeout: 60000 * 2 });
  }
}