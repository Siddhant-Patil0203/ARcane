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
} from "@nextui-org/react";
import { ImHome } from "react-icons/im";
import UploadBottonComp from "./UploadBottonComp";

export default function PropertyForm({
  form,
  handleChange,
  handleSumbmit,
  isLoading,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imgLink, setImgLink] = useState("");

  useEffect(() => {
    console.log(imgLink);
    handleChange({ target: { name: "image", value: imgLink } });
  }, [imgLink]);

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
                        <Button color="danger" onClick={() => setImgLink("")}>
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <UploadBottonComp setImgLink={setImgLink} />
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
                      className="mt-3"
                    />  
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
