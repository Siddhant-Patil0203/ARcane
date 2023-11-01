import mongoose from "mongoose";

// yet to add required
const favouriteSchema = new mongoose.Schema({
    propertyId : { //from params
        type:String
    },
    userId:{ //from middleware
        type:String, 
    },
    title:{
        type:String,
    },
    image:{
        type:String,
    },
    description:{
        type:String,
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    size:{
        type:String
    },
    status:{
        type:String,
        default:"Listed",
    },
    blockchainId:{
        type:String,
    },
    ListingDate:{
        type : Date,
        default : Date.now,
    },
    
})

export default mongoose.model("Favourites",favouriteSchema);
