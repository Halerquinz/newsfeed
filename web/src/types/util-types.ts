export enum Sex {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export type User = {
  id: number;
  username: string;
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  profilePicture: string;
  coverPicture: string;
  livein: string;
  about: string;
  sex: Sex;
  dayOfBirth: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
};

export interface UserSummaryProfile {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
}

export type Data<T> = {
  status: "success" | "fail";
  data?: T;
  msg?: string;
};

export interface Post {
  id: number;
  userId: number;
  description: string;
  image: string;
  createdDate: string;
  updatedDate: string;
  username: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  likeCounts: number;
  commentCounts: number;
  likeStatus: number | null;
}

export interface PostsResponse {
  data: Post[];
  nextCursor: string;
}

export type PostSummaryDetail = {
  id: number;
  userId: number;
  description: string;
  image: string;
  createdDate: string;
  updatedDate: string;
  likeCounts: number;
  commentCounts: number;
};

export type PostDetail = {
  post: Post;
  likes: LikeDetail[];
  comments: CommentDetail[];
};

export interface LikeDetail {
  value: number;
  userId: number;
  postId: number;
  createdDate: string;
  updatedDate: string;
  username: string;
  profilePicture: string;
}

export interface CommentDetail {
  userId: number;
  postId: number;
  createdDate: string;
  updatedDate: string;
  text: string;
  username: string;
  profilePicture: string;
}
