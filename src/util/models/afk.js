const mongoose = require('mongoose')

const afkSchema = mongoose.Schema(
{
   Guild: String,
   User: String,
   Reason: { type: String, default: "None provided" },
   Date: String
},
)
module.exports = mongoose.model('afk', afkSchema)