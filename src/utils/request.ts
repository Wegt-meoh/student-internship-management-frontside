import { httpStatus } from "@/constants/httpStatus";
import { FailedResponseType } from "@/types/failedResponse";
import { showNotification } from "./notification";
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
        location.href = "/login";
        return Promise.reject(undefined);
      }
      default: {
        const resultJson: FailedResponseType = await res.json();
        showNotification({ text: resultJson.message, duration: 3000 });
        return Promise.reject(undefined);
      }
    }
  } catch (error) {
    return Promise.reject(undefined);
  }
}
