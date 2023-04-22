import {
  createPostDtoType,
  CreatePostResponseType,
} from "@/types/post/create-post.dto";
import { request } from "@/utils/request";

export function createPost(
  createPostDto: createPostDtoType
): Promise<CreatePostResponseType> {
  return request("/post", true, {
    body: JSON.stringify(createPostDto),
  });
}
