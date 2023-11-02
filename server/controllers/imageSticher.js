import imageSticher from "../models/imageSticher.js";

export const addLinks = async (req,res) => {
    const {image1,
        image2,
        image3,
        image4} = req.body;

    try {
        console.log("check");
        const addImg = await imageSticher.create({
            image1,
            image2,
            image3,
            image4
        })

        res.status(200).json({
            success:true,
            message:"Link Uploaded Sucessfully",
            addImg
        })
        console.log("check");
    } catch (error) {
        res.status(404).json({
            success:false,
            message:error.message,
        })
    }
}

export const getLinks = async (req,res) => {
    const id = req.params.id;
    try {
        const getImg = await imageSticher.find({_id:id});
        res.status(200).json({
            success:true,
            message:"image fetch successfully",
            getImg
        })

    } catch (error) {
        res.status(404).json({
            success:false,
            message:error.message,
        })
    }
}