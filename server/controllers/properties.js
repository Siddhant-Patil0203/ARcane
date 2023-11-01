import properties from "../models/properties.js";

// route /api/v1/properties/fetch
export const getProperties = async (req,res) => {
    try {
        const fetchProp = await properties.find({});
        res.status(200).json({
            success:true,
            fetchProp
        })
    } catch (error) {
        res.status(404).json({
            success:true,
            Message:"Unable to get properties"
        })
    }
}

export const getPropertiesByStatus = async (req,res) => {
    try {
        const fetchProp = await properties.find({status:req.params.status});
        res.status(200).json({
            success:true,
            fetchProp
        })
    } catch (error) {
        res.status(404).json({
            success:true,
            Message:"Unable to get properties"
        })
    }
}

// route /api/v1/properties/Add PROTECTED
export const addProperty = async (req,res) => {
    const {title , image , description, price ,location, size, status, blockchainId} = req.body;
    const userId = req.userId;
    try {
        const addedProp = await properties.create({
            title, image , description, price ,location, size, status, blockchainId, user:userId
        })
        res.status(200).json({
            success:true,
            message:"Property Added Sucessfully",
            addedProp
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export const updateProperty = async (req,res) => {
    try {
        res.json({
            success:true,
            message:"Property updated"
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}


export const deleteProperty = async (req,res) => {
    try {
        res.json({
            success:true,
            message:"Property deleted"
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}