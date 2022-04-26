import { MessageEmbed } from "discord.js";
import { UpgradeSystem } from "../controller/UpgradeSystem";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'upgrade',
  description: 'Comando usado para transformar 3 cartas iguais em 1 carta aleatória de tier superior',
  aliases: ['up'],
  usage: '<idCard>',
  execute: async (message, args) => {
    if(message.channel.type === 'dm') return;

    const idCard = args[0];

    if(!idCard) {
      return message.channel.send(
        `Ops! ${message.author}, você precisa informar o id de uma carta que você tenha no ` + 
         `seu inventário.`
      )
    }

    UpgradeSystem(message, idCard);
  }
}