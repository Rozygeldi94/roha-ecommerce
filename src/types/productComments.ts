export interface IComment {
  id?: number;
  postId: string | undefined;
  comment_id: string;
  user: {
    id: string | undefined;
    username: string | undefined;
    gender: string | undefined;
  };
  body: string;
  created_time: number;
  likes: (string | null | undefined)[];
}
export type TCommentLikes = Pick<IComment, "likes">;

export interface IBotComment {
  body: string;
  id: number;
  postId: number;
  user: { id: number; username: string };
}
