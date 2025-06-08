import { useAtom } from "jotai";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { layoutPortalAtom } from "src/states/modal";

interface Props {
  children: ReactNode;
  autoClose?: boolean;
}

export const LayoutPortal = ({ children, autoClose = true }: Props) => {
  const [layoutPortalInfo, setLayoutPortalInfo] = useAtom(layoutPortalAtom);
  const { state } = layoutPortalInfo;
  const ref = useRef<HTMLDivElement>(null);
  const portal =
    typeof document !== "undefined" && document.getElementById("layoutportal");

  useEffect(() => {
    const handleCloseEvent = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node) && autoClose)
        setLayoutPortalInfo({ ...layoutPortalInfo, type: "", state: false });
    };

    document.addEventListener("mousedown", handleCloseEvent);
    return () => document.removeEventListener("mousedown", handleCloseEvent);
  }, [autoClose, layoutPortalInfo, setLayoutPortalInfo]);

  return (
    <>
      {portal && state && createPortal(<div ref={ref}>{children}</div>, portal)}
    </>
  );
};
