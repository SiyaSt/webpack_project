import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsApi } from "src/api/posts";
import { CreatePost, PostParams, UpdatePost } from "src/shared/types/post";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params: PostParams) => {
    const response = await postsApi.fetchAll(params);
    return {
      data: response.data,
      totalCount: Number(response.headers["x-total-count"]) || 0,
    };
  },
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: number) => {
    const response = await postsApi.fetchById(id);
    return response.data;
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
