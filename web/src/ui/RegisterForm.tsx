import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../form-fields/InputField";
import { toErrorMap } from "../ultils/toErrorMap";
import { Button } from "./Button";
import { NativeSelect } from "./NativeSelect";
import { apiBaseUrl } from "../lib/tests/constants";

interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const { push } = useRouter();

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        sex: "",
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await fetch(`${apiBaseUrl}/auth/register`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (data.status === "fail") {
          console.log(data);
          setErrors(toErrorMap(data));
        }
        console.log(data);
        if (data.status === "success") {
          push("/dash");
        }
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className={`flex w-full flex-col gap-4 focus:outline-none`}>
          <div
            className="grid gap-x-2"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            <InputField
              className={`h-6 rounded-8 `}
              name="lastname"
              placeholder="Họ"
            />
            <InputField
              className={`h-6 rounded-8 `}
              name="firstname"
              placeholder="Tên"
            />
          </div>
          <InputField
            className={`h-6 rounded-8 `}
            name="username"
            placeholder="Tên đăng nhập"
          />
          <InputField
            className={`h-6 rounded-8 `}
            name="email"
            placeholder="email"
          />
          <InputField
            className={`h-6 rounded-8 `}
            name="password"
            placeholder="Mật khẩu"
            type="password"
          />
          <InputField
            className={`h-6 rounded-8 `}
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            type="password"
          />
          <InputField
            className={`h-6 rounded-8 `}
            name="phone"
            placeholder="Số điện thoại"
          />
          <div>
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
          <Button
            className="mt-2 justify-center py-3 text-base"
            loading={isSubmitting}
            type="submit"
          >
            Đăng kí
          </Button>
        </Form>
      )}
    </Formik>
  );
};
