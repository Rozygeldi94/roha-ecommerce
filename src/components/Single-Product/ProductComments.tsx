import { FC, useEffect, useState } from "react";
import { flattenArrayRecursive } from "@/utils/flattenArrayRecursive";
import { Flex } from "@chakra-ui/react";
import { ProductComment } from "./ProductComment";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { IBotComment, IComment } from "@/types/productComments";
import { IDatabaseUser } from "@/types/databaseUser.type";

interface IProductCommentsProps {
  postId: string | undefined;
  dummyjsonComments: IComment[];
}

export const ProductComments: FC<IProductCommentsProps> = ({
  postId,
  dummyjsonComments,
}) => {
  const databaseUsers = useTypedSelector((state) => state.databaseUser.users);
  const [allComments, setAllComments] = useState<(IComment | IBotComment)[]>(
    []
  );

  useEffect(() => {
    if (databaseUsers) {
      let filteredDatabaseComments = Object.values(
        databaseUsers as IDatabaseUser[]
      )
        ?.filter((item) => item?.comments)
        ?.map((item) => item?.comments);
      const mappedDatabaseComments = filteredDatabaseComments?.map((item) =>
        Object.values(item)
      );

      const allComments: (IComment | IBotComment)[] = flattenArrayRecursive(
        mappedDatabaseComments
      )
        ?.filter((item) => item?.postId == postId)
        ?.sort((a, b) => +new Date(b.created_time) - +new Date(a.created_time))
        ?.concat(dummyjsonComments);

      setAllComments(allComments);
    }
  }, [databaseUsers, dummyjsonComments]);

  return (
    <Flex mt="20px" flexDirection="column" gap="10px">
      {allComments?.map((comment) => (
        <ProductComment comment={comment} />
      ))}
    </Flex>
  );
};
