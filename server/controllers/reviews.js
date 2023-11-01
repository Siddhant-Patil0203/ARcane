import reviews from "../models/reviews.js";
import Users from "../models/userModel.js";

export const addComments = async (req,res) => {
    const {comments} = req.body;
    const id = req.params.id;
    const user_Id = req.userId;

    try {
       
        const getuser = await Users.find({_id:user_Id});
        console.log(getuser);
        
        const addComment = await reviews.create({
            propertyId:id,
            userId:req.userId,
            comment:comments,
        })
        res.json({
            success:true,
            message:"review posted",
            addComment
        })

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

export const getComments = async (req,res) => {
    const id = req.params.id;
    
    try {
        const comments = await reviews.find({propertyId:id});
        if(!comments) return res.json({message:"Nothing to fetch"});
        res.json({
            success:true,
            comments
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const updateComments = async (req,res) => {
  
    const id = req.params.id;
    try {
        const updatedComment = await reviews.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
       ) 

       if(!updateComments) return res.status(404).json({success:false,message:"invalid message"});

       res.json({
        success:true,
        message:"comment edited",
        updatedComment
       })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const deleteComments = async (req,res) => {
    const id = req.params.id;
    try {
        const deleted = await reviews.findByIdAndDelete({_id:id});
        if(!deleted) return res.status(404).json({
            success:flase,
            message:"Invalid Id"
        })

        res.status(200).json({
            success:true,
            message:"successfully deleted"
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}


