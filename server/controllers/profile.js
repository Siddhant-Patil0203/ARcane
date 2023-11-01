import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import userModel from "../models/userModel.js";
dotenv.config();

export const updateAccount = async (req, res) => {
  const email = req.email;
  const newData = req.body;

  const result = await userModel.updateOne({ email: email }, { $set: newData });

  const newResult = await userModel.findOne({ email });

  console.log(newResult);
  if (result) {
    res.json({ result: newResult });
  }
};
