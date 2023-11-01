import favourites from "../models/favourites.js";
import properties from "../models/properties.js";


// api/v1/fav/addFav/:id  (PROTECTED) 
export const addFav = async (req,res) => {
    const id = req.params.id;
    const user_Id = req.userId;

    try {
        const fetchFavv = await properties.findById({_id:req.params.id});
        const addFavv = await favourites.create({
            propertyId: id,
            userId:user_Id,
            title:fetchFavv.title,
            image:fetchFavv.image,
            description:fetchFavv.description,
            price:fetchFavv.price,
            location:fetchFavv.location,
            size:fetchFavv.size,
            status:fetchFavv.status,
            blockchainId:fetchFavv.blockchainId,
            ListingDate:fetchFavv.ListingDate
        })
        res.json({
            success:true,
            message : "Favourite Added",
            addFavv
        })
    } catch (error) {
        res.json({
            success:false,
            message : error.message
        })
    }
}

// api/v1/fav/getFav (PROTECTED)
export const getFavProperties = async (req,res) => {
    const user_Id = req.userId;

    try {
        const getWishlistedProperties = await favourites.find({userId:user_Id});
        res.json({
            success:true,
            message:"Fetched Fav",
            getWishlistedProperties
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


// api/v1/fav/remFav/:id (PROTECTED)
export const remFav = async(req,res) =>{
    const id = req.params.id;
    try {
        const deleteFav = await favourites.deleteOne({propertyId:id});
        
        res.json({
            success:true,
            message:"Favourite Removed",
            deleteFav
        })
    } catch (error) {
        res.json({
            success:true,
            message:error.message
        })
    }
   
}

