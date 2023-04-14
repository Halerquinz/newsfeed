import React, { useRef, useState, useEffect } from "react";
import { Input } from "../../../ui/Input";
import { useScreenType } from "../../../shared-hooks/useScreenType";
import { Form, Formik } from "formik";
import { InputField } from "../../../form-fields/InputField";
import { Button } from "../../../ui/Button";
import { toErrorMap } from "../../../ultils/toErrorMap";
import { useTokenStore } from "../../auth/useTokenStore";

interface PostCommentInputProps {
  postId: number;
}

export const PostCommentInput: React.FC<PostCommentInputProps> = ({
  postId,
}) => {
  const { token } = useTokenStore.getState();
  console.log(token);
  const screenType = useScreenType();

  let position = 0;

  return (
    <div className="flex items-stretch">
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
              console.log(comment);
              const response = await fetch(`http://localhost:5000/comment/`, {
                headers: {
                  authorization: `bearer ${token}`,
                  postId,
                  comment,
                } as any,
                method: "POST",
              });
              resetForm();

              // const data = await response.json();
              // if (data.status === "fail") {
              //   console.log(data);
              //   setErrors(toErrorMap(data));
              // }

              // let data;
              // fetch("http://localhost:5000/auth/login", {
              //   headers: {
              //     "Content-Type": "application/json",
              //   },
              //   method: "POST",
              //   body: JSON.stringify(values),
              // }).then((res) =>
              //   res.json().then((x) => {
              //     setTimeout(() => {
              //       data = x;
              //       console.log(data);
              //     }, 2000);
              //   })
              // );

              // if (data.status === "success") {
              //   // setTimeout(() => {
              //   useTokenStore.getState().setToken({ token: data.data.token });
              //   push("/dash");
              //   // }, 2000);
              // }
            }}
          >
            {({ isSubmitting, values, handleChange }) => (
              <Form className={`flex w-full flex-col gap-4 focus:outline-none`}>
                <Input
                  name="comment"
                  value={values.comment}
                  maxLength={512}
                  placeholder={"send Message"}
                  onChange={handleChange}
                  transparent
                  autoComplete="off"
                />
                {/* <Button
            className="mt-2 justify-center py-3 text-base"
            loading={isSubmitting}
            type="submit"
          >
            Đăng nhập
          </Button> */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
