import { request } from "@/utils/request";

export function login(
  phone: string,
  password: string,
  role: string
): Promise<{
  statusCode: number;
  message: string;
  data: {
    info: { token: string; name: string; facuties: string; role: string };
  };
}> {
  return request(`/${role}/login`, false, {
    method: "POST",
    body: JSON.stringify({
      phone: phone,
      password: password,
    }),
  });
}
