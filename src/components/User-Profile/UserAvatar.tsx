import { Image } from "@chakra-ui/react";
import React, { FC } from "react";
import { ICurrentUser } from "@/types/currentUser.types";
import { DocumentData } from "firebase/firestore";

interface IUserAvatarProps {
  currentUser: ICurrentUser | DocumentData | null;
  databaseUserAvatar: string | undefined;
  isRealUser: boolean;
  minWidth: string;
  height: string;
  borderRadius: string;
  onOpen?: () => void;
  setAuthUsershowPhoto?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserAvatar: FC<IUserAvatarProps> = ({
  currentUser,
  databaseUserAvatar,
  isRealUser,
  minWidth,
  height,
  borderRadius,
  onOpen,
  setAuthUsershowPhoto,
}) => {
  const handleClick = () => {
    if (borderRadius === "6px" && onOpen) {
      onOpen();
    }
    if (setAuthUsershowPhoto) {
      setAuthUsershowPhoto((prev) => !prev);
    }
  };

  return (
    <>
      {databaseUserAvatar?.length ? (
        <Image
          minWidth={minWidth}
          height={height}
          objectFit="cover"
          src={databaseUserAvatar}
          borderRadius={borderRadius}
          cursor="pointer"
          onClick={handleClick}
          alt="user-avatar"
        />
      ) : isRealUser ? (
        <Image
          src={
            currentUser?.gender === "male"
              ? "/output-male-min.png"
              : "/output-female-min.png"
          }
          minWidth={minWidth}
          height={height}
          alt="user-avatar"
        />
      ) : (
        <Image src="/robot_avatar_min.png" height={height} alt="robot-avatar" />
      )}
    </>
  );
};
