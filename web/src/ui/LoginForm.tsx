import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { InputField } from "../form-fields/InputField";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { toErrorMap } from "../ultils/toErrorMap";
import { Button } from "./Button";

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const { push } = useRouter();
  const isCurrent = useRef(true);

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await fetch("http://localhost:5000/auth/login", {
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

        if (data.status === "success") {
          // setTimeout(() => {
          useTokenStore.getState().setToken({ token: data.data.token });
          push("/dash");
          // }, 2000);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={`flex w-full flex-col gap-4 focus:outline-none`}>
          <InputField
            className={`h-6 rounded-8`}
            name="username"
            placeholder="Tên đăng nhập"
          />
          <InputField
            className={`h-6 rounded-8 `}
            name="password"
            placeholder="Mật khẩu"
            type="password"
          />
          <Button
            className="mt-2 justify-center py-3 text-base"
            loading={isSubmitting}
            type="submit"
          >
            Đăng nhập
          </Button>
        </Form>
      )}
    </Formik>
  );
};
