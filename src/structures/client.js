const { Client, GatewayIntentBits, Partials, ActivityType, PresenceUpdateStatus, Collection } = require("discord.js");
const BotUtils = require("./utils");

module.exports = class extends Client {
    constructor(options = {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates
        ],
        partials: [Partials.User, Partials.Channel, Partials.GuildMember],
        allowedMentions : {
            parse: ["roles", "users"],
            repliedUser: false,
        },

        presence: {
            activities: [{name: process.env.STATUS, type: ActivityType[process.env.STATUS_TYPE]}],
            status: PresenceUpdateStatus.Online
        },

    }) {
        super({
            ...options
        });

        this.commands = new Collection();
        this.slashCommands = new Collection();
        this.slashArray = [];

        this.utils = new BotUtils(this);

        this.start();
    }

    async start(){
        await this.loadHandlers();
        await this.loadEvents();
        await this.loadCommands();
        await this.loadSlashCommands();

        this.login(process.env.BOT_TOKEN);
    }
    
    async loadCommands(){
        console.log(` loading commands`);
        await this.commands.clear();

        const filedir = await this.utils.loadFiles('/src/commands');
        if(filedir.length){
            filedir.forEach((dir) => {
                try {
                    const command = require(dir);
                    const commandName = dir.split("\\").pop().split("/").pop().split(".")[0];
                    command.name = commandName;
                    if(commandName)
                        this.commands.set(commandName, command);
                } catch (e) {
                    console.log(`error loading: ${dir}`);
                    console.log(e);
                }
            }) 
        }

        console.log(`${this.commands.size} loaded commands`)
    }

    async loadSlashCommands(){
        console.log(` loading slash commands`);
        await this.slashCommands.clear();
        this.slashArray = [];

        const filedir = await this.utils.loadFiles('/src/slashCommands');
        if(filedir.length){
            filedir.forEach((dir) => {
                try {
                    const command = require(dir);
                    const commandName = dir.split("\\").pop().split("/").pop().split(".")[0];
                    command.CMD.name = commandName;
                    if(commandName)
                        this.slashCommands.set(commandName, command);

                    this.slashArray.push(command.CMD.toJSON());
                } catch (e) {
                    console.log(`error loading: ${dir}`);
                    console.log(e);
                }
            }) 
        }

        console.log(`${this.slashCommands.size} loaded slash commands`);

        if(this?.application?.commands){
            this.application.commands.set(this.slashArray);
            console.log(`${this.slashCommands.size} published slash commands`);
        }
    }

    async loadHandlers(){
        console.log(` loading handlers`);
        const filedir = await this.utils.loadFiles('/src/handlers');

        if(filedir.length){
            filedir.forEach((dir) => {
                try {
                    require(dir)(this);
                } catch (e) {
                    console.log(`error loading: ${dir}`);
                    console.log(e);
                }
            }) 
        }

        console.log(`${filedir.length} loaded handlers`)
    }

    async loadEvents(){
        console.log(` loading events`);
        const filedir = await this.utils.loadFiles('/src/events');
        this.removeAllListeners();
        if(filedir.length){
            filedir.forEach((dir) => {
                try {
                    const event = require(dir);
                    const eventName = dir.split("\\").pop().split("/").pop().split(".")[0];

                    this.on(eventName, event.bind(null, this));
                    
                } catch (e) {
                    console.log(`error loading: ${dir}`);
                    console.log(e);
                }
            }) 
        }

        console.log(`${filedir.length} loaded events`)
    }
}