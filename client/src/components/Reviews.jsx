// import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { Button } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import {  Form, Mentions, Space } from "antd";
const { getMentions } = Mentions;
import {Divider} from "@nextui-org/react";

import state from "../contexts/CanvasContext";

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
    <Form form={form} layout="horizontal" onFinish={onFinish}>
        <p className="mt-10 ml-36 font-bold text-2xl dark:text-white">Reviews & Ratings</p>

        <p className="mt-10 ml-[30%] font-bold text-lg dark:text-white">Add Your Comment</p>
 
      <Form.Item
        name="title"
        label="Title"
        className="mt-5 dark:text-white"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        rules={[
          {
            validator: checkMention,
          },
        ]}
      >
        <Mentions
       
          rows={1}
          options={[
            {
              value: "afc163",
              label: "afc163",
            },
            {
              value: "zombieJ",
              label: "zombieJ",
            },
            {
              value: "yesmeck",
              label: "yesmeck",
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Mentions
        className=""
          rows={3}
          placeholder="You can use @ to ref user here"
          options={[
            {
              value: "afc163",
              label: "afc163",
            },
            {
              value: "zombieJ",
              label: "zombieJ",
            },
            {
              value: "yesmeck",
              label: "yesmeck",
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 14,
          offset: 6,
        }}
      >
        <Space wrap>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
      <Divider className="my-4" />
    </Form>
  );
};

export default Reviews;
