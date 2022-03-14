import { Client } from 'discord.js';

export const event = {
  name: 'ready',
  once: true,
  execute(client: Client) {
    console.log(`Bot ${client.user?.tag} is running!`)
  }
}