import { RequestPostStatus } from "@/constants/RequestPostStatus.enum";

export type GetStudentPostResponseType = {
  id: number;
  studentId: number;
  studentName: string;
  studentClass: string;
  postId: number;
  postName: string;
  postPosition: string;
  postCompany: string;
  status: RequestPostStatus;
}[];
