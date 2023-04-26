import { RoleEnum } from "@/constants/RoleEnum";

export type UserInfoResponseType = {
  id: number;
  name: string;
  phone: string;
  role: RoleEnum.TEACHER | RoleEnum.STUDENT;
  class: string | null;
  facuties: string | null;
};
