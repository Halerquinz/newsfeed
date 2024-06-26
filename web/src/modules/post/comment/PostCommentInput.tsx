import React, { useRef, useState, useEffect, useCallback } from "react";
import { Input } from "../../../ui/Input";
import { useScreenType } from "../../../shared-hooks/useScreenType";
import { Form, Formik } from "formik";
import { InputField } from "../../../form-fields/InputField";
import { Button } from "../../../ui/Button";
import { toErrorMap } from "../../../ultils/toErrorMap";
import { useTokenStore } from "../../auth/useTokenStore";
import { apiBaseUrl } from "../../../lib/tests/constants";
import { useMutation } from "react-query";
import { queryClient } from "../../../lib/tests/queryClient";

interface PostCommentInputProps {
  postId: number;
}

export const PostCommentInput: React.FC<PostCommentInputProps> = ({
  postId,
}) => {
  const { token } = useTokenStore.getState();
  const createNewComment = useCallback(
    async (comment: string) => {
      const res = await fetch(`${apiBaseUrl}/comment/`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        } as any,
        method: "POST",
        body: JSON.stringify({ postId, comment }),
      });
      return await res.json();
    },
    [token]
  );

  const { mutateAsync: addComment } = useMutation(createNewComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(`/post/get_post/${postId}`);
    },
  });

  return (
    <div className="mb-3 flex items-stretch">
      <div className="flex-1">
        <div className="flex flex-1 items-center rounded-8 bg-primary-700 lg:mr-0">
          <Formik
            initialValues={{ comment: "" }}
            onSubmit={async ({ comment }, { setErrors, resetForm }) => {
              if (
                !comment ||
                !comment.trim() ||
                !comment.replace(/[\u200B-\u200D\uFEFF]/g, "")
              ) {
                return;
              }
              const res = await addComment(comment);
              if (res.status === "success") {
                resetForm();
              }
            }}
          >
            {({}) => (
              <Form className={`flex w-full flex-col gap-4 focus:outline-none`}>
                <InputField
                  className={`h-6 rounded-8`}
                  name="comment"
                  placeholder="Viết bình luận"
                  maxLength={512}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
