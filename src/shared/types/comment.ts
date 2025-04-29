export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

export interface CreateComment {
  name: string;
  email: string;
  body: string;
  postId: number;
}

export interface UpdateComment {
  id?: number;
  name?: string;
  email?: string;
  body?: string;
  postId: number;
}
