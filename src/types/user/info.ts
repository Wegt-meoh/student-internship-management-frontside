import { RoleEnum } from "@/constants/RoleEnum";

export type UserInfoResponseType = {
  facuties?: string;
  class?: string;
  name: string;
  phone: string;
  role: RoleEnum;
  teacherId?: number;
  studentId?: number;
  userId: 1;
};
