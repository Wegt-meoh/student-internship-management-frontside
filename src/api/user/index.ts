import { SuccResponseType } from "@/types/succResponseType";
import { request } from "@/utils/request";
import {
  UpdateUserInfoDto,
  UpdateUserPasswordDto,
  UserInfoResponseType,
} from "./index.type";

export function requestUserInfo(): Promise<UserInfoResponseType> {
  return request(`/user/info`, true, {
    method: "GET",
  });
}

export function updateUserInfo(
  updateDto: UpdateUserInfoDto
): Promise<SuccResponseType> {
  return request("/user", true, {
    method: "PATCH",
    body: JSON.stringify(updateDto),
  });
}

export function updateUserPassword(
  updateDto: UpdateUserPasswordDto
): Promise<SuccResponseType> {
  return request("/user/password", true, {
    method: "PATCH",
    body: JSON.stringify(updateDto),
  });
}
