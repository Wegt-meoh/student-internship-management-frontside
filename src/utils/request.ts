import { httpStatus } from "@/constants/httpStatus";
import { FailedResponseType } from "@/types/failedResponse";
import { message } from "antd";
import { getToken, removeToken } from "./token.util";

const baseUrl = "http://localhost:8000";

function preHandleRequestInit(init?: RequestInit) {
  let newInit: RequestInit = { ...init };
  if (!newInit.headers) {
    newInit.headers = {};
  }

  newInit = { mode: "cors", redirect: "manual", method: "POST", ...newInit };
  newInit.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...newInit.headers,
  };

  return newInit;
}

/**
 *
 * @param url
 * @param auth does head add Bearer Authorization
 * @param init default method is POST
 * @returns
 */
export async function request(url: string, auth: boolean, init?: RequestInit) {
  init = preHandleRequestInit(init);
  if (auth) {
    init.headers = { ...init.headers, Authorization: `Bearer ${getToken()}` };
  }

  try {
    let res = await fetch(`${baseUrl}${url}`, init);
    switch (res.status) {
      case httpStatus.SUCC:
      case httpStatus.SUCC_POST: {
        return res.json();
      }
      case httpStatus.UNAUTHORIZE: {
        removeToken();
        location.href = "/login";
      }
      default: {
        const resultJson: FailedResponseType = await res.json();
        message.destroy();
        message.error(resultJson.message, 3);
        return Promise.reject(undefined);
      }
    }
  } catch (error) {
    return Promise.reject(undefined);
  }
}
