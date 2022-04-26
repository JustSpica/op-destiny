import { MessageEmbed } from "discord.js";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'dropList',
  description: 'Mostra a lista de pacotes que podem ser comprados',
  execute(message, args) {
    if(message.channel.type === 'dm') return;

    const embed = new MessageEmbed();

    embed
      .setColor('#F4F5FA')
      .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
      .setTitle('Lista com o drop de pacotes do servidor')
      .setDescription(
        '📦 **#1 pacote⠆ Contêm um total de 1 drop de cartas**\n' +
        'Preço de compra: **120 DTC**\n\n' + 
        '🕜 **Pacote daily⠆ Pacote de 5 cartas que pode ser aberto todo dia**\n' +
        '**Gratuito**\n\n'
      )

    return embed;
  }
}