const Discord = require("discord.js");//Lexar
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
  
module.exports.run = async (client, message, args) => {
   
  
  if (!message.member.roles.cache.has("787079965803806760")) //register krdşm
    return message.channel.send("Bu komutu kullanabilmek için kayıt yetkilisi olmalısın.");
  
  let user = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  if(!user) return message.channel.send('__**HATA!**__ Doğru Kullanım; `.e <üye> <isim> <yaş>`')
  let isim = args[1]
  let yaş = args[2]
  if(!isim) return message.channel.send('__**HATA!**__ Doğru Kullanım; `.e <üye> <isim> <yaş>`')
    if(!yaş) return message.channel.send('__**HATA!**__ Doğru Kullanım; `.e <üye> <isim> <yaş>`')
  
  let erkek = '787079965753212943' //erkek 1. rol
  let erkek2 = '787079965753212941'// erkek 2. rol
  let kayıtsız = '787079965753212940'//kayıtsız rol
  let yetkili = message.guild.members.cache.get(message.author.id)
  
  user.roles.add(erkek)
  user.roles.add(erkek2)
  user.roles.remove(kayıtsız)
  db.add(`erkek-puan_${message.guild.id}_${message.author.id}`, 1)
  
  const embed = new Discord.MessageEmbed()
.setDescription(`**${user} Adlı Kullanıcı Başarıyla Erkek Olarak Kayıt Edildi!
Kayıt Eden Yetkili; ${yetkili}
Kayıt Edilen Kullanıcı İsmi; \`${isim} | ${yaş}\`
Verilen Roller;** <@&${erkek}> <@&${erkek2}>**
Alınan Rol;** <@&${kayıtsız}>`);
  
  message.channel.send(embed)
  message.guild.channels.cache.get("789045366800384020").send(embed)//kayıt log
  message.guild.channels.cache.get("787079966410932252").send(`${user} Adlı Kullanıcı Aramıza Katıldı!**`)//general chat ıd

  
  user.setNickname(`✰ ${isim} | ${yaş}`)
}



module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e"],
  permLevel: 0
};

module.exports.help = {
  name: 'erkek',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'komutlar'
};