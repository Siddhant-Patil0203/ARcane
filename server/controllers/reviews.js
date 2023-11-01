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
    res.send("Fetched");
}

export const updateComments = async (req,res) => {
    res.send("updated");
}

export const deleteComments = async (req,res) => {
    res.send("deleted")
}


