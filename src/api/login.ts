import { SignInResponseType } from "@/types/auth/signIn";
import { request } from "@/utils/request";

export function login(
  phone: string,
  password: string
): Promise<SignInResponseType> {
  return request(`/auth/signIn`, false, {
    method: "POST",
    body: JSON.stringify({
      phone: phone,
      password: password,
    }),
  });
}
