import { UserInfoResponseType } from "@/types/user/info";
import { ReportResponseVo } from "../report/index.type";
import { TaskResponseVo } from "../task/index.type";

export type PostResponseVo = {
  id: number;
  name: string;
  position: string;
  company: string;
};

export type createPostDtoType = {
  name: string;
  position: string;
  company: string;
};

export type PostWithCreatedUserVo = PostResponseVo & {
  createdUser: UserInfoResponseType;
};

export type FindAllStudentUnderThePostResponseVo = UserInfoResponseType[];

export type FindAllTaskUnderThePostResponseVo = (TaskResponseVo & {
  receivedReportList: ReportResponseVo[];
})[];

export type FindAllTaskWithOneReportResponseVo =
  FindAllTaskUnderThePostResponseVo;
