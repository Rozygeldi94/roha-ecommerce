import {
  Box,
  Button,
  Text,
  Tooltip,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { UserAvatar } from "./UserAvatar";
import { MdModeEditOutline } from "react-icons/md";
import { MainContext } from "@/pages/Layout";
import { ChangeEvent, useContext, useState } from "react";
import { useRemoveStorage, useUploadStorage } from "@/hooks/useStorage";

export const EditAvatarBox = () => {
  const { currentUser, databaseUser, authUser, colorMode } =
    useContext(MainContext);
  const {
    isOpen: isViewPhotoModalOpen,
    onOpen: onViewPhotoModalOpen,
    onClose: onViewPhotoModalClose,
  } = useDisclosure();
  const {
    isOpen: isUploadPhotoModalOpen,
    onOpen: onUploadPhotoModalOpen,
    onClose: onUploadPhotoModalClose,
  } = useDisclosure();
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const { isPhotoLoading, setPhoto, uploadPhotoToStorage } = useUploadStorage(
    authUser ? authUser?.uid : ""
  );
  const { removePhotoFromStorage } = useRemoveStorage(authUser?.uid);
  const viewPhotoModalClose = () => {
    onViewPhotoModalClose();
  };
  const uploadPhotoModalClose = () => {
    onUploadPhotoModalClose();
    setUploadedPhoto(null);
    setPhoto(null);
  };

  const handleUploadPhotoToStorage = () =>
    uploadPhotoToStorage(uploadPhotoModalClose);

  const handleRemovePhotoFromStorage = () => {
    removePhotoFromStorage();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedPhoto(URL.createObjectURL(e.target.files[0]));
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <Box
      height="200px"
      padding="15px 0"
      bgImage="/user_profile_bg_img.webp"
      borderRadius="10px"
      position="relative"
    >
      <Box
        width="286px"
        height="100px"
        margin="0 auto"
        bg={colorMode === "light" ? "#f6f6f8" : "#4f4f82"}
        padding="15px"
        display="flex"
        gap="10px"
        alignItems="center"
        borderRadius="10px"
        position="absolute"
        bottom="-40px"
        left="50%"
        transform="translateX(-50%)"
        zIndex="2"
      >
        <Box position="relative">
          <UserAvatar
            currentUser={currentUser}
            databaseUserAvatar={databaseUser?.user_avatar}
            isRealUser={true}
            width="75px"
            height="75px"
            borderRadius="6px"
            onOpen={onViewPhotoModalOpen}
          />
          <Modal isOpen={isViewPhotoModalOpen} onClose={viewPhotoModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Your avatar</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Image
                  margin="0 auto"
                  src={
                    databaseUser?.user_avatar || authUser?.photoURL
                      ? databaseUser?.user_avatar ||
                        (authUser?.photoURL as string)
                      : ""
                  }
                  alt="User avatar"
                />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={viewPhotoModalClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Flex
            padding="0 5px"
            color="#fff"
            fontSize="0.8rem"
            borderRadius="8px"
            position="absolute"
            bottom="-8px"
            left="50%"
            transform="translateX(-50%)"
          >
            <Menu>
              <MenuButton
                as={Button}
                size="xs"
                colorScheme="blue"
                leftIcon={<MdModeEditOutline size="17px" />}
              >
                Edit
              </MenuButton>
              <MenuList padding="0">
                <MenuItem
                  color="#fff"
                  fontWeight="600"
                  bg="#987171"
                  _hover={{ backgroundColor: "#437444" }}
                  onClick={onUploadPhotoModalOpen}
                >
                  Upload a photo
                </MenuItem>
                <Divider />
                <Tooltip
                  label={
                    !databaseUser?.user_avatar
                      ? "You can't remove your default avatar!"
                      : ""
                  }
                >
                  <MenuItem
                    color="#fff"
                    fontWeight="600"
                    bg="#987171"
                    isDisabled={!databaseUser?.user_avatar}
                    _hover={{ backgroundColor: "#437444" }}
                    onClick={handleRemovePhotoFromStorage}
                  >
                    Remove photo
                  </MenuItem>
                </Tooltip>

                <Modal
                  isOpen={isUploadPhotoModalOpen}
                  onClose={uploadPhotoModalClose}
                >
                  <ModalOverlay />
                  <ModalContent margin="64px 15px">
                    <ModalHeader>Upload a photo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                      />
                      <Image
                        margin="10px auto 0 auto"
                        maxW={{ base: "250px", isLargerThan360: "300px" }}
                        src={uploadedPhoto ? uploadedPhoto : ""}
                      />
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        mr="5px"
                        colorScheme="green"
                        isLoading={isPhotoLoading}
                        loadingText="Saving..."
                        onClick={handleUploadPhotoToStorage}
                      >
                        Save
                      </Button>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={uploadPhotoModalClose}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </MenuList>
            </Menu>
          </Flex>
        </Box>

        <Box display="flex" alignItems="center" gap="10px">
          <Box>
            <Text fontSize="1.1rem" fontWeight="600">
              {`${currentUser?.first_name} ${currentUser?.last_name}`}
            </Text>
            <Text fontSize="0.8rem">{currentUser?.user_email}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
