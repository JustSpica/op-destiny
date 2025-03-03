import { DropSystem } from "../controller/DropSystem";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'drop',
  description: 'Comando usado para dropar cartas em um canal de texto',
  execute: async (message, args) => {
    if(message.channel.type === 'dm') return;

    if(message.channel.id !== '952779254960107580') return;

    DropSystem(message, { amount: 165, cardsNumber: 1 });
  }
}