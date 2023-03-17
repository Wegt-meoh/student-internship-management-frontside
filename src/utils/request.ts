import httpStatus from "@/constants/httpStatus";
import { getToken } from "./token.util";

const baseUrl = "http://localhost:8000";

function preHandleRequestInit(init?: RequestInit) {
  let newInit: RequestInit = { ...init };
  if (!newInit.headers) {
    newInit.headers = {};
  }

  newInit = { mode: "cors", ...init, redirect: "follow" };
  newInit.headers = {
    accept: "application/json",
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
  let res = await fetch(`${baseUrl}${url}`, init);

  switch (res.status) {
    case httpStatus.UNAUTHORIZE: {
      location.href = "/login";
      break;
    }
    case httpStatus.SUCC:
    case httpStatus.SUCC_POST: {
      return await res.json();
    }
    case httpStatus.REDIRECT: {
      break;
    }
    default: {
      return Promise.reject(await res.json());
    }
  }
  return Promise.reject(undefined);
}
