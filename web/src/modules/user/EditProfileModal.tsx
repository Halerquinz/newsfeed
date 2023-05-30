import { Form, Formik } from "formik";
import React, { useCallback, useContext } from "react";
import { useMutation } from "react-query";
import { object, pattern, size, string } from "superstruct";
import { InputField } from "../../form-fields/InputField";
import { apiBaseUrl } from "../../lib/tests/constants";
import { validateStruct } from "../../lib/validateStruct";
import { Sex, UserEditProfile } from "../../types/util-types";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { NativeSelect } from "../../ui/NativeSelect";
import { AuthContext } from "../auth/AuthProvider";
import { useTokenStore } from "../auth/useTokenStore";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi"; // the locale you want
import { dateToStringWithoutTime } from "../../lib/dateToStringWithoutTime";
import { DatePickerField } from "../../form-fields/DatePickerField";
registerLocale("vi", vi); // register it with the name you want

const profileStruct = object({
  firstname: size(string(), 2, 50),
  lastname: size(string(), 2, 50),
  username: pattern(string(), /^(\w){4,15}$/),
  about: size(string(), 0, 160),
  livein: size(string(), 0, 160),
  email: pattern(string(), /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  profilePicture: pattern(
    string(),
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  ),
  coverPicture: pattern(string(), /^https?:\/\/(www\.|)/),
  // dateOfBirth: string;
  // sex: size(string() )
  // phone: string;
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
    async (data: UserEditProfile) => {
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
          validate={(values) => {
            return validateFn({
              ...(values as any),
              firstname: values.firstname?.trim(),
              lastname: values.lastname?.trim(),
              username: values.username?.trim(),
              about: values.about?.trim(),
            });
          }}
          onSubmit={async (data) => {
            const res = await editProfile({
              ...data,
              username: data.username?.trim(),
              firstname: data.firstname?.trim(),
              lastname: data.lastname?.trim(),
              about: data.about?.trim(),
            } as UserEditProfile);
            if (res.status === "success") {
              if (conn) {
                setConn({
                  user: {
                    ...conn?.user,
                    ...(data as any),
                    username: data.username?.trim(),
                    firstname: data.firstname?.trim(),
                    lastname: data.lastname?.trim(),
                    about: data.about?.trim(),
                  },
                });
              }
              onEdit?.(data as any);
              onRequestClose();
            }
            console.log(data.dateOfBirth);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
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
              {/* <div className="mb-4 block h-full w-full">
                <div className={`mb-2 flex text-primary-300`}>Ngày sinh</div>
                <DatePicker
                  // value={values.dateOfBirth}
                  selected={new Date()}
                  locale="vi"
                  onChange={(date) =>
                    setFieldValue("dateOfBirth", dateToStringWithoutTime(date!))
                  }
                  className="w-full rounded-8 bg-primary-700 py-2 px-4 text-primary-100 placeholder-primary-300"
                  maxDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                />
              </div> */}

              <InputField
                type="date"
                className={`mb-4`}
                label={"Ngày sinh"}
                name="dateOfBirth"
              />
              <InputField className={`mb-4`} label={"Họ"} name="lastname" />
              <InputField className={`mb-4`} label={"Tên"} name="firstname" />
              <InputField className={`mb-4`} label={"Email"} name="email" />
              <InputField className={`mb-4`} label={"Địa chỉ"} name="livein" />
              <div className="mb-4 block h-full w-full">
                <div className={`mb-2 flex text-primary-300`}>Giới tính</div>
                <NativeSelect
                  className="w-full"
                  value={values.sex}
                  onChange={(e: any) => {
                    setFieldValue("sex", e.target.value);
                  }}
                >
                  <option value="male" className={`hover:bg-primary-900`}>
                    Nam
                  </option>
                  <option value="female" className={`hover:bg-primary-900`}>
                    Nữ
                  </option>
                  <option value="other" className={`hover:bg-primary-900`}>
                    Khác
                  </option>
                </NativeSelect>
              </div>

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
