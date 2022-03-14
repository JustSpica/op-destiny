import { Collection, Client } from 'discord.js';
import { readdirSync } from 'fs';
import mongoose from 'mongoose';

import { token, dataBaseConnectionString } from '../config.json';

import { ICommands } from './types';

export const client: Client = new Client();

const commands: Collection<string, ICommands> = new Collection();

const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
  const { command } = require(`./commands/${file}`);

  commands.set(command.name, command);
}

const eventFiles = readdirSync('./src/events').filter(file => file.endsWith('.ts'));

for (const file of eventFiles) {
  const { event } = require(`./events/${file}`);

  if(event.once) {
    client.once(event.name, (...args) => event.execute(...args, client, commands));
  }

  if(event.on) {
    client.on(event.name, (...args) => event.execute(...args, client, commands));
  }
}

mongoose.connect(dataBaseConnectionString).then(() => {
  console.log("Connection with database success!");
})

client.login(token);