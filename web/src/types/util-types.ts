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
  createdAt: string;
  updatedAt: string;
  username: string;
  firsname: string;
  lastname: string;
  profilePicture: string;
}

export interface PostsResponse {
  data: Post[];
  nextCursor: string;
}
