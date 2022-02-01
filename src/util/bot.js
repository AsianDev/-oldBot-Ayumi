const { ShardingManager } = require("discord.js");
const chalk = require("chalk")
const config = require("../util/Data/config.json")
const manager = new ShardingManager("./index.js",{
    totalShards: 10,
    token: client.token
})

manager.on("shardCreate", async(shard) => {
    console.log(chalk.cyan("[Information]") + chalk.blue(`${new Date()} Spawned ${shard.id}`))
})
manager.spawn()