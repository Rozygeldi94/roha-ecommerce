import { FC, useContext } from "react";
import { Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { UserAvatar } from "../User-Profile/UserAvatar";
import { CommentLikes } from "./CommentLikes";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { MainContext } from "@/pages/Layout";
import { IDatabaseUser } from "@/types/databaseUser.type";
import { IBotComment, IComment } from "@/types/productComments";
import { TimeAgoCreatedTime } from "./TimeAgoCreatedTime";

interface IProductCommentProps {
  comment: IComment | IBotComment;
}

export const ProductComment: FC<IProductCommentProps> = ({ comment }) => {
  const [isLargerThan440] = useMediaQuery("(min-width: 440px)");
  const { currentUser, databaseUser, colorMode } = useContext(MainContext);
  const databaseUsers: IDatabaseUser[] | null = useTypedSelector(
    (state) => state.databaseUser.users
  );
  TimeAgo.addLocale(en);
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
        </Flex>
        <Text overflowWrap="anywhere">{comment?.body}</Text>
        {!isLargerThan440 && (comment as IComment)?.user?.gender && (
          <TimeAgoCreatedTime comment={comment as IComment} />
        )}
        <Flex gap="15px" alignItems="center">
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
          {isLargerThan440 && (comment as IComment)?.user?.gender && (
            <>
              {"┊"} <TimeAgoCreatedTime comment={comment as IComment} />
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
