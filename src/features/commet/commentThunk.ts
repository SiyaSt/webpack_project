import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentsApi } from "src/api/comments";
import { CreateComment } from "src/shared/types/comment/createComment";
import { UpdateComment } from "src/shared/types/comment/updateComment";

export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchCommentsByPostId",
  async (postId: number) => {
    return await commentsApi.fetchByPostId(postId);
  },
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentData: CreateComment) => {
    return await commentsApi.create(commentData);
  },
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ id, data }: { id: number; data: UpdateComment }) => {
    return await commentsApi.update(id, data);
  },
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id: number) => {
    await commentsApi.delete(id);
    return id;
  },
);
