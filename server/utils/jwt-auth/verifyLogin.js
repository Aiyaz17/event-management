const catchAsync = require("../error-handling/catchAsync");
const util = require('util')
const jwt = require('jsonwebtoken');
const User = require("../../models/User");
module.exports = catchAsync(async (req,res,next)=>{
    let token=''
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        token=req.headers.authorization.split(' ')[1]
        
    }
    
    if(!token){
        return next()
    }

    console.log(token)
    const decoded = await util.promisify(jwt.verify)(token,"Problem statement dusra hain")
    
    req.user = decoded
    const newUser = await User.findById(decoded.id)
    return res.status(200).json({
        status:"Success",
        newUser

    })
    
    

})

