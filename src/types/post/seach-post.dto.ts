import { RoleEnum } from "@/constants/RoleEnum";
import { createPostDtoType } from "./create-post.dto";

export type SearchPostDtoType = Partial<createPostDtoType>;

export type SearchPostResponseType = {
  id: number;
  name: string;
  position: string;
  company: string;
  user: {
    id: 0;
    name: string;
    phone: string;
    role: RoleEnum;
  };
}[];
