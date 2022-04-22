import { TradeSystem } from "../controller/TradeSystem";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'trade',
  description: 'Comando usado para abrir uma trade com um usuário especifico',
  aliases: ['trocar'],
  usage: '<userToTrade> <cardId> <amount>',
  execute: async (message, args, client) => {
    if(message.channel.type === 'dm') return;

    if(message.channel.id !== '967114395958276186') return;
    
    const idUserTarget = args[0].slice(2).replace('>', '');
    const idCard = args[1];
    const amount = Number(args[2]);

    TradeSystem(message, { amount, idCard, idUserTarget })
  }
}