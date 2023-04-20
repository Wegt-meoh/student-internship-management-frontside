import { UserInfoResponseType } from "@/types/user/info";
import { createContext } from "react";

export const UserInfoContext = createContext<UserInfoResponseType | null>(null);
