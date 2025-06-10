"use client";

import { Button, Input } from "antd";
import styles from "./page.module.scss";
import cn from "classnames";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../services/AuthService";
import { AxiosResponse } from "axios";

export default function Login() {
  const router = useRouter();
  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loginObj, setLoginObj] = useState<{
    userEmail: string;
    password: string;
  }>({
    userEmail: "",
    password: "",
  });

  const updateLoginObjEvent = (
    e: ChangeEvent<HTMLInputElement>,
    key: "userEmail" | "password"
  ) => {
    setLoginObj({ ...loginObj, [key]: e.target.value });

    if (status) {
      setStatus(false);
      setErrorMessage("");
    }
  };

  const handlePushRegisterPageEvent = () => {
    router.push("/register");
  };

  const handleLogin = async () => {
    const { userEmail, password } = loginObj;

    if (userEmail.length > 0 && password.length > 0) {
      signIn({ email: userEmail, password: password })
        .then((res: AxiosResponse) => {
          const response = res.data;
          const { success } = response;
          const { accessToken, refreshToken } = response.data;
          if (success && accessToken && refreshToken) {
            localStorage.setItem("token", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            router.push("/dashboard");
          } else {
            setStatus(true);
            setErrorMessage("로그인에 실패했습니다.");
          }
        })
        .catch(() => {
          setStatus(true);
          setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
          setLoginObj({ userEmail: "", password: "" });
        });
    } else {
      setStatus(true);
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={styles.wrapper}>
      <div className={cn("fs-18 fw-600", styles.logoBox)}>TOMOTOMO</div>
      <div className={cn("flexCenter flexColumn gap-36", styles.mainBox)}>
        <div className="flexCenter fw-600 fs-30">Welcome, TOMOTOMO!</div>
        <div className={cn("flexColumn gap-24", styles.formBox)}>
          <div className={cn("flexColumn gap-8", styles.titleBox)}>
            <span className={cn("fw-600 fs-24 flexAlignCenter gap-4")}>
              로그인
            </span>
            <span>이메일과 비밀번호를 입력해주세요.</span>
          </div>
          <div className={cn("flexJustifyBetween flexColumn", styles.form)}>
            <div className="flexColumn gap-24">
              <div className="flexColumn gap-8">
                <span>이메일</span>
                <Input
                  value={loginObj.userEmail}
                  onChange={(e) => updateLoginObjEvent(e, "userEmail")}
                  size="middle"
                  placeholder="이메일을 입력해주세요."
                  status={status ? "error" : ""}
                />
              </div>
              <div className="flexColumn gap-8">
                <span>비밀번호</span>
                <Input
                  type="password"
                  value={loginObj.password}
                  onChange={(e) => updateLoginObjEvent(e, "password")}
                  size="middle"
                  placeholder="비밀번호를 입력해주세요."
                  status={status ? "error" : ""}
                />
              </div>
            </div>
            {status && errorMessage && (
              <div className={cn("fs-14", styles.errorMessage)}>
                {errorMessage}
              </div>
            )}
            <div className="flexColumn gap-16">
              <div className={cn("flexJustifyEnd gap-4", styles.register)}>
                계정이 없으신가요?
                <button
                  className={cn("flexCenter", styles.registerBtn)}
                  onClick={() => handlePushRegisterPageEvent()}
                >
                  회원가입
                </button>
              </div>
              <Button
                disabled={
                  loginObj.userEmail.length === 0 ||
                  loginObj.password.length === 0 ||
                  !isValidEmail(loginObj.userEmail)
                }
                color="default"
                onClick={handleLogin}
              >
                로그인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
