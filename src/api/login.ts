import { request } from "@/utils/request";

export function login(phone: string, password: string, role: string) {
  return request(`/${role}/login`, false, {
    method: "POST",
    body: JSON.stringify({
      phone: phone,
      password: password,
    }),
  });
}
