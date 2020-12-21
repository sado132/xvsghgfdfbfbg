const Discord = require("discord.js");//lEXAR
/*
<a:bir:728654763855446087>
<a:iki:728654765202079864>
  <a:uc:728654765092765846>
    <a:dort:728654764916736030>
      <a:bes:728654765969637436>
        <a:alti:728654765285834922>
          <a:yedi:728654766154186812>
            <a:sekiz:728654766246461501>
              <a:dokuz:728654765780762636>
                <a:0_:728654760370241577>
                */
const mapping = {
  "0": "<a:0_:728654760370241577>",//BURAYA SAYI EMOJILERINI KOYUN ÖRNEK : <a:emojisim:emojidid>
  "1": "<a:bir:728654763855446087>",
  "2": "<a:iki:728654765202079864>",
  "3": "<a:uc:728654765092765846>",
  "4": "<a:dort:728654764916736030>",
  "5": "<a:bes:728654765969637436>",
  "6": "<a:alti:728654765285834922>",
  "7": "<a:yedi:728654766154186812>",
  "8": "<a:sekiz:728654766246461501>",
  "9": "<a:dokuz:728654765780762636>",
};

"abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});

exports.run = function(client, message, args) {

  
  let toplam = message.guild.memberCount;
  let sunucu = 
      `${toplam}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
  let onlinesayi = message.guild.members.cache.filter(
    only => only.presence.status != "offline"
  ).size;
  let online =
      `${onlinesayi}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
  let tag = message.guild.members.cache.filter(m => m.user.username.includes("TAG")).size;
  let tagdakiler = 
      `${tag}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  let ses =
      `${count}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
  let boost = message.guild.premiumSubscriptionCount
  let boostcuk = `${boost}`.split("").map(a => mapping[a] || '0')
  .join("")
  const say = new Discord.MessageEmbed()
  .setDescription(`${client.emojis.cache.get('728654749184032929')} **Sunucudaki Kullanıcı Sayısı;** ${sunucu} \n${client.emojis.cache.get('728654749184032929')} **Sunucudaki Aktif Kullanıcı Sayısı;** ${online} \n${client.emojis.cache.get('728654749184032929')} **Sunucuda Tagımızı Alan Kullanıcı Sayısı;** ${tagdakiler} \n${client.emojis.cache.get('728654749184032929')} **Sesli Kanallarda Bulunan Kullanıcı Sayısı;** ${ses}\n${client.emojis.cache.get('728654749184032929')} **Sunucudaki Boost Sayısı;** ${boostcuk}`);
  
  message.channel.send(say)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["onlinesayi"],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "Sunucudaki Online Kişileri Sayar",
  desscription: "say"
};