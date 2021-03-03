const Discord = require('discord.js');
const Games = require('./games.json');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.substring(0, 1) == '!') {
    var args = msg.content.substring(1).split(' ');
    var cmd = args[0];

    switch (cmd) {
      case "pim":
        msg.react('🤡');  
        break;
      case "eudiwtf":
        msg.channel.send(msg.author.username + " payaso, toma pesadillas", {files: ["https://i.imgur.com/m7PxS2T.png"]});
        break;
      case "chicote":
        msg.channel.send(msg.author.username + ", Chichote duda de tu sexualidad :S", {files: ["https://www.ecestaticos.com/image/clipping/ce865ca0e61c4a7988e07c8964517348/chicote-ninguneado-en-pesadilla-en-la-cocina-me-haces-sentir-como-una-mierda.jpg"]});
        break;
      case "loconejo":
        msg.channel.send("", {files: ["https://img.imgur.com/BcWH95t.gif"]});
        break;
      case "saltaloconejo":
        msg.react('🐰');  
        break;
      case "games":
        msg.channel.reply("Current games:")       
        break;
      default:
        break;
    }
  }
});

client.login(process.env.token);