"use client";

import { Button, Input } from "antd";
import styles from "./page.module.scss";
import cn from "classnames";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "./services/AuthService";

export default function Login() {
  const router = useRouter();
  const [status, setStatus] = useState(false);
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
  };

  const handlePushRegisterPageEvent = () => {
    router.push("/register");
  };

  const handleLogin = async () => {
    const { userEmail, password } = loginObj;
    if (userEmail.length > 0 && password.length > 0) {
      signIn({ email: userEmail, password: password })
        .then((res) => {
          const { data, success } = res;
          if (success) {
            document.cookie = `token=${data.accessToken}; path=/; Secure; HttpOnly;`;
            router.push("/dashboard");
          } else {
            setStatus(true);
          }
        })
        .catch(() => {
          setStatus(true);
          setLoginObj({ userEmail: "", password: "" });
          setTimeout(() => {
            setStatus(false);
          }, 3000);
        });
    } else {
      setStatus(true);
      setLoginObj({ userEmail: "", password: "" });
      setTimeout(() => {
        setStatus(false);
      }, 3000);
    }
  };

  // const handleRegisterEvent = () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   const raw = JSON.stringify({
  //     email: "test@naver.com",
  //     password: "123123123",
  //     nickName: "강명준",
  //     name: "강명준",
  //   });

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch("http://192.168.81.210:8080/api/auth/register", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  // };

  return (
    <div className={styles.wrapper}>
      <div className={cn("fs-18 fw-600", styles.logoBox)}>Tomotomo</div>
      <div className={cn("flexCenter flexColumn gap-36", styles.mainBox)}>
        <div className="flexCenter fw-600 fs-30">Welcome, Tomotomo</div>
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
              <Button color="default" onClick={handleLogin}>
                로그인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
