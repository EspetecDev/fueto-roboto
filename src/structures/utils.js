const { glob } = require('glob');
const { promisify } = require('util');
const progGlob = promisify(glob);

module.exports = class BotUtils{
    constructor(client){
        this.client = client;
    }

    // reload local js cache
    async loadFiles(dir){
        const files = await progGlob(`${process.cwd().replace(/\\/g, "/")}/${dir}/**/*.js`);
        files.forEach((file) => delete require.cache[require.resolve(file)]);
        return files;
    }
}