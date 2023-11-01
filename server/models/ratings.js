import mongoose from "mongoose";

const ratingSchema = new mongoose.model({
    propertyId:{
        type:String,
    },
    userId:{
        type:String,
    },
    rating:{
        type:Number,
    },
    total:{
        type:Number,
    }
})

const Ratings = mongoose.model("Ratings",ratingSchema);

export default Ratings;