import { MessageEmbed } from 'discord.js';

import { ICommands } from '../types';

import { GachaSystem } from '../controller/GachaSystem';
import { GachaDaily } from '../controller/GachaSystem/gachaDaily';

export const command: ICommands = {
  name: 'gacha',
  description: 'Mostra os pacotes de cartas gacha',
  usage: '<package>',
  execute(message, args) {
    if(message.channel.type === 'dm') return;

    const embed = new MessageEmbed()

    if(args.length === 0) {
      embed
        .setColor('#FFD700')
        .setTitle('Teste sua sorte com cartinhas de anime 💰')
        .setDescription('Gaste seus xp points do servidor em um jogo gacha, onde você pode conseguir ainda mais pontos.\n⠀')
        .addFields(
          { name: '📦 1º pacote - Contêm um total de 5 cartas', value: 'Preço: **575xp points**' },
          { name: '📦 2º pacote - Contêm um total de 8 cartas', value: 'Preço: **960xp points**' },
          { name: '📦 3º pacote - Contêm um total de 12 cartas', value: 'Preço: **1425xp points**' },
          { name: '🌟 Pacote daily - Contêm um total de 3 cartas', value: '**1% de chance de conter carta lendária**' }
        )

      return message.channel.send(embed);
    }

    switch (args[0]) {
      case '1':
        GachaSystem(message, { amountValue: 575, amountCards: 5 })
        break;
      case '2': 
        GachaSystem(message, {  amountValue: 960, amountCards: 8 })
        break;
      case '3':
        GachaSystem(message, { amountValue: 1425, amountCards: 12 })
        break;
      case 'daily' || 'd':
        GachaDaily(message, 3)
        break;
    }
  }
}