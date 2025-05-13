"use client";

import { ChangeEvent, useState } from "react";
import styles from "./page.module.scss";
import cn from "classnames";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";

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
    key: "email" | "password" | "nickname" | "name"
  ) => {
    setRegisterObj({ ...registerObj, [key]: e.target.value });
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
                  value={registerObj.email}
                  onChange={(e) => updateRegisterObjEvent(e, "email")}
                  size="middle"
                  placeholder="이메일을 입력해주세요."
                  status={status ? "error" : ""}
                />
              </div>
              <div className="flexColumn gap-8">
                <span>이름</span>
                <Input
                  type="password"
                  value={registerObj.password}
                  onChange={(e) => updateRegisterObjEvent(e, "name")}
                  size="middle"
                  placeholder="이름을 입력해주세요."
                  status={status ? "error" : ""}
                />
              </div>
              <div className="flexColumn gap-8">
                <span>닉네임</span>
                <Input
                  type="password"
                  value={registerObj.password}
                  onChange={(e) => updateRegisterObjEvent(e, "nickname")}
                  size="middle"
                  placeholder="닉네임을 입력해주세요."
                  status={status ? "error" : ""}
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
                  status={status ? "error" : ""}
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
              <Button color="default" onClick={() => {}}>
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
