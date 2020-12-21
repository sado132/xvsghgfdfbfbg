const Discord = require('discord.js');
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json")

module.exports.run = async (bot, message, args) => { 
    if(message.author.id !== ayarlar.sahip)  return message.channel.send("Bu Komutu Sadece Sahibim Kullanabilir")
     
    message.channel.sendMessage(`Yeniden Başlatma Onaylandı ✅ `)
      message.delete(60).then(msg => {

    console.log(`Bot yeniden başlatılıyor`);

    process.exit(0);
  })
     
           
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'reboot',
  description: 'CodeWorld',
  usage: 'reboot'
}; 