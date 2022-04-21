import { Client } from 'discord.js';

import { DropInterval } from '../controller/DropInterval';

import { prefix } from '../../config.json';

export const event = {
  name: 'ready',
  on: true,
  execute(client: Client) {
    console.log(`Bot ${client.user?.tag} is running!`)

    client.user?.setActivity(`${prefix}help 📕`, {
      type: "PLAYING"
    });

    DropInterval(client)
  }
}