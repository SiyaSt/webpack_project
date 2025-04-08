import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import {
  createPost,
  deletePost,
  fetchPosts,
  updatePost,
} from "src/features/post/postThunk";
import { useDebounce } from "src/hooks/useDebounce";
import {
  selectAllPosts,
  selectPostsError,
  selectPostsStatus,
} from "src/features/post/postSelector";
import { selectAllUsers } from "src/features/user/userSelector";
import { Post } from "src/shared/types/post/post";
import { PostItem } from "src/components/postItem/PostItem";
import { Button, Loader, Modal } from "src/components";
import { PostForm } from "src/components/postForm/PostForm";
import { TablePagination } from "src/components/table/components";
import { Option } from "src/shared/types/types";
import { PostsFilter } from "src/components/postsFilter/PostsFilter";
import { fetchUsers } from "src/features/user/userThunk";
import "./PostsPage.scss";
import { useSearchParams } from "react-router-dom";

export const PostsPage = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const status = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);
  const totalCount = useAppSelector((state) => state.posts.totalCount);
  const users = useAppSelector(selectAllUsers);
  const [searchParams] = useSearchParams();
  const userIdParam = searchParams.get("userId");

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<number | null>(null);

  const debouncedSearchTitle = useDebounce(searchTitle, 300);
  const pageSize = 10;

  const userOptions: Option[] = users.map((user) => ({
    value: String(user.id),
    label: user.name,
  }));

  useEffect(() => {
    if (userIdParam) {
      const userId = Number(userIdParam);
      if (!isNaN(userId)) {
        setSelectedUserId(userId);
      }
    }
  }, [userIdParam]);

  useEffect(() => {
    dispatch(
      fetchPosts({
        _start: (currentPage - 1) * pageSize,
        _limit: pageSize,
        title_like: debouncedSearchTitle,
        userId: selectedUserId || undefined,
      }),
    );
    dispatch(fetchUsers());
  }, [currentPage, debouncedSearchTitle, selectedUserId, dispatch]);

  const handleCreatePost = useCallback(
    async (data: Post) => {
      try {
        await dispatch(createPost(data)).unwrap();
        setIsCreateModalOpen(false);
      } catch (error) {
        console.error("Failed to create post:", error);
      }
    },
    [dispatch],
  );

  const handleUpdatePost = useCallback(
    async (data: Post) => {
      if (!editingPost) return;

      try {
        await dispatch(updatePost({ id: editingPost.id, data })).unwrap();
        setEditingPost(null);
      } catch (error) {
        console.error("Failed to update post:", error);
      }
    },
    [dispatch, editingPost],
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (deletingPostId) {
      await dispatch(deletePost(deletingPostId));
      setDeletingPostId(null);
    }
  }, [deletingPostId, dispatch]);

  return (
    <div className="posts-page">
      <div className="posts-controls">
        <PostsFilter
          searchValue={searchTitle}
          onSearchChange={setSearchTitle}
          selectedAuthorId={selectedUserId}
          onAuthorChange={setSelectedUserId}
          authorOptions={userOptions}
          className="posts-page-filter"
        />

        <Button
          className="create-post-button"
          onClick={() => setIsCreateModalOpen(true)}
          color="secondary"
        >
          Create New Post
        </Button>
      </div>
      {status === "loading" && <Loader className="loader" type="secondary" />}
      {error && <div className="error">Error: {error}</div>}
      {!error && status !== "loading" && (
        <div className="posts-list">
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onEdit={() => setEditingPost(post)}
              onDelete={() => setDeletingPostId(post.id)}
            />
          ))}
        </div>
      )}
      <TablePagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalCount / pageSize)}
        setCurrentPage={setCurrentPage}
        color="secondary"
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        header="Create New Post"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        colorPrimaryButton="secondary"
        colorSecondaryButton="danger"
        onPrimaryButtonClick={() => {
          const form = document.getElementById("post-form") as HTMLFormElement;
          form?.requestSubmit();
        }}
        onSecondaryButtonClick={() => setIsCreateModalOpen(false)}
      >
        <PostForm onSubmit={handleCreatePost} />
      </Modal>

      <Modal
        isOpen={!!editingPost}
        onClose={() => setEditingPost(null)}
        header="Edit Post"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        colorPrimaryButton="secondary"
        colorSecondaryButton="danger"
        onPrimaryButtonClick={() => {
          const form = document.getElementById("post-form") as HTMLFormElement;
          form?.requestSubmit();
        }}
        onSecondaryButtonClick={() => setEditingPost(null)}
      >
        {editingPost && (
          <PostForm post={editingPost} onSubmit={handleUpdatePost} />
        )}
      </Modal>

      <Modal
        isOpen={!!deletingPostId}
        onClose={() => setDeletingPostId(null)}
        header="Confirm Delete"
        primaryButtonText="Delete"
        onPrimaryButtonClick={handleDeleteConfirm}
        onSecondaryButtonClick={() => setDeletingPostId(null)}
        colorPrimaryButton="danger"
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>
    </div>
  );
};
