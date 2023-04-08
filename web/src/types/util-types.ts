export interface UserSummaryProfile {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
}

export type Data<T> = {
  status: "success" | "fail";
  data: T;
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
  likeStatus: 1 | -1 | null;
}

export interface PostsResponse {
  data: Post[];
  nextCursor: string;
}
