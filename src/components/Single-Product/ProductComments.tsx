import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { ProductComment } from "./ProductComment";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { IBotComment, IComment } from "@/types/productComments";
import { calculateAllCommentsCount } from "@/utils/calculateAllCommentsCount";

interface IProductCommentsProps {
  allComments: (IComment | IBotComment)[];
}

export const ProductComments: FC<IProductCommentsProps> = ({ allComments }) => {
  return (
    <Flex mt="20px" flexDirection="column" gap="10px">
      {allComments?.map((comment) => (
        <React.Fragment key={comment?.id}>
          <ProductComment comment={comment} />
        </React.Fragment>
      ))}
    </Flex>
  );
};
