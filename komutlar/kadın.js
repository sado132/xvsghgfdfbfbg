const Discord = require("discord.js");//Lexar
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
  
module.exports.run = async (client, message, args) => {
   
  
  if (!message.member.roles.cache.has("770898726977273868"))//register
    return message.channel.send("Bu komutu kullanabilmek için `Kayıt Yetkilisi` olmalısın.");
  
  let user = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  if(!user) return message.channel.send('__**HATA!**__ Doğru Kullanım; `.k <üye> <isim> <yaş>`')
  let isim = args[1]
  let yaş = args[2]
  if(!isim) return message.channel.send('__**HATA!**__ Doğru Kullanım; `.k <üye> <isim> <yaş>`')
    if(!yaş) return message.channel.send('__**HATA!**__ Doğru Kullanım; `.k <üye> <isim> <yaş>`')
  
  let kız = '770898524832792586'//kız rol 1.
  let kız2 = '771071927430152243'//kız rol 2.
  let kayıtsız = '770898766047084545'//kayıtsız 
  let yetkili = message.guild.members.cache.get(message.author.id)
  
  user.roles.add(kız)
  user.roles.add(kız2)
  user.roles.remove(kayıtsız)
  db.add(`kadın-puan_${message.guild.id}_${message.author.id}`, 1)
  
  const embed = new Discord.MessageEmbed()
.setDescription(`**${user} Adlı Kullanıcı Başarıyla Kadın Olarak Kayıt Edildi!
Kayıt Eden Yetkili; ${yetkili}
Kayıt Edilen Kullanıcı İsmi; \`TAG ${isim} | ${yaş}\`
Verilen Roller; **<@&${kız}> <@&${kız2}>**
Alınan Rol;** <@&728337604231168145>`);
  
  message.channel.send(embed)
  message.guild.channels.cache.get("770268310759145473").send(embed)//kayıt kanal log
  message.guild.channels.cache.get("770251305331195916").send(`**${client.emojis.cache.get('tik')} ${user} **Adlı Kullanıcı Aramıza Katıldı!**`)//general chat ıd
  
  user.setNickname(`✰ ${isim} | ${yaş}`)
  
    }

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k", "kadın"],
  permLevel: 0
};

module.exports.help = {
  name: 'kız',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'komutlar'
};