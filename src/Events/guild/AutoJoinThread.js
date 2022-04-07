const Event = require('../../Handlers/Event.js');
const Discord = require('discord.js')
module.exports = new Event(
'threadCreate',
async(client, thread) => {

    try{
        if(thread.joinable && !thread.joined){
            await thread.join();
        }
    }catch (e){
        console.log(e)
    }

})
