import { MessageEmbed } from "discord.js";
import { CardEmbed } from "../components/CardEmbed";

import { CardsModel, CardsModelType } from "../db/models/CardsModel";
import { UserModel } from '../db/models/UsersModel';

import { capitalizeStr } from "../functions/capitalize";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'top',
  description: 
    "Mostra os 10 cards mais valiosos do servidor",
  aliases: ['r'],
  execute: async (message, args) => {
    const allCards = await CardsModel.find({}).sort({ amount: -1 }).limit(10);

    const embed = new MessageEmbed();

    embed
      .setColor('#F4F5FA')
      .setTitle(`Top 10 cartas do servidor`)
      .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
      .setThumbnail('https://i.imgur.com/lkMXyJ1.gif')
      .setDescription(allCards.map((item, index) => (
        `• ${index + 1} - ${capitalizeStr(item.name)}: ${item.amount} DTC <:DTC:965680653255446629>\n\n`
      )))

  }
}