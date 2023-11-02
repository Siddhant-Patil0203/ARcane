import { React, useEffect, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spacer,
} from "@nextui-org/react";
import { ImHome } from "react-icons/im";
import UploadBottonComp from "./UploadBottonComp";
import PanoUploadBotton from "./PanoUploadBotton";
import Upload3dModel from "./Upload3dModel";
import { Md360 } from "react-icons/md";

export default function PropertyForm({
  form,
  handleChange,
  handleSumbmit,
  isLoading,
  text = "Add New Property",
  width = "w-[200px]",
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imgLink, setImgLink] = useState();
  const [link1, setLink1] = useState();
  const [link2, setLink2] = useState();
  const [link3, setLink3] = useState();
  const [link4, setLink4] = useState();
  console.log(form);

  useEffect(() => {
    console.log(form);
    form.image = imgLink;
    form.link1 = link1;
    form.link2 = link2;
    form.link3 = link3;
    form.link4 = link4;
  }, [imgLink, link1, link2, link3, link4]);

  return (
    <>
      <Button onPress={onOpen} className={` ${width}`}>
        {text}
        {text === "Add New Property" ? <ImHome /> : null}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Spacer y={1400} />
              <ModalHeader>{Text}</ModalHeader>
              <ModalBody>
                <div>
                  <form>
                    <Input
                      type="text"
                      label="title"
                      name="title"
                      id="title"
                      value={form.title}
                      onChange={handleChange}
                      isRequired
                      variant="underlined"
                      className="mt-3"
                    />
                    <Textarea
                      label="Description"
                      labelPlacement="inside"
                      placeholder="Enter your Property description"
                      name="description"
                      id="description"
                      value={form.description}
                      onChange={handleChange}
                      className="mt-3"
                    />
                    <h1 className="text-xl font-bold">Upload Image</h1>
                    {imgLink ? (
                      <div className="flex flex-col w-full justify-center">
                        <img
                          src={imgLink}
                          alt="img"
                          width={100}
                          className="
                        object-cover
                        rounded-lg
                        m-2
                        "
                        />
                        <Button color="danger" onClick={() => setImgLink()}>
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <UploadBottonComp handelChange={setImgLink} />
                    )}
                    <Input
                      type="text"
                      label="location"
                      name="location"
                      id="location"
                      value={form.location}
                      onChange={handleChange}
                      isRequired
                      variant="underlined"
                      className="mt-3"
                    />
                    <Input
                      type="text"
                      label="size"
                      name="size"
                      id="size"
                      value={form.size}
                      onChange={handleChange}
                      isRequired
                      variant="underlined"
                      className="mt-3"
                    />
                    <Input
                      type="number"
                      label="price"
                      name="price"
                      id="price"
                      value={form.price}
                      onChange={handleChange}
                      isRequired
                      variant="underlined"
                      className="mt-3 mb-3"
                    />
                    <h1 className="text-xl font-bold flex">
                      Create 360
                      <Md360 size={25} className="ml-2" />
                    </h1>
                    <p className="text-sm text-gray-500">
                      Upload 4 images to create 360 view
                    </p>
                    {link1 ? (
                      <div className="flex flex-col w-full justify-center">
                        <img
                          src={link1}
                          alt="img"
                          width={100}
                          className="
                        object-cover
                        rounded-lg
                        m-2
                        "
                        />
                        <Button color="danger" onClick={() => setLink1()}>
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <PanoUploadBotton setLink={setLink1} />
                    )}
                    <Spacer y={1} />
                    {link2 ? (
                      <div className="flex flex-col w-full justify-center">
                        <img
                          src={link2}
                          alt="img"
                          width={100}
                          className="
                        object-cover
                        rounded-lg
                        m-2
                        "
                        />
                        <Button color="danger" onClick={() => setLink2()}>
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <PanoUploadBotton setLink={setLink2} />
                    )}{" "}
                    <Spacer y={1} />
                    {link3 ? (
                      <div className="flex flex-col w-full justify-center">
                        <img
                          src={link3}
                          alt="img"
                          width={100}
                          className="
                        object-cover
                        rounded-lg
                        m-2
                        "
                        />
                        <Button color="danger" onClick={() => setLink3()}>
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <PanoUploadBotton setLink={setLink3} />
                    )}
                    <Spacer y={1} />
                    {link4 ? (
                      <div className="flex flex-col w-full justify-center">
                        <img
                          src={link4}
                          alt="img"
                          width={100}
                          className="
                        object-cover
                        rounded-lg
                        m-2
                        "
                        />
                        <Button color="danger" onClick={() => setLink4()}>
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <PanoUploadBotton setLink={setLink4} />
                    )}
                    <h1 className="text-xl font-bold flex">
                      Upload 3D Model
                      <Md360 size={25} className="ml-2" />
                    </h1>
                    <p className="text-sm text-gray-500">
                      Upload 3D model in GLB format
                    </p>
                    <Upload3dModel />
                  </form>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  isLoading={isLoading}
                  onClick={handleSumbmit}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
