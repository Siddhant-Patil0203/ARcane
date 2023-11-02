import { React, useState } from "react";
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
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imgLink, setImgLink] = useState();
  const [paranomaLink, setParanomaLink] = useState();
  const [thereedModelLink, setthereedModelLink] = useState();

  console.log(imgLink);
  console.log(paranomaLink);

  return (
    <>
      <Button onPress={onOpen} className="mt-4 w-[200px]">
        Add New Property
        <ImHome />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Spacer y={750} />
              <ModalHeader>Add New Property</ModalHeader>
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
                    {paranomaLink ? (
                      <div className="flex flex-col w-full justify-center">
                        {paranomaLink.map(
                          (img) => (
                            console.log(img),
                            (
                              <img
                                src={img}
                                alt="img"
                                width={100}
                                className="
                        object-cover
                        rounded-lg
                        m-2
                        "
                              />
                            )
                          )
                        )}
                        <Button
                          color="danger"
                          onClick={() => setParanomaLink()}
                        >
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <PanoUploadBotton
                        handelChange={setParanomaLink}
                        data={paranomaLink}
                      />
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
