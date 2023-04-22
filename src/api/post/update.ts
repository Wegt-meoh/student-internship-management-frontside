import { createPostDtoType } from "@/types/post/create-post.dto";
import { request } from "@/utils/request";

export function updatePost(
  updatePostDto: Partial<createPostDtoType>,
  id: number
) {
  return request(`/post/${id}`, true, {
    body: JSON.stringify(updatePostDto),
  });
}
