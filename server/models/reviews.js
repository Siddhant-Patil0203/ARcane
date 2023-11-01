import mongoose from "mongoose";

// yet to add required
const reviewsSchema = new mongoose({
    propertyId : {
        type:String
    },
    userId:{
        type:String,
    },
    reviews:{
        type:[String],
    },
    likes:{
        type:Number
    }
})

const Reviews = mongoose.model("Properties",reviewsSchema);

export default Reviews;