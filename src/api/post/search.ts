import {
  SearchPostDtoType,
  SearchPostResponseType,
} from "@/types/post/seach-post.dto";
import { request } from "@/utils/request";

export function searchPost(
  searchPostDto: SearchPostDtoType
): Promise<SearchPostResponseType> {
  return request("/post/search", true, {
    body: JSON.stringify(searchPostDto),
  });
}
