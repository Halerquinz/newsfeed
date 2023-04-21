import { Form, Formik } from "formik";
import React, { useCallback, useContext, useEffect } from "react";
import { object, pattern, size, string, optional } from "superstruct";
import { InputField } from "../../form-fields/InputField";
import { validateStruct } from "../../lib/validateStruct";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { AuthContext } from "../auth/AuthProvider";
import { useMutation } from "react-query";
import { useTokenStore } from "../auth/useTokenStore";
import { Sex, User } from "../../types/util-types";
import { apiBaseUrl } from "../../lib/tests/constants";
import { updateUserProfile } from "../../ultils/api";

const profileStruct = object({
  firstname: size(string(), 2, 50),
  lastname: size(string(), 2, 50),
  username: pattern(string(), /^(\w){4,15}$/),
  about: size(string(), 0, 160),
});

interface EditProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onEdit?: (data: {
    firstname: string;
    lastname: string;
    username: string;
    about: string;
    profilePicture: string;
    coverPicture: string;
    email: string;
    dateOfBirth: string;
    livein: string;
    sex: Sex;
    phone: string;
  }) => void;
}

const validateFn = validateStruct(profileStruct);

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onRequestClose,
  onEdit,
}) => {
  const { conn, setConn } = useContext(AuthContext);
  const { token } = useTokenStore.getState();

  const updateUserProfile = useCallback(
    async (data: User) => {
      const res = await fetch(`${apiBaseUrl}/user/update/${conn?.user?.id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      return await res.json();
    },
    [conn]
  );

  const { mutateAsync: editProfile } = useMutation(updateUserProfile);

  if (!conn) {
    return null;
  }

  const { user } = conn;

  return (
    <Modal isOpen={isOpen} ariaHideApp={false} onRequestClose={onRequestClose}>
      {isOpen ? (
        <Formik
          initialValues={{
            firstname: user?.firstname,
            lastname: user?.lastname,
            username: user?.username,
            email: user?.email,
            about: user?.about || "",
            profilePicture: user?.profilePicture,
            coverPicture: user?.coverPicture || "",
            dateOfBirth: user?.dayOfBirth,
            livein: user?.livein,
            sex: user?.sex,
            phone: user?.phone,
          }}
          validateOnChange={false}
          // validate={(values) => {
          //   return validateFn({
          //     ...(values as any),
          //     firstname: values.firstname?.trim(),
          //     lastname: values.lastname?.trim(),
          //   });
          // }}
          onSubmit={async (data) => {
            const res = await editProfile(data as any);
            if (res.status === "success") {
              if (conn) {
                setConn({ user: { ...conn?.user, ...(data as any) } });
              }
              onEdit?.(data as any);
              onRequestClose();
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className={`w-full flex-col`}>
              <h4 className={`mb-2 text-primary-100`}>Chỉnh sửa hồ sơ</h4>
              <InputField
                className={`mb-4`}
                label={"Địa chỉ ảnh đại diện"}
                name="profilePicture"
              />
              <InputField
                className={`mb-4`}
                label={"Địa chỉ ảnh nền"}
                name="coverPicture"
              />

              <InputField className={`mb-4`} label={"Họ"} name="lastname" />
              <InputField className={`mb-4`} label={"Tên"} name="firstname" />
              <InputField className={`mb-4`} label={"Email"} name="email" />
              <InputField
                className={`mb-4`}
                label={"Ngày sinh"}
                name="dateOfBirth"
              />
              <InputField className={`mb-4`} label={"Địa chỉ"} name="livein" />
              <InputField className={`mb-4`} label={"Giới tính"} name="sex" />
              <InputField
                className={`mb-4`}
                label={"Số điện thoại"}
                name="phone"
              />

              <InputField
                className={`mb-4`}
                label={"Mô tả"}
                textarea
                name="about"
              />
              <div className={`flex items-center pt-2`}>
                <Button loading={isSubmitting} type="submit" className={`mr-3`}>
                  Lưu
                </Button>
                <ButtonLink type="button" onClick={onRequestClose}>
                  Thoát
                </ButtonLink>
              </div>
            </Form>
          )}
        </Formik>
      ) : null}
    </Modal>
  );
};
