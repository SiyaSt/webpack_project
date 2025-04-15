import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import { selectCurrentPost } from "src/features/post/postSelector";
import {
  selectCommentsByPostId,
  selectCommentsError,
  selectCommentsStatus,
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
import { Button, Loader, Modal } from "src/components";
import { CommentForm } from "src/components/commentForm/CommentForm";
import { fetchPostById } from "src/features/post/postThunk";
import { classNames } from "src/shared/utils/ClassName";
import { useTheme } from "src/hooks/useTheme";
import { CommentItem } from "src/components/сommentItem/CommentItem";
import "./PostPage.scss";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectCurrentPost);
  const comments = useAppSelector((state) =>
    selectCommentsByPostId(state, postId),
  );
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(
    null,
  );
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const status = useAppSelector(selectCommentsStatus);
  const error = useAppSelector(selectCommentsError);
  const { theme } = useTheme();

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(Number(id)));
      dispatch(fetchCommentsByPostId(Number(id)));
    }
  }, [id, dispatch]);

  const handleCreateComment = useCallback(
    async (commentData: CreateComment) => {
      if (!post?.id) return;
      await dispatch(createComment({ ...commentData, postId: post.id }));
      setIsCommentModalOpen(false);
    },
    [dispatch, post],
  );

  const handleUpdateComment = useCallback(
    async (data: UpdateComment) => {
      if (!editingComment) return;
      await dispatch(updateComment({ id: editingComment.id, data }));
      setEditingComment(null);
    },
    [dispatch, editingComment],
  );

  const handleDeleteCommentConfirm = useCallback(async () => {
    if (deletingCommentId) {
      await dispatch(deleteComment(deletingCommentId));
      setDeletingCommentId(null);
    }
  }, [dispatch, deletingCommentId]);

  const handleEditComment = useCallback(
    (comment: Comment) => setEditingComment(comment),
    [],
  );

  const handleDeleteComment = useCallback(
    (id: number) => setDeletingCommentId(id),
    [],
  );
  return (
    <div className={classNames("post-page", `${theme}`)}>
      {post && (
        <article className="post-details">
          <h1>{post.title}</h1>
          <p className="post-body">{post.body}</p>
        </article>
      )}

      <section className="comments-section">
        <div className="comments-header">
          <h2>Comments ({comments.length})</h2>
          <Button onClick={() => setIsCommentModalOpen(true)} color="secondary">
            Add Comment
          </Button>
        </div>
        {status === "loading" && <Loader className="loader" type="secondary" />}
        {error && <div className="error">Error: {error}</div>}
        <div className="comments-list">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      </section>

      <Modal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        header="Add Comment"
        primaryButtonText="Submit"
        secondaryButtonText="Cancel"
        colorPrimaryButton="secondary"
        colorSecondaryButton="danger"
        onPrimaryButtonClick={() => {
          const form = document.getElementById(
            "comment-form",
          ) as HTMLFormElement;
          form?.requestSubmit();
        }}
        onSecondaryButtonClick={() => setIsCommentModalOpen(false)}
        disabledPrimaryButton={!isFormValid}
      >
        <CommentForm
          onSubmit={handleCreateComment}
          onValidityChange={setIsFormValid}
        />
      </Modal>

      <Modal
        isOpen={!!editingComment}
        onClose={() => setEditingComment(null)}
        header="Edit Comment"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        colorPrimaryButton="secondary"
        colorSecondaryButton="danger"
        onPrimaryButtonClick={() => {
          const form = document.getElementById(
            "comment-form",
          ) as HTMLFormElement;
          form?.requestSubmit();
        }}
        onSecondaryButtonClick={() => setEditingComment(null)}
        disabledPrimaryButton={!isFormValid}
      >
        {editingComment && (
          <CommentForm
            comment={editingComment}
            onSubmit={handleUpdateComment}
            onValidityChange={setIsFormValid}
          />
        )}
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
