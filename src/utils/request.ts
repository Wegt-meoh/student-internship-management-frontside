import httpStatus from "@/constants/httpStatus";
import { getToken } from "./token.util";

const baseUrl = "http://localhost:8000";

function preHandleRequestInit(init?: RequestInit) {
  let newInit: RequestInit = { ...init };
  if (!newInit.headers) {
    newInit.headers = {};
  }

  newInit = { mode: "cors", redirect: "follow", ...newInit };
  newInit.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...newInit.headers,
  };

  return newInit;
}

function beforeRequest(auth: boolean, init?: RequestInit) {}

export async function request(url: string, auth: boolean, init?: RequestInit) {
  init = preHandleRequestInit(init);
  if (auth) {
    init.headers = { ...init.headers, Authorization: `Bearer ${getToken()}` };
  }

  try {
    let res = await fetch(`${baseUrl}${url}`, init);

    switch (res.status) {
      case httpStatus.UNAUTHORIZE: {
        location.href = "/login";
        return Promise.reject(undefined);
      }
      default: {
        return await res.json();
      }
    }
  } catch (error) {
    return Promise.reject(undefined);
  }
}
