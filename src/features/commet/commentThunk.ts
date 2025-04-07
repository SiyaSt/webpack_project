import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentsApi } from "src/api/comments";
import { CreateComment } from "src/shared/types/comment/createComment";
import { UpdateComment } from "src/shared/types/comment/updateComment";

export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchCommentsByPostId",
  async (postId: number) => {
    const response = await commentsApi.fetchByPostId(postId);
    return response.data;
  },
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentData: CreateComment) => {
    const response = await commentsApi.create(commentData);
    return response.data;
  },
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ id, data }: { id: number; data: UpdateComment }) => {
    const response = await commentsApi.update(id, data);
    return response.data;
  },
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id: number) => {
    await commentsApi.delete(id);
    return id;
  },
);
