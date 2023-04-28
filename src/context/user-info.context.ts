import { UserInfoResponseType } from "@/api/user/index.type";
import { createContext } from "react";

export const UserInfoContext = createContext<UserInfoResponseType | null>(null);
export const ClearUserInfoContext = createContext<(() => void) | null>(null);
