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
          { name: '📦 1º pacote - Contêm um total de 5 cartas', value: 'Preço: **565xp points**' },
          { name: '📦 2º pacote - Contêm um total de 8 cartas', value: 'Preço: **980xp points**' },
          { name: '📦 3º pacote - Contêm um total de 10 cartas', value: 'Preço: **1520xp points**' },
          { name: '🌟 Pacote daily - Contêm um total de 3 cartas', value: '**1% de chance de conter carta lendária**' }
        )

      return message.channel.send(embed);
    }

    switch (args[0]) {
      case '1':
        GachaSystem(message, { amountValue: 565, amountCards: 5 })
        break;
      case '2': 
        GachaSystem(message, {  amountValue: 980, amountCards: 8 })
        break;
      case '3':
        GachaSystem(message, { amountValue: 1520, amountCards: 10 })
        break;
      case 'daily':
        GachaDaily(message, 3)
        break;
    }
  }
}