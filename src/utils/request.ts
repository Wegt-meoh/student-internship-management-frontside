import httpStatus from "@/constants/httpStatus";
import { getToken } from "./token.util";

const baseUrl = "http://localhost:8000";

export async function request(url: string, auth: boolean, init?: RequestInit) {
  if (!init) {
    init = {};
  }
  if (!init.headers) {
    init.headers = {};
  }

  init = { mode: "no-cors", ...init };

  if (auth) {
    init.headers = { ...init.headers, Authorization: `Bearer ${getToken()}` };
  }
  try {
    const res = await fetch(`${baseUrl}${url}`, init);
    switch (res.status) {
      case httpStatus.SUCC: {
        return Promise.resolve(res);
      }
      default: {
        return Promise.reject(res);
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
