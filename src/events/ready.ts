import { Client } from 'discord.js';

import { prefix } from '../../config.json';

export const event = {
  name: 'ready',
  once: true,
  execute(client: Client) {
    console.log(`Bot ${client.user?.tag} is running!`)

    client.user?.setActivity(`${prefix}help 📕`, {
      type: "PLAYING"
    });
  }
}