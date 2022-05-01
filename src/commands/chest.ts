import { ChestSystem } from "../controller/ChestSystem";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'chest',
  description: "Usado para abrir um baú tier 5 ou tier 6 com suas chaves",
  usage: "<shade or spirit>",
  execute: async (message, args) => {
    const key = args[0].toLowerCase();

    if(!key) {
      return message.channel.send(
        `${message.author}, qual chave você deseja usar ? Fale para mim 🙂`
      ).then(msg => msg.delete({ timeout: 6000 }))
    }

    switch (key) {
      case 'shade':
        ChestSystem(message, 6, 1)
        break;
      case 'spirit':
        ChestSystem(message, 5, 2)
        break;
      default:
        message.channel.send(
          `Ops! parece que essa chave não existe ${message.author}`
        ).then(msg => msg.delete({ timeout: 6000 }))
        break;
    }
  }
}