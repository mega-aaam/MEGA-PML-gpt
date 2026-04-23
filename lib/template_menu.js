require('../settings');
const fs = require('fs')
const chalk = require('chalk');
const moment = require('moment-timezone');
const { pickRandom } = require('./function');

async function setTemplateMenu(naze, type, m, prefix, setv, db, options = {}) {
	let total = Object.entries(db.hit).sort((a, b) => b[1] - a[1]).slice(0, Math.min(7, Object.keys(db.hit).length)).filter(([command]) => command !== 'totalcmd' && command !== 'todaycmd').slice(0, 5);
	
	let text =  `\n                 ❍「 *MENU* 」❍\n\n`
	
	if (total && total.length >= 1000) {
		total.forEach(([command, hit], index) => {
			text += `> │${setv} ${prefix} ${setv} ${prefix} ${setv} ${prefix} ${setv} ${prefix} ${setv} ${prefix} ${setv} ${prefix} ${setv} ${prefix} ${setv} ${prefix} ${setv} ${prefix} ${setv} ${prefix}\n `
		})
		text += ''
	} else text += ``

	if (type == 1 || type == 'buttonMessage') {
		await naze.sendButtonMsg(m.chat, {
			text: `Halo @${m.sender.split('@')[0]}\n` + text,
			footer: options.ucapanWaktu,
			mentions: [m.sender],
			contextInfo: {
				forwardingScore: 10,
				isForwarded: true,
			},
			buttons: [{
				buttonId: `${prefix}allmenu`,
				buttonText: { displayText: 'All Menu' },
				type: 1
			},{
				buttonId: `${prefix}sc`,
				buttonText: { displayText: 'SC' },
				type: 1
			}]
		}, { quoted: m })
	} else if (type == 2 || type == 'listMessage') {
		await naze.sendButtonMsg(m.chat, {
			text: `Halo @${m.sender.split('@')[0]}\n` + text,
			footer: options.ucapanWaktu,
			mentions: [m.sender],
			contextInfo: {
				forwardingScore: 10,
				isForwarded: true,
			},
			buttons: [{
				buttonId: `${prefix}pay`,
				buttonText: { displayText: '💳PAY' },
				type: 1
			},{
				buttonId: `${prefix}sTOK`,
				buttonText: { displayText: '🛒STOK' },
				type: 1
			},{
				buttonId: `${prefix}sALURAN`,
				buttonText: { displayText: '📻SALURAN' },
				type: 1
			 },{
				buttonId: `${prefix}aturan`,
				buttonText: { displayText: '🧾ATURAN GRUP' },
				type: 1
			},{
				buttonId: 'list_button',
				buttonText: { displayText: 'list' },
				nativeFlowInfo: {
					name: 'single_select',
					paramsJson: JSON.stringify({
						title: '📦PRODUK',
						sections: [{
							title: 'PRODUK YANG TERSEDIA',
							rows: [{
								title: '🔥APK PREMIUM',
								id: `${prefix}apk premium`
							},{
								title: '🔥PANEL PTERODACTYL',
								id: `${prefix}panel`
							},{
								title: '🔥VPS',
								id: `${prefix}vps`
							},{
								title: '🔥DOMAIN',
								id: `${prefix}domain`
							},{
								title: '🔥SUBDOMAIN',
								id: `${prefix}subdomain`
							},{
								title: '🔥SCRIPT BOT',
								id: `${prefix}sc bot`
							},{
								title: '🔥TOPUP FF',
								id: `${prefix}topup ff`
							},{
								title: '🔥MURBUG',
								id: `${prefix}murbug`
							},{
								title: '🔥CIT FF',
								id: `${prefix}cit ff`
							},{
								title: '🔥NOKOS',
								id: `${prefix}nokos`
							},{
								title: '🔥MURBAND',
								id: `${prefix}murband`
							},{
								title: '🔥JASA BUAT PANEL DI VPS',
								id: `${prefix}jasa panel`
							},{
								title: '🔥SUNTIK TIKTOK',
								id: `${prefix}suntiktt`
							},{
								title: '🔥SUNTIK INSTAGRAM',
								id: `${prefix}suntikig`
							},{
								title: '🔥SUNTIK FACEBOOK',
								id: `${prefix}suntikfb`
							},{
								title: '🤖JADIBOT',
								id: `${prefix}jadibotbabu`
							},{
								title: '🎁PRODUK FREE',
								id: `${prefix}free`
							},{
								title: '📡BELUM TERSEDIA',
								id: `${prefix}belum tersedia`
							},{
								title: '📡BELUM TERSEDIA',
								id: `${prefix}belum tersedia`
							}]
						}]
					})
				},
				type: 2
			}]
		}, { quoted: m })
	} else if (type == 3 || type == 'documentMessage') {
		let profile
		try {
			profile = await naze.profilePictureUrl(m.sender, 'image');
		} catch (e) {
			profile = fake.anonim
		}
		const menunya = `
╭──❍「 *USER INFO* 」❍
├ *Nama* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
├ *Id* : @${m.sender.split('@')[0]}
├ *User* : ${options.isVip ? 'VIP' : options.isPremium ? 'PREMIUM' : 'FREE'}
├ *Limit* : ${options.isVip ? 'VIP' : db.users[m.sender].limit }
├ *Uang* : ${db.users[m.sender] ? db.users[m.sender].money.toLocaleString('id-ID') : '0'}
╰─┬────❍
╭─┴─❍「 *BOT INFO* 」❍
├ *Nama Bot* : ${db?.set?.[options.botNumber]?.botname || 'Naze Bot'}
├ *Powered* : @${'0@s.whatsapp.net'.split('@')[0]}
├ *Owner* : @${owner[0].split('@')[0]}
├ *Mode* : ${naze.public ? 'Public' : 'Self'}
├ *Prefix* :${db.set[options.botNumber].multiprefix ? '「 MULTI-PREFIX 」' : ' *'+prefix+'*' }
╰─┬────❍
╭─┴─❍「 *ABOUT* 」❍
├ *Date* : ${options.date}
├ *Day* : ${options.locale_day}
├ *Time* : ${options.date_time}
╰──────❍\n`
		await m.reply({
			document: fake.docs,
			fileName: options.ucapanWaktu,
			mimetype: pickRandom(fake.listfakedocs),
			fileLength: '100000000000000',
			pageCount: '999',
			caption: menunya + text,
			contextInfo: {
				mentionedJid: [m.sender, '0@s.whatsapp.net', owner[0] + '@s.whatsapp.net'],
				forwardingScore: 10,
				isForwarded: true,
				forwardedNewsletterMessageInfo: {
					newsletterJid: my.ch,
					serverMessageId: null,
					newsletterName: 'Join For More Info'
				},
				externalAdReply: {
					title: options.author,
					body: options.packname,
					showAdAttribution: false,
					thumbnailUrl: profile,
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh,
					sourceUrl: my.gh,
				}
			}
		})
	} else if (type == 4 || type == 'videoMessage') {
		//tambahin sendiri :v
	} else {
		m.reply(`${options.ucapanWaktu} @${m.sender.split('@')[0]}\nSilahkan Gunakan ${prefix}allmenu\nUntuk Melihat Semua Menunya`)
	}
}

module.exports = setTemplateMenu;

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.yellowBright(`[UPDATE] ${__filename}`))
	delete require.cache[file]
	require(file)
});
