import { UpgradeSystem } from "../controller/UpgradeSystem";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'upgrade',
  description: 'Comando usado para testar sua sorte com o novo sistema de upgrade',
  aliases: ['up'],
  usage: '<amount>',
  execute: async (message, args) => {
    if(message.channel.type === 'dm') return;

    const amount = Number(args[0]);

    UpgradeSystem(message, amount);
  }
}