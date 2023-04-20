import { RoleEnum } from "@/constants/RoleEnum";

export type RouterGuardType =
  | {
      path: string;
      role: RoleEnum;
      children?: RouterGuardType;
    }[];
