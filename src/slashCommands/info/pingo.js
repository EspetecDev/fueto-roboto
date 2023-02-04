const { SlashCommandBuilder } = require('discord.js');
const { VoiceConnectionStatus, AudioPlayerStatus, joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("pingo pingo pingo"),

    async execute(client, interaction){

        const voiceChannel = client.channels.cache.get(process.env.DEFAULT_VOICECHANNEL);
        const guildId = process.env.DEFAULT_GUILDID;
        const player = createAudioPlayer();

        player.on(AudioPlayerStatus.Playing, () => { console.log('audio player: playing')});
        player.on('error', error => { console.log(`error: ${error}`)});

        const resource = createAudioResource(process.cwd()+'/media/sounds/pingo.mp3');
        player.play(resource);

        const connection = joinVoiceChannel({
            channelId: process.env.DEFAULT_VOICECHANNEL,
            guildId: guildId,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        interaction.reply("toma tu pingo");

        const subscription = connection.subscribe(player);
        if(subscription){ setTimeout(() => subscription.unsubscribe(), 15_000);}
    }
}