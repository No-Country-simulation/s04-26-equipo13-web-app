// Client: conexión principal con Discord
// GatewayIntentBits: enum de permisos que el bot necesita
// Events: enum de tipos de eventos que Discord emite

const { Client, GatewayIntentBits, Events } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, //permiso a ver el server
        GatewayIntentBits.GuildMessages, //permiso a mensajes de los niembros
        GatewayIntentBits.MessageContent //permiso a el contenido de los mensajes
    ]
});

async function collectMessages(token, channelId) {
    // 1. Conectar el bot a Discord
    await client.login(token);

    // 2. Esperar a que el bot esté listo
    await new Promise(resolve => {
        client.once(Events.ClientReady, () => {
            console.log("Bot conectado como:", client.user.tag);
            resolve();
        });
    });

    // 3. Buscar el canal por ID
    const channel = await client.channels.fetch(channelId);

    // 4. Traer los últimos 100 mensajes
    const messages = await channel.messages.fetch({ limit: 100 });
    //TODO filtrar po semana Hacer alguna logica para filtrar por semana (el sistema se activa los viernes)

    // 5. Convertir a un array simple con los datos que nos interesan
    const result = messages.map(msg => ({

        author: msg.author.username,
        content: msg.content,
        date: msg.createdAt,
        reactions: msg.reactions.cache.size
        
    }));

    // 6. Desconectar el bot
    client.destroy();

    return result;
}

// Exportar la función para usarla desde index.js
module.exports = { collectMessages };
