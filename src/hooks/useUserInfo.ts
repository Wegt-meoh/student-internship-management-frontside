import {
  ClearUserInfoContext,
  UserInfoContext,
} from "@/context/user-info.context";
import { UserInfoResponseType } from "@/types/user/info";
import { useContext } from "react";

export function useUserInfo(): [
  UserInfoResponseType | null,
  (() => void) | null
] {
  const userInfoContext = useContext(UserInfoContext);
  const clearUserInfoContext = useContext(ClearUserInfoContext);

  return [userInfoContext, clearUserInfoContext];
}
