import mongoose from "mongoose";

// yet to add required
const reviewsSchema = new mongoose.Schema({
    propertyId : {  // who params
        type:String
    },
    userName:{
        type:String
    },
    userId:{    // middleware
        type:String,
    },
    comment:{ 
        type:String,
    },
    likes:{
        type:Number,
        default:0
    }
});

export default mongoose.model("reviews",reviewsSchema);