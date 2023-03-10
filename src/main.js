(async function () {
    require('dotenv').config()
    const { Client, GatewayIntentBits } = require('discord.js')

    const client = new Client({ intents:[
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    })

    await client.login(process.env.CLIENT_TOKEN);

    const channel = await client.channels.fetch(process.env.CHANNEL_ID)

    let messages = await channel.messages.fetch({limit: 100, after: process.env.MESSAGE_CURSOR})

    let movies = []
    let messageIds = []
    let cursor = -1;

    while(messages.size > 0) {
        messages.forEach(message => {
            if ( message.embeds && message.embeds[0] && message.embeds[0].title) {
                movies.push(message.embeds[0].title)
            }
            messageIds.push(message.id)
        })
        cursor = messageIds.shift();
        messageIds = [];

        messages = await channel.messages.fetch({limit: 100, after: cursor})
    }
    console.log(movies.join('\n').replaceAll(/\([A-Za-z 0-9]+\) - IMDb/g, ""))

    client.destroy()

})();