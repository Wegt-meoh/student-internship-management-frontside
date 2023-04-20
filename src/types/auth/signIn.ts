import { RoleEnum } from "@/constants/RoleEnum";

export type SignInResponseType = {
  token: string;
  info: {
    id: number;
    name: string;
    phone: string;
    role: RoleEnum;
  };
};
