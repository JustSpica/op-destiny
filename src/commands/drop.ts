import { DropSystem } from "../controller/DropSystem";
import { DropSystemDaily } from "../controller/DropSystemDaily";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'drop',
  description: 'Comando usado para dropar cartas em um canal de texto',
  usage: '<cardsId>',
  execute: async (message, args) => {
    if(message.channel.type === 'dm') return;

    const cardOption = args[0]

    switch(cardOption) {
      case '1': 
        DropSystem(message, { amount: 525, cardsNumber: 3 });
        break;
      case '2': 
        DropSystem(message, { amount: 975, cardsNumber: 5 });
        break;
      case 'd':
      case 'daily':
        DropSystemDaily(message, 3)
        break;
      case 'b':
      case 'bonus':
        DropSystem(message, { amount: 780, cardsNumber: 1, limitedTime: true });
        break;
      default:
        message.channel.send('Ops! Não consegui achar essa opção. 😞')
          .then(msg => msg.delete({ timeout: 6000 }));
        break;
    }
  }
}