import { useState, useEffect, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import {
  createPost,
  deletePost,
  fetchPosts,
  updatePost,
} from "src/features/post/postThunk";
import { useDebounce } from "src/hooks/useDebounce";
import { selectPosts } from "src/features/post/postSelector";
import { selectUsers } from "src/features/user/userSelector";
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
import { setPosts, setTotalCount } from "src/features/post/postSlice";
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
  const [isFormValid, setIsFormValid] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<number | null>(null);
  const [activePost, setActivePost] = useState<Post | null | "new">(null);

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

  const handleSubmitPost = useCallback(
    async (data: Post) => {
      try {
        if (activePost === "new") {
          await dispatch(createPost(data)).unwrap();
        } else if (activePost) {
          await dispatch(updatePost({ id: activePost.id, data })).unwrap();
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
    await dispatch(deletePost(deletingPostId)).unwrap();

    const currentPagePosts = updatedPosts.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );

    if (currentPagePosts.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }

    setDeletingPostId(null);
  }, [deletingPostId, posts, currentPage, dispatch, pageSize]);

  const paginatedPosts = useMemo(() => {
    return posts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [posts, currentPage, pageSize]);

  const handleFilterChange = useCallback(
    (newUserId: number | null, newSearch: string) => {
      setSelectedUserId(newUserId);
      setSearchTitle(newSearch);
      setCurrentPage(1);
    },
    [],
  );

  const handleEditPost = useCallback((post: Post) => setActivePost(post), []);
  const handleDeletePost = useCallback(
    (id: number) => setDeletingPostId(id),
    [],
  );
  const handleOpenCreateModal = () => setActivePost("new");

  const postsList = useMemo(
    () =>
      paginatedPosts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
        />
      )),
    [paginatedPosts, handleEditPost, handleDeletePost],
  );

  const memoizedUserOptions = useMemo(() => userOptions, [userOptions]);

  return (
    <div className="posts-page">
      <div className="posts-controls">
        <PostsFilter
          searchValue={searchTitle}
          onSearchChange={(value) => handleFilterChange(selectedUserId, value)}
          selectedAuthorId={selectedUserId}
          onAuthorChange={(id) => handleFilterChange(id, searchTitle)}
          authorOptions={memoizedUserOptions}
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
        totalPages={Math.ceil(totalCount / pageSize)}
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
