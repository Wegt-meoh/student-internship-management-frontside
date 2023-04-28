import { RequestPostStatus } from "@/constants/RequestPostStatus.enum";
import { PostResponseVo, PostWithCreatedUserVo } from "../post/index.type";
import { UserInfoResponseType } from "../user/index.type";

export type RequestPostResponseVo = {
  id: number;
  status: RequestPostStatus;
};

export type FindAllRequestPostUnderTheTeacherResponseVo =
  (RequestPostResponseVo & {
    targetPost: PostResponseVo;
    requestUser: UserInfoResponseType;
  })[];

export type FindAllRequestPostUnderTheStudentVo = (RequestPostResponseVo & {
  targetPost: PostWithCreatedUserVo;
})[];
