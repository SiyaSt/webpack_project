import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { selectPosts } from "src/features/post/postSelector";
import {
  selectComments,
  selectCommentsByPostId,
} from "src/features/commet/commentSelector";
import {
  createComment,
  deleteComment,
  fetchCommentsByPostId,
  updateComment,
} from "src/features/commet/commentThunk";
import { CreateComment } from "src/shared/types/comment/createComment";
import { UpdateComment } from "src/shared/types/comment/updateComment";
import { Comment } from "src/shared/types/comment/comment";
import {
  Button,
  CommentForm,
  CommentItem,
  Loader,
  Modal,
} from "src/components";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { fetchPostById } from "src/features/post/postThunk";
import "./PostPage.scss";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const dispatch = useAppDispatch();
  const { currentPost: post } = useAppSelector(selectPosts);
  const { items: comments, status, error } = useAppSelector(selectComments);
  const commentsForPost = useAppSelector((state) =>
    selectCommentsByPostId(state, postId),
  );
  const [activeComment, setActiveComment] = useState<Comment | null | "new">(
    null,
  );
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(
    null,
  );
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(Number(id)));
      dispatch(fetchCommentsByPostId(Number(id)));
    }
  }, [id, dispatch]);

  const handleSubmitComment = useCallback(
    async (data: CreateComment | UpdateComment) => {
      if (activeComment === "new") {
        await dispatch(
          createComment({ ...data, postId } as CreateComment),
        ).unwrap();
      } else if (activeComment) {
        await dispatch(updateComment({ id: activeComment.id, data })).unwrap();
      }
      setActiveComment(null);
    },
    [dispatch, activeComment, postId],
  );

  const handleDeleteCommentConfirm = useCallback(async () => {
    if (deletingCommentId) {
      await dispatch(deleteComment(deletingCommentId));
      setDeletingCommentId(null);
    }
  }, [dispatch, deletingCommentId]);

  const handleOpenCreateModal = () => setActiveComment("new");
  const handleEditComment = useCallback(
    (comment: Comment) => setActiveComment(comment),
    [],
  );

  const handleDeleteComment = useCallback(
    (id: number) => setDeletingCommentId(id),
    [],
  );

  const commentsList = commentsForPost.map((comment) => (
    <CommentItem
      key={comment.id}
      comment={comment}
      onEdit={handleEditComment}
      onDelete={handleDeleteComment}
    />
  ));
  return (
    <div className="post-page">
      {post && (
        <article className="post-details">
          <h1>{post.title}</h1>
          <p className="post-body">{post.body}</p>
        </article>
      )}

      <section className="comments-section">
        <div className="comments-header">
          <h2>Comments ({comments.length})</h2>
          <Button onClick={handleOpenCreateModal} color="secondary">
            Add Comment
          </Button>
        </div>
        {status === "loading" && <Loader className="loader" type="secondary" />}
        {error && <div className="error">Error: {error}</div>}
        <div className="comments-list">{commentsList}</div>
      </section>

      <Modal
        isOpen={!!activeComment}
        onClose={() => setActiveComment(null)}
        header={activeComment === "new" ? "Add Comment" : "Edit Comment"}
        primaryButtonText={activeComment === "new" ? "Submit" : "Save"}
        secondaryButtonText="Cancel"
        colorPrimaryButton="secondary"
        colorSecondaryButton="danger"
        onSecondaryButtonClick={() => setActiveComment(null)}
        disabledPrimaryButton={!isFormValid}
        formPrimaryButton="comment-form"
      >
        <CommentForm
          comment={activeComment !== "new" ? activeComment : undefined}
          onSubmit={handleSubmitComment}
          onValidityChange={setIsFormValid}
        />
      </Modal>

      <Modal
        isOpen={!!deletingCommentId}
        onClose={() => setDeletingCommentId(null)}
        header="Delete Comment"
        primaryButtonText="Delete"
        onPrimaryButtonClick={handleDeleteCommentConfirm}
        onSecondaryButtonClick={() => setDeletingCommentId(null)}
        colorPrimaryButton="danger"
      >
        <p>Are you sure you want to delete this comment?</p>
      </Modal>
    </div>
  );
};

export default PostPage;
