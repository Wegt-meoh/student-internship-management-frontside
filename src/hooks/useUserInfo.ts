import { UserInfoResponseType } from "@/api/user/index.type";
import {
  ClearUserInfoContext,
  UserInfoContext,
} from "@/context/user-info.context";
import { useContext } from "react";

export function useUserInfo(): [
  UserInfoResponseType | null,
  (() => void) | null
] {
  const userInfoContext = useContext(UserInfoContext);
  const clearUserInfoContext = useContext(ClearUserInfoContext);

  return [userInfoContext, clearUserInfoContext];
}
