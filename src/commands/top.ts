import { MessageEmbed } from "discord.js";

import { CardsModel } from "../db/models/CardsModel";

import { capitalizeStr } from "../functions/capitalize";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'top',
  description: 
    "Mostra as minhas 10 cartas mais valiosas",
  aliases: ['r'],
  execute: async (message, args) => {
    const allCards = await CardsModel.find({});

    allCards.sort((x , y) => {
      if(x.amount > y.amount) return -1;

      if(x.amount < y.amount) return 1;

      return 0;
    }).splice(10)

    const embed = new MessageEmbed();

    embed
      .setColor('#F4F5FA')
      .setTitle(`Top 10 cartas do servidor`)
      .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
      .setThumbnail('https://i.imgur.com/lkMXyJ1.gif')
      .setDescription(allCards.map((item, index) => (
        `• ${index + 1} - ${capitalizeStr(item.name)}: ${item.amount} DTC <:DTC:965680653255446629>\n`
      )))

      return message.channel.send(embed);
  }
}