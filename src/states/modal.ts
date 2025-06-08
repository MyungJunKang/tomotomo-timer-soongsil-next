import { atom } from "jotai";

type PortalType = {
  type: string;
  state: boolean;
  top: number | string;
  left: number | string;
  zIndex: number;
};

export const modalPortalAtom = atom<PortalType>({
  type: "",
  state: false,
  top: 0,
  left: 0,
  zIndex: 9,
});

export const layoutPortalAtom = atom<PortalType>({
  type: "",
  state: false,
  top: 0,
  left: 0,
  zIndex: 9,
});
