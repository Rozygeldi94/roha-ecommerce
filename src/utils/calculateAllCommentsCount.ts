import { IDatabaseUser } from "@/types/databaseUser.type";
import { IBotComment, IComment } from "@/types/productComments";
import { flattenArrayRecursive } from "./flattenArrayRecursive";

interface ICalculateAllCommentsCount {
  (
    databaseUsers: null | IDatabaseUser[],
    dummyjsonComments: IComment[],
    postId: string | undefined
  ): void;
}

export const calculateAllCommentsCount: ICalculateAllCommentsCount = (
  databaseUsers,
  dummyjsonComments,
  postId
) => {
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

    return allComments;
  }
};
