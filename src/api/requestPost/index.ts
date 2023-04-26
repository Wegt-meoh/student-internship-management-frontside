import { RequestPostStatus } from "@/constants/RequestPostStatus.enum";
import { SuccResponseType } from "@/types/succResponseType";
import { request } from "@/utils/request";
import {
  FindAllRequestPostUnderTheStudentVo,
  FindAllRequestPostUnderTheTeacherResponseVo,
} from "./index.type";

export function createRequestPost(postId: number): Promise<SuccResponseType> {
  return request("/request/post", true, {
    body: JSON.stringify({
      postId,
    }),
  });
}

export function updateRequestPost(body: {
  id: number;
  status: RequestPostStatus;
}): Promise<SuccResponseType> {
  return request("/request/post", true, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function findAllRequestPostUnderTheTeacher(): Promise<FindAllRequestPostUnderTheTeacherResponseVo> {
  return request("/request/post/teacher", true, {
    method: "GET",
  });
}

export function findAllRequestPostUnderTheStudent(): Promise<FindAllRequestPostUnderTheStudentVo> {
  return request("/request/post/student", true, {
    method: "GET",
  });
}

export function deleteRequestPost(id: number): Promise<SuccResponseType> {
  return request(`/request/post/${id}`, true, {
    method: "DELETE",
  });
}
