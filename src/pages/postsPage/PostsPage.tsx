import { useState, useEffect, useCallback } from "react";
import {
  createPost,
  deletePost,
  fetchPosts,
  updatePost,
} from "src/features/post/postThunk";
import { selectPosts } from "src/features/post/postSelector";
import { selectUsers } from "src/features/user/userSelector";
import { Post } from "src/shared/types/post";
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
import { setPosts, setTotalCount } from "src/features/post/postSlice";
import { DEBOUNCE, PAGE_SIZE } from "src/shared/constants";
import { useAppDispatch, useAppSelector, useDebounce } from "src/hooks";
import "./PostsPage.scss";

const PostsPage = () => {
  const dispatch = useAppDispatch();
  const {
    items: posts,
    status,
    error,
    totalCount,
  } = useAppSelector(selectPosts);
  const { items: users } = useAppSelector(selectUsers);

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    title: searchParams.get("title") || "",
    userId: searchParams.get("userId")
      ? Number(searchParams.get("userId"))
      : null,
  });

  const [deletingPostId, setDeletingPostId] = useState<number | null>(null);
  const [activePost, setActivePost] = useState<Post | null | "new">(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const debouncedFilters = useDebounce(filters, DEBOUNCE);
  const userOptions: Option[] = users.map((user) => ({
    value: String(user.id),
    label: user.name,
  }));

  useEffect(() => {
    dispatch(
      fetchPosts({
        title_like: debouncedFilters.title,
        userId: debouncedFilters.userId || undefined,
      }),
    );
    dispatch(fetchUsers());
  }, [currentPage, debouncedFilters, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedFilters.title) {
      params.set("title", debouncedFilters.title);
    } else {
      params.delete("title");
    }

    if (debouncedFilters.userId) {
      params.set("userId", String(debouncedFilters.userId));
    } else {
      params.delete("userId");
    }

    setSearchParams(params, { replace: true });
  }, [debouncedFilters, setSearchParams]);

  const handleFilterChange = useCallback(
    (newUserId: number | null, newTitle: string) => {
      setFilters({ userId: newUserId, title: newTitle });
      setCurrentPage(1);
    },
    [],
  );

  const handleSubmitPost = useCallback(
    async (data: Post) => {
      try {
        if (activePost === "new") {
          await dispatch(createPost(data));
        } else if (activePost) {
          await dispatch(updatePost({ id: activePost.id, data }));
        }
        setActivePost(null);
      } catch (error) {
        console.error("Failed to save post:", error);
      }
    },
    [dispatch, activePost],
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (!deletingPostId) return;

    const updatedPosts = posts.filter((post) => post.id !== deletingPostId);

    dispatch(setPosts(updatedPosts));
    dispatch(setTotalCount(updatedPosts.length));
    await dispatch(deletePost(deletingPostId));

    const currentPagePosts = updatedPosts.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
    );

    if (currentPagePosts.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }

    setDeletingPostId(null);
  }, [deletingPostId, posts, currentPage, dispatch]);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleEditPost = useCallback((post: Post) => setActivePost(post), []);
  const handleDeletePost = useCallback(
    (id: number) => setDeletingPostId(id),
    [],
  );
  const handleOpenCreateModal = () => setActivePost("new");

  const filteredPaginatedPosts = paginatedPosts.filter((post) => {
    const matchesTitle = post.title
      .toLowerCase()
      .includes(filters.title.toLowerCase());
    const matchesUser = !filters.userId || post.userId === filters.userId;
    return matchesTitle && matchesUser;
  });

  const postsList =
    filteredPaginatedPosts.length === 0 ? (
      <span>No Posts Found</span>
    ) : (
      filteredPaginatedPosts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
        />
      ))
    );
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="posts-page">
      <div className="posts-controls">
        <PostsFilter
          searchValue={filters.title}
          onSearchChange={(value) => handleFilterChange(filters.userId, value)}
          selectedAuthorId={filters.userId}
          onAuthorChange={(id) => handleFilterChange(id, filters.title)}
          authorOptions={userOptions}
          className="posts-page-filter"
        />

        <Button
          className="create-post-button"
          onClick={handleOpenCreateModal}
          color="secondary"
        >
          Create New Post
        </Button>
      </div>

      {status === "loading" && <Loader className="loader" type="secondary" />}
      {error && <div className="error">Error: {error}</div>}
      {!error && status !== "loading" && (
        <div className="posts-list">{postsList}</div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        color="secondary"
      />

      <Modal
        isOpen={!!activePost}
        onClose={() => setActivePost(null)}
        header={activePost === "new" ? "Create New Post" : "Edit Post"}
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        colorPrimaryButton="secondary"
        colorSecondaryButton="danger"
        formPrimaryButton="post-form"
        onSecondaryButtonClick={() => setActivePost(null)}
        disabledPrimaryButton={!isFormValid}
      >
        <PostForm
          post={activePost !== "new" ? activePost : null}
          onSubmit={handleSubmitPost}
          onValidityChange={setIsFormValid}
        />
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

export default PostsPage;
