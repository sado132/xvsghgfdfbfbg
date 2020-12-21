const Discord = require("discord.js");//Lexar
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has("770898726977273868"))return;
   let user = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id)
  );
  
  if (!user.roles.cache.has("770898726977273868"))return message.channel.send('Belirtilen Kullanıcının Yetkisi Yok!')
  
  let erkek = db.fetch(`erkek-puan_${message.guild.id}_${user.id}`)
  let kadın = db.fetch(`kadın-puan_${message.guild.id}_${user.id}`)
  let isim = db.fetch(`isim-puan_${message.guild.id}_${user.id}`)
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`${user} yetkilisinin bilgileri`)
  .addField('Kayıt Ettiği Erkek Kullanıcı Sayısı;', erkek || '0')
  .addField('Kayıt Ettiği Kadın Kullanıcı Sayısı;', kadın || '0')
  .addField('Değiştirdiği İsim Sayısı;', isim || '0')
  .setFooter(user.id, user.user.avatarURL() || client.user.avatarURL())
  .setThumbnail(user.user.avatarURL() || client.user.avatarURL())
  message.channel.send(embed)
          
    }

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["a"],
  permLevel: 0
};

module.exports.help = {
  name: 'admin',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'komutlar'
};