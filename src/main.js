(async function () {
    require('dotenv').config();
    const { Client, GatewayIntentBits, Events } = require('discord.js');

    const client = new Client({ intents:[
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    });

    client.on(Events.ClientReady, () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    await client.login(process.env.CLIENT_TOKEN);

    const channel = await client.channels.fetch(process.env.CHANNEL_ID)

    let messages = await channel.messages.fetch({limit: 10, after: process.env.MESSAGE_CURSOR})

    messages.forEach(message => console.log(message.content))
})();