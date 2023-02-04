const { SlashCommandBuilder } = require('discord.js');
const { VoiceConnectionStatus, AudioPlayerStatus, joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
//https://youtube4kdownloader.com/
module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("supermamada galaxiaaaaaaaaaal xdddddddd"),

    async execute(client, interaction){

        const voiceChannel = client.channels.cache.get(process.env.DEFAULT_VOICECHANNEL);
        const guildId = process.env.DEFAULT_GUILDID;
        const player = createAudioPlayer();

        player.on(AudioPlayerStatus.Playing, () => { console.log('audio player: playing')});
        player.on('error', error => { console.log(`error: ${error}`)});

        const resource = createAudioResource(process.cwd()+'/media/sounds/smg.mp3');
        player.play(resource);

        const connection = joinVoiceChannel({
            channelId: process.env.DEFAULT_VOICECHANNEL,
            guildId: guildId,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        interaction.reply("toma tu super mamada galaxial");

        const subscription = connection.subscribe(player);
        if(subscription){ setTimeout(() => subscription.unsubscribe(), 15_000);}
    }
}