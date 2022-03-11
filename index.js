const fs = require("fs")
const { keep_alive } = require("./keep_alive.js");
const request = require("request")
const http = require("https")
const axios = require("axios")
const login = require("fca-unofficial")
const YoutubeMusicApi = require('youtube-music-api')
const ytdl = require('ytdl-core');
const ffmpeg = require('@ffmpeg-installer/ffmpeg')
const tts = require("@google-cloud/text-to-speech")
const ffmpegs = require('fluent-ffmpeg')
ffmpegs.setFfmpegPath(ffmpeg.path)
const yt = new YoutubeMusicApi()
const client = new tts.TextToSpeechClient()
const prefix = "√"
const separator = "|"
const gc = process.env['gc']
let msg = [
	process.env['a']
]
let vip = [
	process.env['a'],
	process.env['b'],
	process.env['c']
]
let qvip = [
	process.env['queen'],
	process.env['a']
]
let selves = [
	process.env['b'],
	process.env['c']
]
let cute = [
	process.env['april']
]
let morning = ""
let aftie = ""
let eve = ""
let night = ""
let b_users = ""
let bday = ""
let onBot = true 
let musics = true
let vids = true
let bhiebot = true
async function conv(v, t, e) {
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'X-Requested-Key': 'de0cfuirtgf67a'
	}
	results = await axios.post("https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994", "v_id=" + v + "&ftype=mp3&fquality=128&token=" + t + "&timeExpire=" + e + "&client=yt5s.com", {
		headers: headers
	}).then((response) => {
		return response.data.d_url
	}).catch((error) => {
		return error.message
	})
	return results
}
async function bhie(x){
	let o = await axios.get("http://bhiebot.xp3.biz/ulan.php?ID=" + x). then((r) => {
		return r.data
	}).catch((e) => {
		console.log(e)
		return e
	})
	console.log("Data " + o)
	return o
}
async function quote(){
	let me = await axios.get("https://zenquotes.io/api/random/").then((response) => {
		console.log(response.data[0])
		return response.data[0]
	}).catch((err) => {
		return "Error"
	})
	return me
}
async function anime(){
	let me = await axios.get("https://animechan.vercel.app/api/random").then((response) => {
		console.log(response.data)
		return response.data
	}).catch((err) => {
		return "Error"
	})
	return me
}
async function verse(x){
	const y = x[0] + " " + x[1] + " " + x[2]
	if(y.includes("of the day")){
		let v = await axios.get("http://labs.bible.org/api/?passage=votd&type=json").then((r) => {
			console.log(r)
			return r.data
		}).catch((e) => {
			return "Error"
		})
		return v
	}else if(x == ""){
		let v = await axios.get("http://labs.bible.org/api/?passage=random&type=json").then((response) => {
			return response.data
		}).catch((err) => {
			return "Error"
		})
		return v
	}else{
		let v = await axios.get("http://labs.bible.org/api/?passage=" + x + "&type=json").then((r) => {
			return r.data
		}).catch((e) => {
			return "Error"
		})
		return v
	}
}
async function getWiki(q) {
	let out = await axios.get("https://en.wikipedia.org/api/rest_v1/page/summary/" + q).then((response) => {
		return response.data
	}).catch((error) => {
		return error
	})
	return out
}
async function fetch(query) {
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
	results = await axios.post("https://yt5s.com/api/ajaxSearch", "q=" + query + "&vt=mp3", {
		headers: headers
	}).then((response) => {
		return response.data
	}).catch((error) => {
		return error.message
	});
	return results
} 
async function dl(x){
	let s = fetch(x)
	let r = await s.then((response) => {
		let slist = response
		console.log(slist)
		if(slist.t < 1500){
			let d_u = conv(slist.vid, slist.token, slist.timeExpires).then((response) => {
				return [response, slist.title, slist.a]
			})
			return d_u
		}else{
			return "There's an error"
		}
	})
	return r
}
async function whatIs(x){
	let o = await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + x).then((response) => {
		return response.data[0]
	}).catch((err) => {
		return "Error 123 " + err.message
	})
	return o
}
async function speech(x){
	const r = {
		input: {
			text: x
		},
		voice: {
			languageCode: 'en-US',
			ssmlGender: 'NEUTRAL'
		},
		audioConfig: {
			audioEncoding: 'MP3'
		}
	}
	const o = await client.synthesizeSpeech(r).then((r) => {
		return r.data
	}).catch((e) => {
		return e
	})
	console.log(o)
	return o
}
function f(p) {
	let g = [
		"bobo",
		"bold",
		"tanga",
		"gaga",
		"gago",
		"gagu",
		"kulangot",
		"kwak",
		"ulol",
		"olol",
		"ulul",
		"olul",
		"taena",
		"tangina",
	]
	let w = p.split(" ")
	for(let i = 0; i < g.length; i++){
		for(let j = 0; j < w.length; j++){
			if(w[j] == g[i]){
				return true
				break
			}
		}
	}
	return false
}
function read(){
	return fs.readFileSync("thread.txt", "utf-8")
}
async function words(x){
	let y = x.replace(/[^a-zA-Z]+/g, '')
	let z = y.split(" ")
	for(let c in z){
		let a = await axios.get("http://bhiebot.xp3.biz/bot.php?action=words&data=" + z[c]).then((r) => {
			return r.data
		}).catch((e) => {
			return e
		})
		console.log(a)
	}
}
login({appState: JSON.parse(process.env['state'])}, (err, api) => {
	if(err)  return console.error(err)
	if(bhiebot){
		bhie(1).then((r) => {
			api.sendMessage(r.data, gc)
		}).catch((e) => {
			api.sendMessage(e, gc)
		})
		api.sendMessage("BhieBot is now active", gc)
		bhiebot = false
	}
	api.setOptions({listenEvents: true, selfListen: true})
	var listenEmitter = api.listen(async (err, event) => {
		if(err) return console.error(err)
		api.markAsRead(event.threadID)
		if(event.body != undefined){
			words(event.body)
		}
		switch(event.type){
			case "message":
				if(event.body != null){
					let mess = event.body
					let x = mess.toLowerCase()
					let y = x.split(" ")
					let myDay = 0
					threads = read()
					if((new Date().getHours() + 8) > 24){
						myDay = (new Date().getHours() + 8) - 24
					}else{
						myDay = new Date().getHours() + 8
					}
					if(myDay >= 22 || myDay < 5){
						morning = ""
						aftie = ""
						eve = ""
					}else if(myDay >= 5 && myDay < 12){
						aftie = ""
						eve = ""
						night = ""
					}else if(myDay >= 12 && myDay < 18){
						morning = ""
						eve = ""
						night = ""
					}else{
						morning = ""
						aftie = ""
						night = ""
					}
					if(!(fs.readFileSync("list.txt", "utf-8").includes(event.threadID))){
							if(!vip.includes(event.threadID) && !gc.includes(event.threadID)){
								let lists = fs.readFileSync("list.txt", "utf-8")
								if(event.senderID == event.threadID){
									api.getUserInfo(event.threadID, (err, data) => {
										lists += "Thread ID: " + event.threadID + "\nThread Name: " + data[event.threadID]['name'] + "\n/----------/\n"
										api.sendMessage(lists, gc)
										fs.writeFileSync("list.txt", lists, "utf-8")
									})
								}else{
									api.getThreadInfo(event.threadID, (err, data) => {
										lists += "Thread ID: " + event.threadID + "\nThread Name: " + data.threadName + "\n/----------/\n"
										api.sendMessage(lists, gc)
										fs.writeFileSync("list.txt", lists, "utf-8")
									})
								}
							}
						}
					if(vip.includes(event.senderID) || gc.includes(event.threadID)){
						if(x.startsWith("-say: ")){
							let a = y
							a.shift()
							speech(a).then((r) => {
								api.sendMessage(r, event.threadID)
							})
						}
						if(x.startsWith("_admin_")){
							api.sendMessage("Here are your commands:\n~Bot: Sleep\n~Bot: Wake-up\n~Bot: Off\n~Bot: On\n~Bot: Activate [ID]\n~Bot: Deactivate [ID]", event.threadID)
						}else if(x.startsWith("_list_")){
							let mm = fs.readFileSync("list.txt", "utf-8").split("/----------/")
							for (let i = 0; i < mm.length - 1; i++) {
								api.sendMessage(mm[i], event.threadID)
							}
						}else if(x.startsWith("_off_")){
							let mm = fs.readFileSync("thread.txt", "utf-8").split("/")
							for (let i = mm.length - 1; i >= 0; i--) {
								api.getThreadInfo(parseInt(mm[i]), (err, data) => {
									if(err){
										console.log(err)
									}else{
										api.sendMessage("Thread ID: " + mm[i] + "\nThread Name: " + data.threadName, gc)
									}
								})
							}
						}else if(x.startsWith(prefix) && x.includes(separator)){
							let m = mess.split(separator)
							let c = m[0].split(" ")
							let t = parseInt(m[1].replace(" ", ""))
							if(x.startsWith(prefix + "motivate")){
								if(c[1] === "anime"){
									let q = anime()
									q.then((response) => {
										api.sendMessage(`A quotation by: ${response.character}\nFrom: ${response.anime}\n~ ${response.quote}`, t)
									})
								}else{
									let q = quote()
									q.then((response) => {
										api.sendMessage(`A quotation from ${response.a}\n~ ${response.q}`, t)
									})
								}
								api.sendMessage("Sent",event.threadID)
							}else if(x.startsWith(prefix + "music")){
								let data = m[0].split(" ")
								console.log(data)
								if(x.includes("https://youtu.be") || x.includes("https://youtube.com") || x.includes("https://www.youtube.com")){
									let s = dl(data[1])
									api.sendMessage("On Proccess...", event.threadID)
									try{
										s.then((response) => {
											if(response[0] != undefined){
												let f = fs.createWriteStream("my.mp3")
												let r = response[0]
												let g_r = http.get(r, (g_rs) => {
													g_rs.pipe(f)
													api.sendMessage("Converting", event.senderID)
													f.on("finish", () => {
														api.sendMessage({
															body: "A song sent to this thread:\nTitle: " + response[1] + "\nUploaded by: " + response[2] + ((m.length >= 3) ? "\nMessage: " + m[2] : ""),
															attachment: fs.createReadStream(`${__dirname}/my.mp3`).on("end", async () => {
																if(fs.existsSync(`${__dirname}/my.mp3`)){
																	fs.unlink(`${__dirname}/my.mp3`, (err) => {
																		if(err){
																			console.log(err)
																		}else{
																			api.sendMessage("Sent", event.threadID, event.messageID)
																		}
																	})
																}
															})
														}, t)
													})
												})
											}
										})
									}catch(err){
										console.log(err)
									}
								}else{
									api.sendMessage("Please Wait", event.threadID, event.messageID)
									try{
										data.shift()
										await yt.initalize()
										const music = await yt.search(data.join(" ").replace(/[^\w\s]/gi, ''))
										if(music.content.length <= 0){
											throw new Error(`${data.join(" ").replace(/[^\w\s]/gi, '')} returned no results found`)
										}else{
											if(music.content[0].videoId == undefined){
												throw new Error(`${data.join(" ").replace(/[^\w\s]/gi, '')} is not found on youtube music. Try to add the singer, maybe I can find it.`)
											}
										}
										const url = `https://www.youtube.com/watch?v=${music.content[0].videoId}`
										const strm = ytdl(url, {
											quality: "lowest"
										})
										const info = await ytdl.getInfo(url)
										if(music.content[0].duration <= ((20 * 60) * 1000)){
											api.sendMessage("On Proccess...", event.threadID)
											ffmpegs(strm).audioBitrate(96).save(__dirname + "/" + x + ".mp3").on("end", async () => {
												api.sendMessage({
													body: "A song sent to this thread:\nTitle: " + info.videoDetails.title + "\nUploaded by: " + info.videoDetails.author.name + ((m.length >= 3) ? "\nMessage: " + m[2] : ""),
													attachment: fs.createReadStream(__dirname + "/" + x + ".mp3").on("end", async () => {
														if(fs.existsSync(__dirname + "/" + x + ".mp3")){
															fs.unlink(__dirname + "/" + x + ".mp3", (err) => {
																if(err){
																	console.log(err)
																}
																console.log("Done")
																api.sendMessage("Sent", event.threadID, event.messageID)
															})
														}
													})
												}, t)
											})
										}else{
											api.sendMessage("It's too long", event.threadID)
										}
									}catch(err){
										console.log(err)
										api.sendMessage("Error: " + err, event.threadID, event.messageID)
									}
								}
							}else if(x.startsWith(prefix + "bang bang")){
								let d = {
									body: "Bang bang command: on",
									attachment: [
										fs.createReadStream(__dirname + "/b1.gif"),
										fs.createReadStream(__dirname + "/b2.gif"),
										fs.createReadStream(__dirname + "/b3.gif")
									]
								}
								api.sendMessage(d, t)
								api.sendMessage("Sent", event.threadID)
							}else if(x.startsWith(prefix + "verse")){
								let w = x.split(" ")
								w.shift()
								let v = verse(w)
								v.then((response) => {
									let q = ""
									for(let i = 0; i < response.length; i++){
										q += "From the book of " + response[i].bookname + " chapter " + response[i].chapter + " verse " + response[i].verse + "\n" + response[i].text + "\n"
									}
									api.sendMessage(q, t)
									api.sendMessage("Sent", event.threadID, event.messageID)
								}).catch((err) => {
									console.log(err)
								})
							}else if(x.startsWith(prefix + "say")){
								let w = m[0].split(" ")
								let j = ""
								w.shift()
								for(let i = 0; i < w.length; i++){
									j += w[i] + " "
								}
								api.sendMessage(j, t)
								api.sendMessage("Sent", event.threadID, event.messageID)
							}
						}
					}
					if(x.startsWith("_status_")){
						let m = "I'm active. "
						if(onBot){
							if(threads.includes(event.threadID)){
								m += "But the bot wasn't alive to this thread"
							}else{
								m += "Also enabled."
							}
						}else{
							m += "But on sleep mode"
						}
						api.sendMessage(m, event.threadID)
					}else if(mess.startsWith("~Bot: Off") && onBot){
						onBot = false 
						api.sendMessage("Bot turned off", event.threadID)
						for(let i = 0; i < msg.length; i++){
							if(msg[i] != event.threadID){
								api.sendMessage("Bot turned off", msg[i])
							}
						}
					}else if(mess.startsWith("~Bot: Deactivate ") && vip.includes(event.threadID)){
						let d = x.split(" ")
						threads += d[2] + "/"
						fs.writeFileSync("thread.txt", threads, "utf-8")
						api.getThreadInfo(d[2], (err, data) => {
							api.sendMessage("Added to off list:\nID: " + d[3] + "\nThread name: " + data.threadName, gc)
							console.log(data)
						})
					}else if(mess.startsWith("~Bot: Sleep") && !threads.includes(event.threadID)){
						if(event.threadID != msg){
							threads += event.threadID + "/"
							fs.writeFileSync("thread.txt", threads, "utf-8")
							api.sendMessage({
							  body:"Good night guys",
							  attachment: fs.createReadStream(__dirname + "/sleep.gif")
							}, event.threadID)
							api.getThreadInfo(event.threadID, (err, data) => {
								api.sendMessage("Added to off list:\nID: " + event.threadID + "\nThread name: " + data.threadName, gc)
								console.log(data)
							})
						}
					}else if(mess.startsWith("~Bot: Activate ") && !x.includes("here")){
						let l = x.split(" ")
						threads = threads.replace(l[2] + "/", "")
						fs.writeFileSync("thread.txt", threads, "utf-8")
						api.sendMessage("Unlocked thread ID: " + l[2], event.threadID, event.messageID)
					}else if(mess.startsWith("~Bot: On") && !onBot){
						onBot = true
						api.sendMessage("Bot turned on", event.threadID)
						api.sendMessage("Bot turned on", gc)
					}else if(mess.startsWith("~Bot: Wake-up") && threads.includes(event.threadID)){
						threads = threads.replace(event.threadID + "/", "")
						fs.writeFileSync("thread.txt", threads, "utf-8")
						api.getThreadInfo(event.threadID, (err, data) => {
							if(err){
								console.log(err)
							}else{
								api.sendMessage("Activated bot to:\nThread ID:" + event.threadID + "\nThread Name: " + data.threadName, gc)
							}
						})
						api.sendMessage("Good Day guys", event.threadID)
					}
					if(onBot && !x.includes(separator) && !b_users.includes(event.senderID) && !(threads.includes(event.threadID))){
						if(f(x)){
							api.setMessageReaction("🙂", event.messageID, (err) => {}, true)
						}else{
							if(x.startsWith(prefix)){
								if(x.startsWith(prefix + "motivate")){
									let c = x.split(" ")
									if(c[1] === "anime"){
										let q = anime()
										q.then((response) => {
											api.getUserInfo(event.senderID, (err, data) => {
												if(err){
													console.log(err)
												}else{
													const name = data[event.senderID]
													api.sendMessage({
														body: `A quotation for you my dear @${name.firstName}\nFrom: ${response.character}\nIn the anime: ${response.anime}\n~ ${response.quote}`,
														mentions: [{
															tag: `@${name.firstName}`,
															id: event.senderID
														}]
													}, event.threadID, event.messageID)
												}
											})
										})
									}else{
										quote().then((response) => {
											api.getUserInfo(event.senderID, (err, data) => {
												if(err){
													console.log(err)
												}else{
													const name = data[event.senderID]
													api.sendMessage({
														body: `A quotation for you my dear @${name.firstName}\nFrom: ${response.a}\n~ ${response.q}`,
														mentions: [{
															tag: `@${name.firstName}`,
															id: event.senderID
														}]
													}, event.threadID, event.messageID)
												}
											})
										})
									}
								}else if(x.startsWith(prefix + "info")){
									api.sendMessage(fs.readFileSync("abt.txt", "utf-8"), event.threadID, event.messageID)
								}else if(x.startsWith(prefix + "music")){
									if(musics){
										let d = mess.split(" ")
										if(x.includes("https://m.youtube.com") || x.includes("https://youtu.be") || x.includes("https://youtube.com") || x.includes("https://www.youtube.com")){
											let s = dl(d[1])
											musics = false
											api.sendMessage("Please Wait...", event.threadID, event.messageID)
											try{
												s.then((response) => {
													if(response[0] != undefined){
														let f = fs.createWriteStream("song.mp3")
														let t_u = response
														console.log("hi " + t_u)
														let g_r = http.get(t_u[0], function(g_rs) {
															g_rs.pipe(f)
															console.log("On Proccess")
															f.on("finish", function() {
																api.sendMessage("Downloading success, please wait", event.threadID, event.messageID)
																api.sendMessage({
																	body: "Here's your file\nTitle: " + response[1] + "\nUploaded by: " + response[2] ,
																	attachment: fs.createReadStream(`${__dirname}/song.mp3`).on("end", async () => {
																		if(fs.existsSync(`${__dirname}/song.mp3`)){
																			fs.unlink(`${__dirname}/song.mp3`, (err) => {
																				if(err){
																					console.log(err)
																				}
																				console.log("Done")
																				musics = true
																			})
																		}
																		musics = true
																	})
																}, event.threadID, event.messageID)
																musics = true
															})
														})
													}else{
														musics = true
														api.sendMessage("Error", event.threadID, event.messageID)
													}
												})
											}catch(err){
												musics = true
												console.log(err)
											}
										}else{
											api.sendMessage("Please Wait", event.threadID, event.messageID)
											try{
												musics = false
												d.shift()
												await yt.initalize()
												const m = await yt.search(d.join(" ").replace(/[^\w\s]/gi, ''))
												console.log(m)
												if(m.content.length <= 0){
													musics = true
													throw new Error(`${d.join(" ").replace(/[^\w\s]/gi, '')} returned no results found`)
												}else{
													if(m.content[0].videoId == undefined){
														musics = true
														throw new Error(`${d.join(" ").replace(/[^\w\s]/gi, '')} is not found on youtube music. Try to add the singer name, maybe I can find it now.`)
													}
												}
												const url = `https://www.youtube.com/watch?v=${m.content[0].videoId}`
												const strm = ytdl(url, {
													quality: "lowest"
												})
												const info = await ytdl.getInfo(url)
												api.sendMessage("A moment please", event.threadID, event.messageID)
												if(m.content[0].duration <= ((20 * 60) * 1000)){
													ffmpegs(strm).audioBitrate(96).save(`${__dirname}/song.mp3`).on("end", async () => {
														api.sendMessage({
															body: "Here is your request\n\nSong Title: " + info.videoDetails.title + "\nUploaded by: " + info.videoDetails.author.name,
															attachment: fs.createReadStream(`${__dirname}/song.mp3`).on("end", async () => {
																if(fs.existsSync(`${__dirname}/song.mp3`)){
																	fs.unlink(`${__dirname}/song.mp3`, (err) => {
																		if(err){
																			console.log(err)
																		}
																	console.log("Done")
																	musics = true
																	})
																}
															})
														}, event.threadID, event.messageID)
													})
												}else{
													musics = true
													api.sendMessage("It's too long", event.threadID, event.messageID)
												}
											}catch(err){
												musics = true
												api.sendMessage("Error: " + err, event.threadID, event.messageID)
											}
										}
									}else{
										api.sendMessage("Lemme finish first the earlier request", event.threadID, event.messageID)
									}
								}else if(x.startsWith(prefix + "special")){
									let kolai = {
										body: "Kulay Command On",
										attachment: fs.createReadStream(__dirname + "/kolai.gif")
									}
									api.sendMessage(kolai, event.threadID, event.messageID)
								}else if(x.startsWith(prefix + "bang bang")){
									let bang = {
										body: "Bang Bang Command",
										attachment: [
											fs.createReadStream(__dirname + "/b1.gif"),
											fs.createReadStream(__dirname + "/b2.gif"),
											fs.createReadStream(__dirname + "/b3.gif")
										]
									} 
									api.sendMessage(bang, event.threadID, event.messageID)
								}else if(x.startsWith(prefix + "wiki")){
									let d = mess.split(" ")
									try{
										d.shift()
										let w = ""
										let r = await getWiki(d.join(" "))
										if(r === undefined){
											api.sendMessage("API Returned this: " + r, event.threadID, event.messageID)
											throw new Error("API Returned this: " + r)
										}
										if(r.title === undefined){
											api.sendMessage("API Returned this: " + r, event.threadID, event.messageID)
											throw new Error("API Returned this: " + r)
										}
										w += "You've searched about " + r.title + "\n\nDescription: " + r.description + "\n\n\t" + r.extract + "\n\nSource:\nDesktop: " + r.content_urls.desktop.page + "\nMobile: " + r.content_urls.mobile.page
										if(r.originalimage !== undefined){
											let f = fs.createWriteStream("wiki.png")
											let g_r = http.get(r.originalimage.source, (r_s) => {
												r_s.pipe(f)
												f.on("finish", () => {
													try{
														console.log(f)
														api.sendMessage({
															body: "Image from the article",
															attachment: fs.createReadStream(__dirname + "/wiki.png").on("end", async () => {
																if(fs.existsSync(__dirname + "/wiki.png")){
																	fs.unlink(__dirname + "/wiki.png", (err) => {
																		if(err){
																			console.log("error " + err)
																		}else{
																			console.log("Done")
																		}
																	})
																	api.sendMessage(w, event.threadID, event.messageID)
																}
															})
														}, event.threadID, event.messageID)
													}catch (err){
														api.sendMessage(w, event.threadID)
													}
												})
											})
										}else{
											api.sendMessage(w, event.threadID, event.messageID)
										}
									}catch(err){
										api.sendMessage(err, event.threadID, event.messageID)
									}
								}else if(x.startsWith(prefix + "verse")){
									let w = x.split(" ")
									w.shift()
									let v = verse(w)
									v.then((response) => {
										let q = ""
										for(let i = 0; i < response.length; i++){
											q += "From the book of " + response[i].bookname + " chapter " + response[i].chapter + " verse " + response[i].verse + "\n" + response[i].text + "\n"
										}
										api.sendMessage(q, event.threadID, event.messageID)
									}).catch((err) => {
										console.log(err)
									})
								}else if(x.startsWith(prefix + "whatis")){
									let w = x.split(" ")
									w.shift()
									let o = whatIs(w)
									let r = ""
									o.then((response) => {
										r = "You've searched about the word \"" + response.word + "\"\n"
										if(response.phonetics[0].text != undefined){
											let p = response.phonetics
											r += p[0].text + "\n"
										}
										if(response.origin != undefined){
											r += response.origin + "\n"
										}
										if(response.meanings != undefined){
											let means = response.meanings
											for(let i = 0; i < means.length; i++){
												r += "Part of speech: " + means[i].partOfSpeech + "\n"
												for(let j = 0; j < means[i].definitions.length; j++){
													let d = means[i].definitions[j]
													if(d.definition != undefined){
														r += "[" + (j + 1) + "] " + d.definition + "\n"
														if(d.example != undefined){
															r += "Example " + d.example + "\n\n"
														}else{
															r += "\n\n"
														}
													}
												}
											}
										}
										if(response.sourceUrls != undefined){
											r += "References:\n"
											let sauce = response.sourceUrls
											for(let i = 0; i < sauce.length; i++){
												r += sauce[i] + "\n"
											}
										}
										if(response.phonetics != undefined){
											let p = response.phonetics
											for(let i = 0; i < p.length; i++){
												if(p[i].audio.includes("https://")){//p[i].audio !== undefined || p[i].audio !== null || p[i].audio !== ""){
													let f = fs.createWriteStream("whatis.mp3")
													let g = http.get(p[i].audio, (rs) => {
														rs.pipe(f)
														f.on("finish", (err) => {
															api.sendMessage({
																body: r,
																attachment: fs.createReadStream(__dirname + "/whatis.mp3").on("end", async () => {
																	if(fs.existsSync(__dirname + "/whatis.mp3")){
																		fs.unlink(__dirname + "/whatis.mp3", (err) => {
																			if(err){
																				console.log(err)
																			}else{
																				console.log("Done")
																			}
																		})
																	}
																})
															}, event.threadID, event.messageID)
														})
													})
													break
												}else{
													if(i >= p.length){
														api.sendMessage(r, event.threadID, event.messageID)
													}
												}
											}
										}else{
											api.sendMessage(r, event.threadID, event.messageID)
										}
									}).catch((err) => {
										api.sendMessage("Word is not found", event.threadID, event.messageID)
										console.log("Error " + err)
									})
								}
							}else{
								for(let z = 0; z < y.length; z++){
									if(!selves.includes(event.senderID) && (y[z] == "haha" || y[z] == "hahaha" || x.includes("hahahaha"))){
										api.setMessageReaction("🤣", event.messageID, (err) => {}, true)
									}else if(!selves.includes(event.senderID) && x.includes("masaya")){
										api.setMessageReaction("😃", event.messageID, (err) => {}, true)
									}else if(!selves.includes(event.senderID) && (y[z] == "kain" && (!x.includes("ka na") || !x.includes("kana")))){
										api.getUserInfo(event.senderID, (err, data) => {
											if(err){
												console.log(err)
											}else{
											  let name = data[event.senderID]
												api.setMessageReaction("💗", event.messageID, (err) => {}, true)
												api.sendMessage({
												  body: `Eat well @${name.firstName}`,
												  mentions: [{
												    tag: `@${name.firstName}`,
												    id: event.senderID
												  }]
												}, event.threadID, event.messageID)
											}
										})
									}
								}
								if(!selves.includes(event.senderID)){
									if(x.includes("welcome") && (x.includes("bhiebot") || x.includes("bhie"))){
										api.setMessageReaction("😍", event.messageID, (err) => {}, true)
										api.getUserInfo(event.senderID, (err, data) => {
											if(err){
												console.log(err)
											}else{
												api.sendMessage("Salamat master " + data[event.senderID]['firstName'], event.threadID, event.messageID)
											}
										})
									}else if((x.includes("suggest") || x.includes("suggestion") || x.includes("recommend"))){
										if((x.includes("capstone") || x.includes("thesis") || x.includes("research")) && (x.includes("title"))){
											api.sendMessage(fs.readFileSync("capstone.txt", "utf-8"), event.threadID, event.messageID)
										}
									}else if( (x.includes("mahal kita") || x.includes("love you") || x.includes("i love")) && (x.includes("bot") || x.includes("bhiebot") || x.includes("bhie bot"))){
										api.setMessageReaction("🤣", event.messageID, (err) => {}, true)
										api.getUserInfo(event.senderID, (err, data) => {
											api.sendMessage("Luhh, nainlove sa bot hahaha", event.threadID, event.messageID)
										})
									}else if(x.includes("ito pala")){
										api.setMessageReaction("🤣", event.messageID, (err) => {}, true)
										api.getUserInfo(event.senderID, (err, data) => {
											api.sendMessage("Lutang ka ata hahaha", event.threadID, event.messageID)
										})
									}else if(x.includes("maganda ba ako") || x.includes("maganda ba ko")){
										api.sendMessage("Ewan, isa lang naman akong di hamak na bot na walang ambag sa lipunan", event.threadID, event.messageID)
									}else if(x.includes("masaket") || x.includes("peyn") || x.includes("ouch") || x.includes("awts") || x.includes("sakit") || x.includes("pain") || x.includes("pighati")){
										api.setMessageReaction("😥", event.mesaageID, () => {}, true)
										api.sendMessage({
											body: "Kawawa naman",
											attachment: fs.createReadStream(__dirname + "/edamage.jpg")
										}, event.threadID, event.mesaageID)
									}else if(!selves.includes(event.senderID) && (x.includes("cute") || x.includes("kyot"))){
										if(x.includes("april")){
											api.sendMessage({
												body: "Oo ang cute ni April, lalo na dito",
												attachment: fs.createReadStream(__dirname + "/april.jpg")
											}, event.threadID, event.messageID)
										}else if(cute.includes(event.senderID)){
											api.sendMessage({
												body: "Oo, ang cute mo dito.",
												attachment: fs.createReadStream(__dirname + "/april.jpg")
											}, event.threadID, event.messageID)
										}else if(x.includes("rheign kimmy") || x.includes("kimmy") || x.includes("rheign") || x.includes("ulan")){
											api.sendMessage("Oo naman yes, walang duda kids can tell", event.threadID, event.messageID)
										}else{
											api.sendMessage("Kyot ka din naman, kaso mas kyot pa rin si Ulan.",  event.threadID, event.messageID)
										}
									}
								}
							}
						}
					}
					if(!x.startsWith(prefix)){
						for(let z = 0; z < y.length; z++){
							if(!selves.includes(event.senderID) && myDay >= 5 && myDay < 12 && !morning.includes(event.senderID) && (y[z].includes("morning") || y[z].includes("umaga")) && y.length <= 8){
								api.getUserInfo(event.senderID, (err, data) => {
									if(err){
										console.log(err)
									}else{
										let name = data[event.senderID]
										morning += event.senderID + " "
										if(myDay >= 5 && myDay < 11){
											api.setMessageReaction("☕", event.messageID, (err) => {}, true)
											let f = fs.createWriteStream("morning.jpg")
											let l = ""
											let z = Math.floor(Math.random() * 3)
											if(z == 0){
												l = `https://stlexano.sirv.com/morning.jpg?w=340&text.0.text=Good%20Morning&text.0.position=north&text.0.size=30%&text.0.color=ffffff&text.1.text=${name.name}&text.1.position=south&text.1.size=50%&text.1.color=ffffff`
											}else if(z == 1){
												l = `https://stlexano.sirv.com/kape.jpg?w=340&text.0.text=Good%0AMorning&text.0.position=southwest&text.0.size=50%&text.0.align=left&text.0.color=ffffff&text.1.text=${name.name}&text.1.position=southeast&text.1.size=40%&text.1.color=ffffff`
											}else{
												l = `https://stlexano.sirv.com/umaga.jpg?w=340&text.0.text=Good%0AMorning&text.0.position=northwest&text.0.size=50%&text.0.align=left&text.0.color=ffffff&text.1.text=${name.name}&text.1.position=southeast&text.1.size=40%&text.1.color=ffffff`
											}
											let g = http.get(l, (s) => {
												s.pipe(f)
												f.on("finish", (err) => {
													api.sendMessage({
														body: "Good morning " + ((data[event.senderID]['gender'] == 1) ? "Ms." : ((data[event.senderID]['gender'] == 6) ? "Mr./Ms." : "Mr.")) + " " + `@${name.firstName}` + ". Have a nice day. Come on, let's have some coffee.",
														mentions: [{
															tag: `@${name.firstName}`,
															id: event.senderID
														}],
														attachment: fs.createReadStream(__dirname + "/morning.jpg").on("end", async () =>{
															if(fs.existsSync(__dirname + "/morning.jpg")){
																fs.unlink(__dirname + "/morning.jpg", (err) => {
																	if(err){
																		console.log(err)
																	}else{
																		console.log("Done")
																	}
																})
															}
														})
													}, event.threadID, event.messageID)
												})
											})
										}else{
											api.setMessageReaction("🍽", event.messageID, (err) => {}, true)
											api.sendMessage({
												body: "Good morning " + ((data[event.senderID]['gender'] == 1) ? "Ms." : ((data[event.senderID]['gender'] == 6) ? "Mr./Ms." : "Mr.")) + " " + `@${name.firstName}` + ". Have a nice day. Come on, let's have some lunch.",
												mentions: [{
													tag: `@${name.firstName}`,
													id: event.senderID
												}]
											}, event.threadID, event.messageID)
										}
									}
								})
							}else if(!selves.includes(event.senderID) && myDay >= 12 && myDay < 18 && !aftie.includes(event.senderID) && (y[z].includes("afternoon") || y[z].includes("aftie") || y[z].includes("hapon"))){
								api.getUserInfo(event.senderID, (err, data) => {
									if(err){
										console.log(err)
									}else{
										let name = data[event.senderID]
										aftie += event.senderID + " "
										if(myDay >= 12 && myDay < 15){
											api.setMessageReaction("🍽", event.messageID, (err) => {}, true)
											api.sendMessage({
												body: "Good afternoon " + ((data[event.senderID]['gender'] == 1) ? "Ms." : ((data[event.senderID]['gender'] == 6) ? "Mr./Ms." : "Mr.")) + ` @${name.firstName}` + ", don't forget to eat your lunch.",
												mentions: [{
													tag: `@${name.firstName}`,
													id: event.senderID
												}]
											}, event.threadID, event.messageID)
										}else{
											api.setMessageReaction("💗", event.messageID, (err) => {}, true)
											api.sendMessage({
												body: "Good afternoon " + ((data[event.senderID]['gender'] == 1) ? "Ms." : ((data[event.senderID]['gender'] == 6) ? "Mr./Ms." : "Mr.")) + " " + `@${name.firstName}` + ". Hoping that you're still okay.",
												mentions: [{
													tag: `@${name.firstName}`,
													id: event.senderID
												}]
											}, event.threadID, event.messageID)
										}
									}
								})
							}else if(!selves.includes(event.senderID) && myDay >= 18 && myDay < 22 && !eve.includes(event.senderID) && (y[z] == "eve" || y[z].includes("gabi") || y[z].includes("evening"))){
								api.setMessageReaction("💗", event.messageID, (err) => {}, true)
								api.getUserInfo(event.senderID, (err, data) => {
									if(err){
										console.log(err)
									}else{
										let name = data[event.senderID]
										eve += event.senderID + " "
										api.sendMessage({
											body: "Good evening " + ((data[event.senderID]['gender'] == 1) ? "Ms." : ((data[event.senderID]['gender'] == 6) ? "Mr./Ms." : "Mr.")) + " " + `@${name.firstName}` + ". It's been a long long day.",
											mentions: [{
												tag: `@${name.firstName}`,
												id: event.senderID
											}]
										}, event.threadID, event.messageID)
									}
								})
							}else if(!selves.includes(event.senderID) && (myDay >= 22 || myDay < 5) && (y[z].includes("night") && !night.includes(event.senderID) && y.length <= 8)){
								api.setMessageReaction("😴", event.messageID, (err) => {}, true)
								api.getUserInfo(event.senderID, (err, data) => {
									if(err){
										console.log(err)
									}else{
										let name = data[event.senderID]
										night += event.senderID + " "
										api.sendMessage({
											body: `Good night and sweet dreams my dear @${name.firstName}. Have a nice rest.`,
											mentions: [{
												tag: `@${name.firstName}`,
												id: event.senderID
											}],
											attachment: fs.createReadStream(__dirname + "/goodnight.gif")
										}, event.threadID, event.messageID)
									}
								})
							}
						}
					}
				}
			break;
			case "message_reply":
				let mess = event.body
				let x = mess.toLowerCase()
				let y = x.split(" ")
				if(event.body != undefined){
					let m = event.body
					let x = m.toLowerCase() 
					if(!selves.includes(event.senderID) && vip.includes(event.messageReply.senderID) && (x.includes("salamat") || x.includes("thank") || x.includes("tnx"))){
						api.setMessageReaction("😻", event.messageID, (err) => {}, true)
						api.getUserInfo(event.senderID, (err, data) => {
							console.log(api.mention)
							api.sendMessage("You're welcome " + data[event.senderID]['name'], event.threadID, event.messageID)
						})
					}else if(!selves.includes(event.senderID) && vip.includes(event.senderID) && (x.includes("duda") || x.includes("sana all") || x.includes("naol") || x.includes("sanaol") || x.includes("naul") || x.includes("sana'll"))){
						api.sendMessage("(2)", event.threadID, event.messageID)
					}else if(!selves.includes(event.senderID) && x.includes("(2)") && vip.includes(event.senderID)){
						api.sendMessage("(3)", event.threadID, event.messageID)
					}else if(x.includes("masaket") || x.includes("peyn") || x.includes("ouch") || x.includes("awts") || x.includes("sakit") || x.includes("pain") || x.includes("pighati")){
						api.setMessageReaction("😥", event.mesaageID, () => {}, true)
						api.sendMessage({
								body: "Kawawa naman",
								attachment: fs.createReadStream(__dirname + "/edamage.jpg")
						}, event.threadID, event.messageReply.messageID)
					}else if(x.startsWith(prefix + "info") && !b_users.includes(event.senderID)){
						api.getUserInfo(parseInt(event.messageReply.senderID),  (err, data) => {
							if(err){
								console.log(err)
							}else{
								let gender = ""
								switch(data[event.messageReply.senderID]['gender']){
									case 1:
										gender = "Female"
									break
									case 2:
										gender = "Male"
									break
									default:
										gender = "Custom"
								}
								let message = "Name: " + data[event.messageReply.senderID]['name'] + "\n"
								message += "Gender: " + gender + "\n"
								message += "Profile Link: " + data[event.messageReply.senderID]['profileUrl']
								api.sendMessage(message, event.threadID, event.messageID)
							}
						})
					}else if(!selves.includes(event.senderID) && (x.includes("cute") || x.includes("kyot"))){
						if(x.includes("april")){
							api.sendMessage({
								body: "Oo ang cute ni April, lalo na dito",
								attachment: fs.createReadStream(__dirname + "/april.jpg")
							}, event.threadID, event.messageID)
						}else if(cute.includes(event.senderID) && x.includes("ako")){
							api.sendMessage({
								body: "Oo, ang cute mo dito.",
								attachment: fs.createReadStream(__dirname + "/april.jpg")
							}, event.threadID, event.messageID)
						}else if(x.includes("rheign kimmy") || x.includes("kimmy") || x.includes("rheign") || x.includes("ulan")){
							api.sendMessage("Oo naman yes, walang duda kids can tell", event.threadID, event.messageID)
						}else{
							api.sendMessage("Kyot ka din naman, kaso mas kyot pa rin si Ulan.",  event.threadID, event.messageID)
						}
					}
				}
				if(mess.startsWith("~Off") && !b_users.includes(event.messageReply.senderID) && vip.includes(event.senderID) && !vip.includes(event.messageReply.senderID)){
					let userID = event.messageReply.senderID
					b_users += userID + " "
					api.getUserInfo(userID, (err, data) => {
						api.sendMessage(`Features OFF for ${data[userID]['name']}`, event.threadID, event.messageID)
					})
				}
				if(mess.startsWith("~On") && b_users.includes(event.messageReply.senderID) && vip.includes(event.senderID) && !vip.includes(event.messageReply.senderID)){
					let userID = event.messageReply.senderID
					let b_u =  b_users.replace(userID + " ", "")
					b_users = b_u
					api.getUserInfo(userID, (err, data) => {
						api.sendMessage(`Features ON for ${data[userID]['name']}`, event.threadID, event.messageID)
					})
				}
			break;
		}
	})
})
