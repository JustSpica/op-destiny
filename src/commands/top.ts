import { MessageEmbed } from "discord.js";

import { CardsModel } from "../db/models/CardsModel";

import { capitalizeStr } from "../functions/capitalize";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'top',
  description: 
    "Mostra as minhas 10 cartas mais valiosas",
  aliases: ['class', 'classCard', 'range'],
  execute: async (message, args) => {
    const allCards = await CardsModel.find({});

    allCards.sort((x , y) => {
      if(x.amount > y.amount) return -1;

      if(x.amount < y.amount) return 1;

      return 0;
    })

    const embeds = [];

    for (let index = 0; index < allCards.length; index = index + 10) {
      const embed = new MessageEmbed();

      embeds.push(
        embed
          .setColor('#F4F5FA')
          .setTitle(`Top 10 cartas do servidor`)
          .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
          .setThumbnail('https://i.imgur.com/lkMXyJ1.gif')
          .setDescription(allCards.map((item, index) => (
            `• ${index + 1} - ${capitalizeStr(item.name)}: ${item.amount} DTC <:DTC:965680653255446629>\n`
          )))
      )

    }

    const embed = new MessageEmbed();

    

      return message.channel.send(embed);
  }
}