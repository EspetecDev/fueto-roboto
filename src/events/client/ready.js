module.exports = client => {
    console.log(`logged in as ${client.user.tag}`);

    if(client?.application?.commands){
        client.application.commands.set(client.slashArray);
        console.log(`${client.slashCommands.size} published slash commands`);
    }
}

