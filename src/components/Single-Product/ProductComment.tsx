import { Button, Flex, Text } from "@chakra-ui/react";
import { UserAvatar } from "../User-Profile/UserAvatar";
import { CommentLikes } from "./CommentLikes";
import { FC, useContext } from "react";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { MainContext } from "@/pages/Layout";
import { IDatabaseUser } from "@/types/databaseUser.type";
import { IBotComment, IComment } from "@/types/productComments";

interface IProductCommentProps {
  comment: IComment | IBotComment;
}

export const ProductComment: FC<IProductCommentProps> = ({ comment }) => {
  const { currentUser, databaseUser, colorMode } = useContext(MainContext);
  const databaseUsers: IDatabaseUser[] | null = useTypedSelector(
    (state) => state.databaseUser.users
  );
  TimeAgo.addDefaultLocale(en);
  // Create formatter (English).
  const timeAgo = new TimeAgo("en-US");
  let offlineUserAvatar: IDatabaseUser[] = Object.values(
    databaseUser ? databaseUser : []
  ).filter((item) => {
    if (item?.id === comment?.user?.id) {
      return item;
    }
  });

  return (
    <Flex
      padding="5px 20px"
      alignItems="center"
      gap="20px"
      borderRadius="6px"
      bg={colorMode === "light" ? "#f7f7f8" : "#35343f"}
    >
      <UserAvatar
        currentUser={currentUser}
        databaseUserAvatar={
          comment?.user?.id === databaseUser?.id
            ? databaseUser?.user_avatar
            : offlineUserAvatar[0]?.user_avatar
        }
        isRealUser={(comment as IComment)?.user?.gender ? true : false}
        minWidth="60px"
        height="60px"
        borderRadius="50%"
      />
      <Flex flexDirection="column" gap="3px">
        <Flex alignItems="center" gap="10px">
          <Text>{comment?.user?.username}</Text>
          <Text>
            {timeAgo.format(
              (comment as IComment)?.created_time
                ? (comment as IComment)?.created_time
                : Date.now()
            )}
          </Text>
        </Flex>

        <Text>{comment?.body}</Text>
        <Flex gap="15px">
          <CommentLikes
            likes={(comment as IComment)?.likes}
            databaseCurrentUser={databaseUser}
            databaseUsers={databaseUsers}
            comment={comment}
          />

          <Button
            variant="unstyled"
            size="sm"
            isDisabled={(comment as IComment)?.user?.gender ? false : true}
          >
            Reply
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
