import { IComment } from "@/types/productComments";
import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { MdAccessTime } from "react-icons/md";
import TimeAgo from "javascript-time-ago";

interface ITimeAgoCreatedTimeProps {
  comment: IComment;
}

export const TimeAgoCreatedTime: FC<ITimeAgoCreatedTimeProps> = ({
  comment,
}) => {
  const timeAgo = new TimeAgo("en-US");
  return (
    <Flex alignItems="center" gap="5px">
      <MdAccessTime />
      <Text>
        {timeAgo.format(
          (comment as IComment)?.created_time
            ? (comment as IComment)?.created_time
            : Date.now()
        )}
      </Text>
    </Flex>
  );
};
