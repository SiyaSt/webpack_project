import { API } from "./client";
import { Post } from "src/shared/types/post/post";
import { CreatePost } from "src/shared/types/post/createPost";
import { UpdatePost } from "src/shared/types/post/updatePost";
import { PostParams } from "src/shared/types/postParams";

export const postsApi = {
  fetchAll: (params?: PostParams) => API.get<Post[]>("/posts", { params }),
  fetchById: (id: number) => API.get<Post>(`/posts/${id}`),
  create: (data: CreatePost) => API.post<Post>("/posts", data),
  update: (id: number, data: UpdatePost) => API.put<Post>(`/posts/${id}`, data),
  delete: (id: number) => API.delete<void>(`/posts/${id}`),
};
