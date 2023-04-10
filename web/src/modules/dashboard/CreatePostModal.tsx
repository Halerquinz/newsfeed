import React, { useContext } from "react";
import { Modal } from "../../ui/Modal";
import { Form, Formik } from "formik";
import { InputField } from "../../form-fields/InputField";
import { Button } from "../../ui/Button";
import { AuthContext } from "../auth/AuthProvider";
import { AvailableUser } from "../../ui/AvailableUser";
import { apiBaseUrl } from "../../lib/tests/constants";
import { useTokenStore } from "../auth/useTokenStore";
import * as yup from "yup";

interface CreatePostModalProps {
  onRequestClose: () => void;
}

const validationSchema = yup.object({
  description: yup.string().required("Bạn phải nhập nội dung"),
});

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  onRequestClose,
}) => {
  const { conn } = useContext(AuthContext);
  const { token } = useTokenStore.getState();

  return (
    <Modal isOpen ariaHideApp={false} onRequestClose={onRequestClose}>
      <Formik
        initialValues={{ description: "", image: "" }}
        validationSchema={validationSchema}
        onSubmit={async ({ image, description }) => {
          const res = await fetch(`${apiBaseUrl}/post/create-post`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `beared ${token}`,
            },
            body: JSON.stringify({ image, description: description.trim() }),
          });
          const data = await res.json();
          if (data.status === "success") {
            onRequestClose();
          }
        }}
      >
        {({ isSubmitting, values, setFieldError }) => (
          <Form className={`flex w-full flex-col gap-2 focus:outline-none`}>
            <div className={`block`}>
              <h4 className={`mb-2 text-center text-primary-100`}>
                Tạo bài viết
              </h4>
              <hr className="text-primary-100" />
              <AvailableUser {...conn?.user!} key={conn?.user?.id} />
            </div>
            <InputField
              className={`rounded-8`}
              name="description"
              rows={3}
              placeholder={"Viết mô tả..."}
              textarea
            />

            <div
              className={`col-span-full flex w-full items-center space-x-3 pt-2`}
            >
              <Button
                disabled={!values.description.trim()}
                loading={isSubmitting}
                type="submit"
                className={`w-full`}
              >
                Đăng
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
