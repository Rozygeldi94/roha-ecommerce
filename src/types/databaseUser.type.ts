type TComments = {
  postId: string;
  user: {
    id: string;
    username: string;
    gender: string;
  };
  body: string;
  created_time: number;
  likes: string[];
};

export interface IDatabaseUser {
  id: number;
  user_avatar: string;
  comments: TComments;
  timeZone: string;
  locationCity: string;
}
