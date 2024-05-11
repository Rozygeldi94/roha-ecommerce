import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FC, useContext, useState } from "react";
import { DatabaseContext } from "./Product";
import { MainContext } from "@/pages/Layout";
import { IDatabaseUser } from "@/types/databaseUser.type";
import { IComment } from "@/types/productComments";

interface ICommentLikesProps {
  likes: (string | null | undefined)[];
  databaseCurrentUser: IDatabaseUser | null;
  databaseUsers: null;
  comment: IComment;
}

export const CommentLikes: FC<ICommentLikesProps> = ({
  likes,
  databaseUsers,
  comment,
}) => {
  const { setData } = useContext(DatabaseContext);
  const { authUser } = useContext(MainContext);
  const isLiked = likes?.includes(authUser ? authUser?.uid : "");
  const viewLikedUsers: IDatabaseUser[] = [];

  const databaseUsersArray: [string, IDatabaseUser][] =
    Object.entries(databaseUsers);

  for (let i = 0; i < likes?.length; i++) {
    for (let j = 0; j < databaseUsersArray?.length; j++) {
      if (likes[i] == databaseUsersArray[j]?.[0]) {
        viewLikedUsers.push(databaseUsersArray[j]?.[1]);
      }
    }
  }
  const [isOpenLikesViewModal, setIsOpenLikesViewModal] = useState(false);
  const handleIncLike = () => {
    if (!isLiked) {
      const setLike = likes ? [...likes, authUser?.uid] : [authUser?.uid];
      setData(
        `users/${comment?.user?.id}/comments/${comment?.comment_id}`,
        { likes: setLike },
        "update"
      );
    }
  };
  const handleDecLike = () => {
    if (isLiked) {
      const disLike = likes?.filter((uid) => uid !== authUser?.uid);
      setData(
        `users/${comment?.user?.id}/comments/${comment?.comment_id}`,
        { likes: disLike },
        "update"
      );
    }
  };

  return (
    <Flex alignItems="center" gap="10px">
      <Flex alignItems="center" gap="3px">
        <Button
          minWidth="0"
          height="auto"
          padding="0"
          isDisabled={comment?.user?.gender ? false : true}
        >
          <AiFillLike
            id="set-like-btn"
            size="18px"
            onClick={handleIncLike}
            color={isLiked ? "#7eb41c" : "black"}
          />
        </Button>

        <Box
          cursor="help"
          position="relative"
          onMouseEnter={() => setIsOpenLikesViewModal(true)}
          onMouseLeave={() => setIsOpenLikesViewModal(false)}
        >
          <Text id="comment-like-count" as="span">
            {likes?.length}
          </Text>
          {isOpenLikesViewModal && viewLikedUsers?.length > 0 && (
            <Flex
              padding="5px 10px"
              maxWidth="300px"
              overflowX="auto"
              bg="#122263"
              borderRadius="3px"
              position="absolute"
              left="0"
              onMouseEnter={() => setIsOpenLikesViewModal(true)}
            >
              {viewLikedUsers.map((item) => (
                <Avatar src={item?.user_avatar} size="sm" />
              ))}
            </Flex>
          )}
        </Box>
      </Flex>
      <Button
        minWidth="0"
        height="auto"
        padding="0"
        isDisabled={comment?.user?.gender ? false : true}
      >
        <AiFillDislike size="18px" onClick={handleDecLike} />
      </Button>
    </Flex>
  );
};
