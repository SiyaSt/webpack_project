import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsApi } from "src/api/posts";
import { CreatePost } from "src/shared/types/post/createPost";
import { UpdatePost } from "src/shared/types/post/updatePost";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params: { start: number; limit: number; userId?: number }) => {
    return await postsApi.fetchAll({
      _start: params.start,
      _limit: params.limit,
      userId: params.userId,
    });
  },
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData: CreatePost) => {
    return await postsApi.create(postData);
  },
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }: { id: number; data: UpdatePost }) => {
    return await postsApi.update(id, data);
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {
    await postsApi.delete(id);
    return id;
  },
);
