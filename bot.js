const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const db = require('quick.db')
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.on("userUpdate", function(oldUser, newUser) {
  if (oldUser.username === newUser.username) return;
  let sunucuID = "787079965639835678";//sunucu ıd
  let logID = "TAG LOG";//tag alanların log kanalı
  let rolID = "TAG ROL";//tag rolü
  let tag = "✰";//tag
  let member = client.guilds.cache.get(sunucuID).members.cache.get(oldUser.id);
  let roller = client.guilds.cache.get(sunucuID).members.cache.get(oldUser.id).roles.cache.filter(r => r.name !== "@everyone", "Véronique", "♀️", "Mâschio", "♂️").map(r => r.id)
  let codeming = oldUser.username;
  let newcodeming = newUser.username;
  let dm = oldUser;

  const embed1 = new Discord.MessageEmbed()
    .setDescription(
      `${member} adlı kişi, TAG tagımızı alarak <@&728337604231168149> rolünü kazandı.`
    )
    .setColor("#000000");
  const embed2 = new Discord.MessageEmbed()
    .setDescription(
      `${member}, TAG tagımızı çıkardığı <@&728337604231168149> için rolü geri alındı!`
    )
    .setColor("#000000");

  if (codeming.includes(tag)) {
    if (!newcodeming.includes(tag)) {
      client.channels.cache.get(logID).send(embed2);
      member.roles.remove(rolID)
      dm.send(
        `Görünüşe göre kullanıcı adından tagı kaldırmışsın. Bu sebepten dolayı üzerinde bulunan "\`ROL ISIM\`" rolü alındı.`
      );
    }
  }

  if (!codeming.includes(tag)) {
    if (newcodeming.includes(tag)) {
      client.channels.cache.get(logID).send(embed1);
      member.roles.add(rolID);
      dm.send(
        `Görünüşe göre kullanıcı adına tag almışsın. Bu sebepten dolayı "\`ROL ISIM\`" rolün verildi. \n*Seni seviyor, bizimle olduğun için mutluluk duyuyoruz.*`
      );
    }
  }
});


client.on("message", async msg => {
  if (msg.content.toLowerCase() === "!tag" ||
     msg.content.toLowerCase() === "tag") {
    msg.channel.send("✰");
  }
  if (msg.content.toLowerCase() === "sa" ||
     msg.content.toLowerCase() === "selamın aleyküm" ||
     msg.content.toLowerCase() === "selamun aleyküm" ||
     msg.content.toLowerCase() === "selam") {
    msg.react('728654749800333392')
    msg.channel.send(`**Aleyküm Selam <@${msg.author.id}>, Hoşgeldin!**`)
  }
});

client.on("guildMemberAdd", member => {
  member.send(
    `${member.guild.name} Adlı Sunucuya Hoşgeldin ${member}! Tagımızı ( TAG ) Alarak Yetkili Olabilirsin.`
  );
  member.roles.add("787079965753212940")//unregister rolü
});




client.on("guildMemberAdd", member => {
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;
  let rol = "";
  let user = client.users.cache.get(member.id);

  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol = [];
  if (gün < 7) {
    kontrol = "<a:onaysiz:706474357123448853> Karantinaya Atıldı! ";//a onaysiz yzan yere kendi emojinizi koyun

    const karantina = new Discord.MessageEmbed()
      .setDescription(
        `<a:yukluyorm:728654749184032929> ${member} **Karantinaya atıldı!**`
      )
      .setColor("#000000");
    member.guild.channels.cache.get("CEZALI LOG").send(karantina);//cezalı log
    member.send("Hesabın açılalı 7 günden az olduğu için karantinaya atıldın!")
    member.roles.add("CEZALI ROLÜ")//cezalı rol
  }
  if (gün > 7) {
    kontrol = "Güvenli! <a:evet:728654767987097680>";//a evet yazan yere kendi emojinizi koyun
    let kanal = "787233757572104232";//hoşgeldin mesajı atılcak kanal
    if (!kanal) return;
      member.guild.channels.cache
        .get(kanal)
        .send(
          `${client.emojis.cache.get("790590460930424852")} <:adsz7:790590460930424852>  **Hoşgeldin ${member} Seninle Beraber ${member.guild.memberCount} Kişiyiz! \n\n${client.emojis.cache.get("729725007042969651")} Kaydının Yapılması İçin Teyit Vermen Gerekli. \n\n${client.emojis.cache.get("729725006468218971")} Hesap Kuruluş Zamanı: \`${moment(
            user.createdAt
          ).format("DD")}/${moment(user.createdAt).format("MM")
          }/${moment(user.createdAt).format(
            "YYYY HH:mm:ss"
          )}\` \n\n${client.emojis.cache.get("729725007151759443")} **<@&770898726977273868> **Rolünde olan arkadaşlarımız seninle ilgilenecektir!**`
        );
  }
});


client.on("message", msg => {
      const kelime = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", ".co"];
    if (kelime.some(reklam => msg.content.toLowerCase().includes(reklam))) {
      
      if (msg.member.hasPermission("ADMINISTRATOR")) {
        return;
      }
      
        const embed2 = new Discord.MessageEmbed()
        .setTitle('Reklam Log')
        .addField(`Reklam Yapan Kullanıcı;`, `<@${msg.author.id}>`, true)
        .addField(`Reklam Yapılan Kanal;`, `<#${msg.channel.id}>`, true)
        .addField(`Reklam Mesajı;`,`**${msg}**`)
        .setFooter(msg.author.id, msg.author.avatarURL())
        .setTimestamp();
        msg.guild.channels.cache.get('730384881313644554').send(embed2)
     msg.delete()
      const Embed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setDescription(`${msg.author} **Reklam Yasak Bunu Bilmiyormusun!**`)
      msg.channel.send(Embed).then(msg => msg.delete(3000))
    }
  });


client.login(ayarlar.token);
