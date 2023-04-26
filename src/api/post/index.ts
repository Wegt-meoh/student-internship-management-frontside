import { SuccResponseType } from "@/types/succResponseType";
import { request } from "@/utils/request";
import {
  FindAllStudentUnderThePostResponseVo,
  createPostDtoType,
  PostWithCreatedUserVo,
  PostResponseVo,
  FindAllTaskUnderThePostResponseVo,
  FindAllTaskWithOneReportResponseVo,
} from "./index.type";

export function findPostById(postId: number): Promise<PostResponseVo> {
  return request(`/post/${postId}`, true, {
    method: "GET",
  });
}

export function findAllPost(): Promise<PostWithCreatedUserVo[]> {
  return request("/post", true, {
    method: "GET",
  });
}

export function deletePost(postId: number): Promise<SuccResponseType> {
  return request(`/post/${postId}`, true, {
    method: "DELETE",
  });
}

export function createPost(
  createPostDto: createPostDtoType
): Promise<SuccResponseType> {
  return request("/post", true, {
    body: JSON.stringify(createPostDto),
  });
}

export function FindAllStudentUnderThePost(
  postId: number
): Promise<FindAllStudentUnderThePostResponseVo> {
  return request(`/post/find/all/student/${postId}`, true, {
    method: "GET",
  });
}

export function FindAllTaskUnderThePost(
  postId: number
): Promise<FindAllTaskUnderThePostResponseVo> {
  return request(`/post/find/all/task/${postId}`, true, {
    method: "GET",
  });
}

export function FindAllTaskWithOneReport(
  postId: number
): Promise<FindAllTaskWithOneReportResponseVo> {
  return request(`/post/find/all/task/and/one/report/${postId}`, true, {
    method: "GET",
  });
}

export function findAllPostByUser(): Promise<PostResponseVo[]> {
  return request("/post/list", true, {
    method: "GET",
  });
}
