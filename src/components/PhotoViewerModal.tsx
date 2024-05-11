import { Image, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

interface IPhotoViewerModalProps {
  photoUrl: string | undefined;
  setAuthUsershowPhoto: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PhotoViewerModal: FC<IPhotoViewerModalProps> = ({
  photoUrl,
  setAuthUsershowPhoto,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.700"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  useEffect(() => {
    onOpen();
    return () => {
      onClose();
      setAuthUsershowPhoto((prev) => !prev);
    };
  }, []);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent className="photo-viewer-modal-content">
          <ModalCloseButton />
          <ModalBody className="photo-viewer-modal-body">
            <Image src={photoUrl} minWidth="200px" alt="user avatar"></Image>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
