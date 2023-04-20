import { UserInfoResponseType } from "@/types/user/info";
import { request } from "@/utils/request";

export function requestUserInfo(): Promise<UserInfoResponseType> {
  return request(`/user/info`, true, {
    method: "GET",
  });
}
