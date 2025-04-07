import { API } from "./client";
import { Comment } from "src/shared/types/comment/comment";
import { CreateComment } from "src/shared/types/comment/createComment";
import { UpdateComment } from "src/shared/types/comment/updateComment";

export const commentsApi = {
  fetchByPostId: (postId: number) =>
    API.get<Comment[]>(`/posts/${postId}/comments`),
  create: (data: CreateComment) => API.post<Comment>("/comments", data),
  update: (id: number, data: UpdateComment) =>
    API.put<Comment>(`/comments/${id}`, data),
  delete: (id: number) => API.delete<void>(`/comments/${id}`),
};
