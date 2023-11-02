// import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { Textarea, Button, Input } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import { Form, Mentions, Space } from "antd";
const { getMentions } = Mentions;
import { Divider } from "@nextui-org/react";    

import state from "../contexts/CanvasContext";
import {Card, CardHeader, CardBody, CardFooter, Avatar} from "@nextui-org/react";

import { Layout } from "./Layout";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../contexts/motion";

const Reviews = () => {
  const snap = useSnapshot(state);
  const location = useLocation();
  const propData = location.state;
  console.log(location);

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log("Submit:", values);
    } catch (errInfo) {
      console.log("Error:", errInfo);
    }
  };
  const checkMention = async (_, value) => {
    const mentions = getMentions(value);
    if (mentions.length < 2) {
      throw new Error("More than one must be selected!");
    }
  };
  return (
    <div className="container m-5 p-10 justify-center mx-auto h-fit">
      <p className="font-bold text-xl mb-10">Reviews & Comments</p>

      <Input  label="Add Your Comment" className="lg:w-1/2 my-3"></Input>
      <Textarea
        
        labelPlacement="outside"
        placeholder="Enter your comment description"
        className="w-full lg:w-[50%]"
        minRows={4}
      />
       <Button color="primary" variant="solid" className="mr-3 mt-3">
        Submit
      </Button>
      <Button color="danger" variant="bordered" >
        Reset
      </Button>
      <Divider className="my-4" />
      <p className="font-bold text-xl mb-10">Buyer's Review</p>
      <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
          </div>
        </div>
     
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
        </p>
        <span className="pt-2">
          #FrontendWithZoey 
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Likes</p>
        </div>
      
      </CardFooter>
    </Card>
    </div>
  );
};

export default Reviews;
