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
        '📦 **#1 pacote⠆ Contêm um total de 5 drop de cartas**\n' +
        'Preço de compra: **750xp points**\n\n' + 
        '📦 **#2 pacote⠆ Contêm um total de 8 drop de cartas**\n' + 
        'Preço de compra: **1450xp points**\n\n' + 
        '🕜 **Pacote daily⠆ Pacote de 3 cartas que pode ser aberto todo dia**\n' +
        '**Gratuito** (Chances maiores de high drop)\n\n' + 
        '🌟 **#Bonus: Pacote só com drop de carta acima de tier 4. Apenas uma carta**\n' + 
        'Preço de compra: **1950xp points**\n' + 
        '**TEMPO LIMITADO: até 30/03**'
    })
  }
}