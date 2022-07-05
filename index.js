require("dotenv").config();
const fetch = require("node-fetch");
const BOT_TOKEN = process.env.BOT_TOKEN;
const commands = require("./botCommands");
const slashCommands = require("./botSlashCommands");

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS"],
});

let day;
let randomNumber = Math.round(Math.random() * 178187);
async function getWord(randomNumber) {
  return fetch("https://random-word-api.herokuapp.com/all")
    .then((res) => res.json())
    .then((data) => data[randomNumber].toString())
    .then((str) => {
      return str;
    });
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //client.user.setAvatar("./LeakyBot.png");
  slashCommands.pingPong(client);
  slashCommands.addTwoNumbers(client);
  slashCommands.wordOfTheDay(client);
});

client.on("messageCreate", async (msg) => {
  if (msg.author === client.user) {
    return;
  }
  //Test
  if (msg.content === "ping") {
    msg.reply("pong!");
  }
  //Get All Commands
  if (msg.content === "/leaky-commands") {
    msg.reply(
      "**Random Number Generation** \n /random<*number*> \n " +
        "**Kick a random user from a channel** \n /kickRandomFrom<*ChannelName*> \n " +
        "**Clear the chat of a certain number of messages** \n /clearChat<*NumberOfMessages<=100*> \n" +
        "**Get the date** \n /date \n" +
        "**Get your ping to the discord API server** \n /realPing \n" +
        "**Play Rochambeau** \n /rochambeau \n" +
        "**Start a timer (Default is minutes. Add an *s* to time in seconds)** \n /timer<number> / <number + *s*> \n"
    );
  }
  //Get Ping to API server
  if (msg.content === "/realPing") {
    const ping = Date.now() - msg.createdTimestamp;
    msg.reply(`Your${ping}ms`);
  }
  //Get Date
  if (msg.content === "/date") {
    const date = new Date().toLocaleDateString();
    msg.reply(`The date is: ${date}`);
  }
  //Random Number Gen
  if (msg.content.includes("/random")) {
    commands.randomNumberGen(msg);
  }
  //Kick to a channel
  if (msg.content.includes("/kickRandomFrom")) {
    const defaultKickChannel = "987756923409551401";
    const dabberAFKChannel = "517779993254952960";
    commands.kickRoulette(client, msg, dabberAFKChannel);
  }
  //Clear chat messages
  if (msg.content.includes("/clearChat")) {
    const amount = msg.content.substring(10);
    try {
      await msg.channel.bulkDelete(amount);
    } catch (e) {
      msg.reply(e.message);
    }
  }
  //Rock Paper Scissors
  if (msg.content === "/rochambeau") {
    await commands.rochambeau(msg);
  }
  //Timer
  if (msg.content.includes("/timer")) {
    const time = msg.content.substring(6);
    commands.timer(time, msg);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "guessword") {
    const guessPrompt = options.getString("word") || "";
    const guessLetters = guessPrompt.toLowerCase().trim().split("");

    async function word(randomNumber) {
      const dailyWord = await getWord(randomNumber);
      console.log(dailyWord);

      let wordExists;

      fetch("https://random-word-api.herokuapp.com/all")
        .then((res) => res.json())
        .then((data) => () => {
          if (data.includes(dailyWord)) {
            wordExists = true;
          }
        });

      if (wordExists) {
        if (guessPrompt.toLowerCase().trim() === dailyWord) {
          interaction.reply({
            content: `Well Done, you guessed correctly! The word of the day is ${dailyWord} :grin:`,
          });
        } else {
          const wordLetters = dailyWord.split("");
          const commonLetters = [];
          wordLetters.forEach((element) => {
            if (guessLetters.includes(element)) {
              commonLetters.push(element);
            }
          });

          if (commonLetters.length === 0) {
            interaction.reply({
              content: `Your guess ${guessPrompt} contained no correct letters :upside_down:`,
            });
          } else {
            interaction.reply({
              content: `Your guess ${guessPrompt} contained the following correct letters: ${commonLetters.join(
                ","
              )}. \n Hint: The word of the day is ${
                dailyWord.length
              } letters long.`,
            });
          }
        }
      } else {
        interaction.reply({
          content:
            "Sorry, that word doesn't exist in my dictionary :upside_down:",
        });
      }
    }

    let currentDay = new Date().getDay().toString();

    if (currentDay != day) {
      randomNumber = Math.round(Math.random() * 178187);
      word(randomNumber);
      day = currentDay;
    } else {
      word(randomNumber);
    }
  }

  if (commandName === "add") {
    const num1 = options.getNumber("num1") || 0;
    const num2 = options.getNumber("num2") || 0;

    await interaction.deferReply({
      ephemeral: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    await interaction.editReply({
      content: `The sum is ${num1 + num2}.`,
    });
  }
});

//client.on("debug", (e) => console.log(e));
client.login(BOT_TOKEN);
