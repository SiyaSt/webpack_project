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
import {
  Button,
  Loader,
  Modal,
  Pagination,
  PostForm,
  PostItem,
  PostsFilter,
} from "src/components";
import { Option } from "src/shared/types/types";
import { fetchUsers } from "src/features/user/userThunk";
import { useSearchParams } from "react-router-dom";
import "./PostsPage.scss";

export const PostsPage = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const status = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);
  const totalCount = useAppSelector((state) => state.posts.totalCount);
  const users = useAppSelector(selectAllUsers);

  const [isFormValid, setIsFormValid] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<number | null>(null);

  const debouncedSearchTitle = useDebounce(searchTitle, 300);
  const pageSize = 10;
  const userIdParam = searchParams.get("userId");
  const titleParam = searchParams.get("title");

  const userOptions: Option[] = users.map((user) => ({
    value: String(user.id),
    label: user.name,
  }));

  useEffect(() => {
    if (titleParam) setSearchTitle(titleParam);
    if (userIdParam) {
      const userId = Number(userIdParam);
      if (!isNaN(userId)) {
        setSelectedUserId(userId);
      }
    }
  }, [titleParam, userIdParam]);

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

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearchTitle) params.set("title", debouncedSearchTitle);
    else params.delete("title");

    if (selectedUserId) params.set("userId", String(selectedUserId));
    else params.delete("userId");

    setSearchParams(params, { replace: true });
  }, [debouncedSearchTitle, selectedUserId, setSearchParams]);

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

  const handleFilterChange = useCallback(
    (newUserId: number | null, newSearch: string) => {
      setSelectedUserId(newUserId);
      setSearchTitle(newSearch);
      setCurrentPage(1);
    },
    [],
  );

  return (
    <div className="posts-page">
      <div className="posts-controls">
        <PostsFilter
          searchValue={searchTitle}
          onSearchChange={(value) => handleFilterChange(selectedUserId, value)}
          selectedAuthorId={selectedUserId}
          onAuthorChange={(id) => handleFilterChange(id, searchTitle)}
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
      <Pagination
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
        disabledPrimaryButton={!isFormValid}
      >
        <PostForm
          onSubmit={handleCreatePost}
          onValidityChange={setIsFormValid}
        />
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
        disabledPrimaryButton={!isFormValid}
      >
        {editingPost && (
          <PostForm
            post={editingPost}
            onSubmit={handleUpdatePost}
            onValidityChange={setIsFormValid}
          />
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
