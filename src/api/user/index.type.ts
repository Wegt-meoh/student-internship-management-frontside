import { RoleEnum } from "@/constants/RoleEnum";

export type UserInfoResponseType = {
  id: number;
  name: string;
  phone: string;
  role: RoleEnum.TEACHER | RoleEnum.STUDENT;
  class: string | null;
  facuties: string | null;
  description: string | null;
  attachmentUrl: string | null;
};

export type UpdateUserInfoDto = {
  description: string | null;
  attachmentUrl: string | null;
};

export type UpdateUserPasswordDto = {
  password: string;
  newPassword: string;
};
