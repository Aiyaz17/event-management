const mongoose=require('mongoose')


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email field is required"],
        unique:true,
        
    },
    name:{
        type:String,
        required:[true,"Name field is required"]
    },
    phone:{
        type:String,
        required:[true,"Phone no field is required"],
    },
   
    roles:{
        type:String,
        required:true,
        default:"user",
        enum:["general_committee","committee","dean","faculty","user"],

},
password:{
    type:String,
    required:true
},
registered_events:[
    {
        type:mongoose.Schema.ObjectId,
        ref:"Event"
    }
]

})

/* userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    
       
    const hash = await bcrypt.hash(this.password,10)
    this.password=hash
    this.passwordConfirm=undefined

   
   next()

})
userSchema.pre('save',async function(next){
   if(this.id==='63bb0fa50df0b831f34e98a6') return next()
   if(this.roles==='admin') return next(new AppError('You are not the admin'))
   next()

}) */



const User = mongoose.model('User',userSchema)
module.exports = User