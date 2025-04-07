import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsApi } from "src/api/posts";
import { CreatePost } from "src/shared/types/post/createPost";
import { UpdatePost } from "src/shared/types/post/updatePost";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params: {
    _start?: number;
    _limit?: number;
    title_like?: string;
    userId?: number;
  }) => {
    const response = await postsApi.fetchAll(params);
    return {
      data: response.data,
      totalCount: Number(response.headers["x-total-count"]) || 0,
    };
  },
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData: CreatePost) => {
    const response = await postsApi.create(postData);
    return response.data;
  },
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }: { id: number; data: UpdatePost }) => {
    const response = await postsApi.update(id, data);
    return response.data;
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {
    await postsApi.delete(id);
    return id;
  },
);
