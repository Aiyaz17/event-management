const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    subtitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    timestamp:{
        type:Date,
        required:true,
        
    },
    venue:{
        type:String,
        required:true,
        
    },
    register_users:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        default:[]
        
    },
    approval:{
        dean:{
            type:Boolean,
            default:false
        },
        general_committee:{
            type:Boolean,
            default:false
        },
        facultyCount:{
            type:Number,
            default:0
        },
        faculty:{
            type:Boolean,
            default:false
        },
    }

})



module.exports = mongoose.model('Event',eventSchema)