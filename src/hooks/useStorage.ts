import { useToast } from "@chakra-ui/react";
import { set, ref as databaseRef, update, remove } from "firebase/database";
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { database, storage } from "@/firebase/firebaseConfig";

type TUploadPhotoToStorageFn = () => void;

export const useUploadStorage = (uid: string) => {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const toast = useToast();

  const uploadPhotoToStorage = async (
    uploadPhotoModalClose: TUploadPhotoToStorageFn
  ) => {
    try {
      if (!photo) {
        toast({
          title: "No photo selected",
          description: "Please select a photo to upload",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      setIsPhotoLoading(true);
      const fileRef = storageRef(storage, "avatars/" + uid);
      await uploadBytes(fileRef, photo);

      const avatarURL = await getDownloadURL(fileRef);

      update(databaseRef(database, "users/" + uid), {
        user_avatar: avatarURL,
      });

      setIsPhotoLoading(false);
      uploadPhotoModalClose();
      toast({
        title: "Photo uploaded!",
        position: "top",
        duration: 4000,
        status: "success",
      });
    } catch (error) {
      uploadPhotoModalClose();
      toast({
        title: (error as Error).message,
        position: "top",
        duration: 4000,
        status: "success",
      });
    } finally {
      setIsPhotoLoading(false);
    }
  };

  return { isPhotoLoading, setPhoto, uploadPhotoToStorage };
};

export const useRemoveStorage = (uid: string | undefined) => {
  const toast = useToast();
  const [isRemoveLoading, setRemoveLoading] = useState(false);

  const removePhotoFromStorage = async () => {
    try {
      if (
        confirm("Are you sure you want to reset your current avatar?") === true
      ) {
        setRemoveLoading(true);
        await deleteObject(storageRef(storage, "avatars/" + uid))
          .then(() => {
            toast({
              title: "Your avatar removed!",
              position: "top",
              duration: 4000,
              status: "success",
            });
          })
          .catch((error) => {});
        remove(databaseRef(database, `users/${uid}/user_avatar`));
        setRemoveLoading(false);
      }
    } catch (error) {
    } finally {
      setRemoveLoading(false);
    }
  };

  return { isRemoveLoading, removePhotoFromStorage };
};
