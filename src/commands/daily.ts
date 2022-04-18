import { DropSystemDaily } from "../controller/DropSystemDaily";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'daily',
  description: 'Comando usado para pegar seu pacote diário de cartas',
  execute: async (message, args) => {
    if(message.channel.type === 'dm') return;

    if(message.channel.id !== '952779254960107580') return;
    
    if(args.length !== 0) return;

    DropSystemDaily(message, 5)
  }
}