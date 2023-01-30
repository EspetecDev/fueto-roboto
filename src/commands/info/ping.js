module.exports = {
    DESCRIPTION: "pingooooo",

    async execute(client, message, args, prefix){
        return message.reply(`\`${client.ws.ping}ms\``);
    }
}