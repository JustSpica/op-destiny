import { DiceSystem } from "../controller/DiceSystem";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'dice',
  description: 'Comando usado para rolar um d20 e dropar uma carta aleatória',
  aliases: ['dices', 'dado', 'dados', 'd'],
  execute(message, args) {
    if(message.channel.type === 'dm') return;

    if(message.channel.id !== '952779254960107580') return;
    
    DiceSystem(message);
  }
}