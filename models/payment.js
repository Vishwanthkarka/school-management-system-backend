const mongoose = require("mongoose");

const payment = mongoose.Schema({
    sid:{
        type:  mongoose.Schema.ObjectId,
        ref: "user",
    },
    lid:{
        type:  mongoose.Schema.ObjectId,
        ref: "user",
    },
    title:{
type:String    
},
description:{
    type:String,  
},
payedDate:{
    type:Date
} ,
ispaid:{
    type:Boolean,
    default:false
},
    amount:{
        type:Number,
        default:0,
    },
    lastDay:{
        type:Date

    },
    paidDate:{
        type:Date,
    },
    paymentId:{
        type:String,
        
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("payment", payment);