const fetch = require("node-fetch");

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS"],
});

const gymGuildId = "755500547053977690";
const R_H_C_D_GuildId = "462236676820041729";
const testGuildId = "969901883667939328";
const testGuild = client.guilds.cache.get(testGuildId);
const R_H_C_D_Guild = client.guilds.cache.get(R_H_C_D_GuildId);
const gymGuild = client.guilds.cache.get(gymGuildId);

let commands;

function pingPong(client) {
  if (gymGuild) {
    commands = guild.commands;
  } else {
    commands = client.application.commands;
  }

  commands.create({
    name: "ping",
    description: "Replies with pong.",
  });
}

function addTwoNumbers(client) {
  if (testGuild || R_H_C_D_Guild || gymGuild) {
    commands = guild.commands;
  } else {
    commands = client.application.commands;
  }

  commands.create({
    name: "add",
    description: "Add two numbers.",
    options: [
      {
        name: "num1",
        description: "The first number.",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: "num2",
        description: "The second number.",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
    ],
  });
}

function wordOfTheDay(client) {
  if (testGuild) {
    commands = guild.commands;
  } else {
    commands = client.application.commands;
  }

  commands.create({
    name: "guessword",
    description: "Try and guess the word of the day!",
    options: [
      {
        name: "word",
        description: "Your Guess",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  });
}

function wordOfTheDayDabbers(client) {
  if (R_H_C_D_Guild) {
    commands = guild.commands;
  } else {
    commands = client.application.commands;
  }

  commands.create({
    name: "guessword",
    description: "Try and guess the word of the day!",
    options: [
      {
        name: "word",
        description: "Your Guess",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  });
}

function wordOfTheDayGym(client) {
  if (gymGuild) {
    commands = guild.commands;
  } else {
    commands = client.application.commands;
  }

  commands.create({
    name: "guessword",
    description: "Try and guess the word of the day!",
    options: [
      {
        name: "word",
        description: "Your Guess",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  });
}

module.exports = {
  pingPong,
  addTwoNumbers,
  wordOfTheDay,
  wordOfTheDayDabbers,
  wordOfTheDayGym,
};
