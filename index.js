require("dotenv").config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const commands = require("./botCommands");

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setAvatar("./LeakyBot.png");
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


console.log(Math.round(Math.random() * 3))
//client.on("debug", (e) => console.log(e));
client.login(BOT_TOKEN);
