import { UserInfoResponseType } from "@/types/user/info";

export type ReportResponseVo = {
  id: number;
  attachmentUrl: string;
  score: number | null;
};

export type ReportWithSubmitUser = ReportResponseVo & {
  user: UserInfoResponseType;
};

export type CreateReportDto = {
  taskId: number;
  attachmentUrl: string;
};

export type ScoreReportDto = {
  id: number;
  score: number;
};
