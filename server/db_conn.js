const mongoose = require('mongoose')

const uri = "mongodb+srv://thehactivists:thehactivists@cluster0.i2p5o9k.mongodb.net/?retryWrites=true&w=majority/eventFlow";
module.exports = ()=>{
    mongoose.connect(uri,()=>{
})
}
