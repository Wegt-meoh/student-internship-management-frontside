import { request } from "@/utils/request";

export function deletePost(postId: number) {
  return request(`/post/${postId}`, true, {
    method: "DELETE",
  });
}
