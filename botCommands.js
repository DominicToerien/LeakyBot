function randomNumberGen(msg) {
  const number = msg.content.charAt(msg.content.length - 1);
  let lastNumber = msg.content.charAt(msg.content.length - 1);
  let secondLastNumber = msg.content.charAt(msg.content.length - 2);
  if (
    !isNaN(lastNumber) &&
    !isNaN(secondLastNumber) &&
    msg.content.length === 9
  ) {
    msg.reply(
      `Random number: ${Math.round(
        Math.random() * (secondLastNumber + lastNumber - 1) + 1
      )}`
    );
  } else if (!isNaN(number) && msg.content.length === 8) {
    msg.reply(`Random number: ${Math.round(Math.random() * (number - 1) + 1)}`);
  } else {
    msg.reply('Please add a number <= 99 to the end of the command: "/random"');
    msg.react("🖕🏻");
  }
}

function kickRoulette(client, msg, kickChannel) {
  const channelMembers = [];
  client.channels.cache
    .filter((c) => c.name.toLowerCase().replace(/\s/g, '') === msg.content.substring(15).toLowerCase().replace(/\s/g, ''))
    .forEach((channel) => {
      channel.fetch().then((channel) => {
        for (let [snowflake, guildMember] of channel.members) {
          channelMembers.push(guildMember.id);
          const participants = channelMembers.length;
          const luckyNumber = Math.round(Math.random() * participants);
          const luckyId = channelMembers[luckyNumber];
          console.log(luckyId);
          if (guildMember.id === luckyId) {
            guildMember.voice.setChannel(kickChannel);
            msg.reply(
              `${guildMember.displayName} has been moved out of the channel :pleading_face:`
            );
          }
        }
      });
    });
}

async function rochambeau(msg) {
  const filter = (message) => message.author.id === msg.author.id;
  const filter2 = (message) => message.author.id != msg.author.id;

  const collector = msg.channel.createMessageCollector(filter, {
    max: 1,
    time: 3000,
    dispose: true,
  });

  const collector2 = msg.channel.createMessageCollector(filter2, {
    max: 1,
    time: 5000,
    dispose: true,
  });

  await msg.reply(
    'To play, make sure to add "||" to the beginning and end of your chosen weapon.\nPlayer 1 choose rock, paper or scissors...'
  );

  collector.on("collect", async (collected) => {
    if (collected.content.trim().toLowerCase() === "||rock||") {
      await msg.reply("Player 2 please choose rock, paper or scissors...");
      collector.stop();

      collector2.on("collect", async (collected) => {
        if (collected.content.trim().toLowerCase() === "||rock||") {
          await msg.reply("It's a draw!");
        } else if (collected.content.trim().toLowerCase() === "||paper||") {
          await msg.reply("Paper covers rock, player 2 wins!");
        } else if (collected.content.trim().toLowerCase() === "||scissors||") {
          await msg.reply("Rock smashes scissors, player 1 wins!");
        }
      });
    } else if (collected.content.trim().toLowerCase() === "||paper||") {
      await msg.reply("Player 2 please choose rock, paper or scissors...");
      collector.stop();

      collector2.on("collect", async (collected) => {
        if (collected.content.trim().toLowerCase() === "||rock||") {
          await msg.reply("Paper cover rock, player 1 wins!");
        } else if (collected.content.trim().toLowerCase() === "||paper||") {
          await msg.reply("Its' a draw!");
        } else if (collected.content.trim().toLowerCase() === "||scissors||") {
          await msg.reply("Scissors cut paper, player 2 wins!");
        }
      });
    } else if (collected.content.trim().toLowerCase() === "||scissors||") {
      await msg.reply("Player 2 please choose rock, paper or scissors...");
      collector.stop();

      collector2.on("collect", async (collected) => {
        if (collected.content.trim().toLowerCase() === "||rock||") {
          await msg.reply("Rock smashes scissors, player 2 wins!");
        } else if (collected.content.trim().toLowerCase() === "||paper||") {
          await msg.reply("Scissors cut paper, player 1 wins!");
        } else if (collected.content.trim().toLowerCase() === "||scissors||") {
          await msg.reply("Scissors scissor scissors... It's a draw!");
        }
      });
    }
  });
}

function timer(time, msg) {
  if (time[time.length - 1] === "s".toLowerCase().trim()) {
    const toSeconds = time.slice(0, -1);
    const seconds = toSeconds * 1000;
    setTimeout(() => {
      msg.reply(`${seconds / 1000} seconds have passed!`);
    }, seconds);
  } else {
    const minutes = time * 60000;
    setTimeout(() => {
      msg.reply(`${minutes / 60000} minutes have passed!`);
    }, minutes);
  }
}

module.exports = { randomNumberGen, kickRoulette, rochambeau, timer };