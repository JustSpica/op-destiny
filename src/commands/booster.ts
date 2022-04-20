import { BoosterSystem } from "../controller/BoosterSystem";
import { ICommands } from "../types";

export const command: ICommands = {
  name: 'booster',
  description: 'Vai lá, esnobe com sua riqueza utilizando esse pacote exclusivo de boosters. 🤑',
  execute: async (message, args) => {
    if(message.channel.type === 'dm') return;

    if(message.channel.id !== '952779254960107580') return;

    BoosterSystem(message);
  }
}