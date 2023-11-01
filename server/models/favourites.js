import mongoose from "mongoose";

// yet to add required
const favouriteSchema = new mongoose({
    propertyId : {
        type:String
    },
    userId:{
        type:String,
    }
})

const Favourites = mongoose.model("Properties",favouriteSchema);

export default Favourites;