import { request } from "@/utils/request";
import { ossResponseVo } from "./index.type";

export function uploadFile(form: FormData): Promise<ossResponseVo> {
  return request("/oss", true, {
    body: form,
  });
}
