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
