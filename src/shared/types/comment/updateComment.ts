export interface UpdateComment {
  id: number;
  name?: string;
  email?: string;
  body?: string;
  postId: number;
}
