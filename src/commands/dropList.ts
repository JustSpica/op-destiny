import { GeneralEmbed } from "../components/GeneralEmbed";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'dropList',
  description: 'Mostra a lista de pacotes que podem ser comprados',
  execute(message, args) {
    if(message.channel.type === 'dm') return;
    
    return GeneralEmbed(message, {
      color: '#F4F5FA',
      title: 'Lista com o drop de pacotes do servidor',
      description: 
        'Gaste seus xp points no servidor e tente a sorte para conseguir ainda mais pontos.\n\n' + 
        '📦 **#1 pacote⠆ Contêm um total de 1 drop de cartas**\n' +
        'Preço de compra: **180 DTC**\n\n' + 
        '🕜 **Pacote daily⠆ Pacote de 5 cartas que pode ser aberto todo dia**\n' +
        '**Gratuito**\n\n'
    })
  }
}