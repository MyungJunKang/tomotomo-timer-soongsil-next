"use client";

import { modalPortalAtom } from "src/states/modal";
import cn from "classnames";
import { useAtom } from "jotai";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "./ModalPortal.module.scss";

interface Props {
  children: ReactNode;
  autoClose?: boolean;
}

export const ModalPortal = ({ autoClose = true, children }: Props) => {
  const [modalPortalInfo, setModalPortalInfo] = useAtom(modalPortalAtom);
  const { state, zIndex } = modalPortalInfo;
  const ref = useRef<HTMLDivElement>(null);
  const portal =
    typeof document !== "undefined" && document.getElementById("modal");

  useEffect(() => {
    const handleCloseEvent = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node) && autoClose)
        setModalPortalInfo({ ...modalPortalInfo, type: "", state: false });
    };
    document.addEventListener("mousedown", handleCloseEvent);
    return () => document.removeEventListener("mousedown", handleCloseEvent);
  }, [autoClose, modalPortalInfo, setModalPortalInfo]);

  return (
    <>
      {portal &&
        state &&
        createPortal(
          <div
            className={cn("flexCenter", styles.wrapper)}
            ref={ref}
            style={{ zIndex: zIndex }}
          >
            {children}
          </div>,
          portal
        )}
    </>
  );
};
