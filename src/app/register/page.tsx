"use client";

import { ChangeEvent, useState } from "react";
import styles from "./page.module.scss";
import cn from "classnames";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { signUp } from "../../services/AuthService";
import { AxiosError } from "axios";

const RegisterPage = () => {
  const router = useRouter();

  const [registerObj, setRegisterObj] = useState<{
    email: string;
    password: string;
    nickName: string;
    name: string;
  }>({
    email: "",
    password: "",
    nickName: "",
    name: "",
  });

  const handlePushLoginPageEvent = () => {
    router.push("/");
  };

  const updateRegisterObjEvent = (
    e: ChangeEvent<HTMLInputElement>,
    key: "email" | "password" | "nickName" | "name"
  ) => {
    setRegisterObj({ ...registerObj, [key]: e.target.value.trim() });
  };

  const setRegisterEvent = () => {
    signUp(registerObj)
      .then(() => router.push("/"))
      .catch((error: unknown) => {
        if (error instanceof AxiosError) {
          console.log(error);
          const { code }: { code: string } = error.response?.data;
          switch (code) {
            case "1002":
              alert("유효한 이메일 형식이 아닙니다.");
              break;
            case "1006":
              alert("비밀번호는 8자 이상 16자 이하로 입력해주세요.");
              break;
            case "1007":
              alert(
                "비밀번호는 영문 소문자, 숫자, 특수문자를 조합하여 8~16자여야 합니다."
              );
              break;
            case "1010":
              alert("닉네임은 2자 이상 10자 이하로 입력해주세요");
              break;
            case "1011":
              alert(
                "닉네임은 한글, 영어, 숫자의 조합만 가능하며 공백을 포함할 수 없습니다."
              );
              break;
            case "1012":
              alert("이미 사용 중인 닉네임입니다.");
              break;
            case "1013":
              alert("이름을 입력해주세요.");
              break;
            default:
              break;
          }
        }
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={cn("fs-18 fw-600", styles.logoBox)}>Tomotomo</div>
      <div className={cn("flexCenter flexColumn gap-36", styles.mainBox)}>
        <div className={cn("flexColumn gap-24", styles.formBox)}>
          <div className={cn("flexColumn gap-8", styles.titleBox)}>
            <span className="fw-600 fs-24 flexCenter">회원가입</span>
          </div>
          <div className={cn("flexJustifyBetween flexColumn", styles.form)}>
            <div className="flexColumn gap-24">
              <div className="flexColumn gap-8">
                <span>이메일</span>
                <Input
                  type="text"
                  value={registerObj.email}
                  onChange={(e) => updateRegisterObjEvent(e, "email")}
                  size="middle"
                  placeholder="이메일을 입력해주세요."
                />
              </div>
              <div className="flexColumn gap-8">
                <span>이름</span>
                <Input
                  type="text"
                  value={registerObj.name}
                  onChange={(e) => updateRegisterObjEvent(e, "name")}
                  size="middle"
                  placeholder="이름을 입력해주세요."
                />
              </div>
              <div className="flexColumn gap-8">
                <span>닉네임</span>
                <Input
                  type="text"
                  value={registerObj.nickName}
                  onChange={(e) => updateRegisterObjEvent(e, "nickName")}
                  size="middle"
                  placeholder="닉네임을 입력해주세요."
                />
              </div>
              <div className="flexColumn gap-8">
                <span>비밀번호</span>
                <Input
                  type="password"
                  value={registerObj.password}
                  onChange={(e) => updateRegisterObjEvent(e, "password")}
                  size="middle"
                  placeholder="비밀번호를 입력해주세요."
                />
              </div>
            </div>
            <div className="flexColumn gap-16">
              <div className={cn("flexJustifyEnd gap-4", styles.register)}>
                계정이 이미 있으신가요?
                <button
                  className={cn("flexCenter", styles.registerBtn)}
                  onClick={() => handlePushLoginPageEvent()}
                >
                  로그인
                </button>
              </div>
              <Button
                disabled={
                  registerObj.email.length === 0 ||
                  registerObj.name.length === 0 ||
                  registerObj.nickName.length === 0 ||
                  registerObj.password.length === 0
                }
                color="default"
                onClick={() => setRegisterEvent()}
              >
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
