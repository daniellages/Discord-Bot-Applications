//
//  Created By: daniellages and LiTO773
//  Date: 15/02/2020 (dd/mm/yy)
//
//  For any questions regarding this bot: Add me on discord => Ted#9580
//  Hargus RP discord server => https://discord.gg/f6XPw72
//

const Discord = require('discord.js');
const client = new Discord.Client();

let writing = -1                                                // Array's position (-1 means that he is doing nothing)
// Change the outgoing messages as you wish, you can add more as well
let category = ['Channel', 'Subject', 'Responsible', 'Message'] // Outgoing Messages 
let arguments = []                                              // Array with the Inputs
let denied = false                                            // denied or Approved

client.on('ready', () => {
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: 'Hargus RP', // <-- The game that it is playing
            type: 0            // <-- This means that the bot is Playing
        }
    });
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (
        msg.channel.id === '471754278676070400'     &&  //This bot will only work in a specific channel, you can change this by putting the ID of the channel that you want
        (msg.member.user.id === '236169317706629130' || //The bot will only reply to this 3 people IDs (you should change this IDs and you can add more)
        msg.member.user.id === '236839966682906624' ||
        msg.member.user.id === '190884930551545856')
        ) {
        if (msg.content === '^denied' || msg.content === '^approved') { //To start the bot type ^denied or ^approved
            denied = msg.content === '^denied'
            writing = 0
            msg.channel.send('> ' + category[writing] + ':')
        } else if (writing !== -1 && msg.content.toUpperCase() === 'CANCEL'){   //You can cancel the bot anytime by typing Cancel or cancel or even CaNcEl and so on...
            writing = -1
            msg.channel.send('> Bye bye 👋')
        } else if (writing !== -1 && writing < category.length) {
            let validation = validateContent(writing, msg.content)

            if (validation !== null) {
                arguments[writing] = validation
                writing++
            } else {
                msg.channel.send('> Input Error 🤷‍♂️ \n> **Try again!**')   //error message
            }

            // If there is still arguments left, keep asking
            if (writing !== category.length) {
                msg.channel.send('> ' + category[writing] + ':')
            } else {
                // Everything is done, send the message
                writing = -1
                console.log('message sent') // Message on the terminal
                
                // Message Content
                const embed = {
                    "title": denied ? "Application Denied! ❌" : "Application Approved! ✔",  //title
                    "color": denied ? 15270441 : 2667619, //color
                    "thumbnail": {
                        //images
                        "url": denied ? "https://w0.pngwave.com/png/490/44/denied-png-clip-art.png" : "https://copdnewstoday.com/wp-content/uploads/2020/01/shutterstock_570636568-1400x480@2x.jpg"
                    },
                    "fields": [
                    {
                        "name": denied ? "> Member denied:" : "> Member Approved:",
                        "value": arguments[1]
                    },
                    {
                        "name": denied ? "> denied by:" : "> Approved by:",
                        "value": arguments[2]
                    },
                    {
                        "name": "> Message:",
                        "value": "```yaml\n" + arguments[3] + "\n```"
                    }
                    ]
                }

                msg.guild.channels.get(arguments[0].split('<#')[1].split('>')[0]).send({ embed })
            }
        }
    }
});

/**
 * Validation of the input content
 * @return Valid content or NULL
 * @param {number} index Array's position
 * @param {string} content Content
 */
let validateContent = (index, content) => {
    if (index === 0) {
        let regex = new RegExp('^<#[0-9]+>$')
        return regex.test(content) ? content : null
    } else if (index === 1 || index === 2) {
        let regex = new RegExp('[0-9]+')
        return regex.test(content) ? '<@!' + content + '>' : null
    }
    return content
}

// Insert your discord bot TOKEN here!!!
client.login('Njc3NjMzNjUxMTAxNDAxMDkx.XkrMuA.p9pdm9hj9jbp0yYX22QYcolw7ig');