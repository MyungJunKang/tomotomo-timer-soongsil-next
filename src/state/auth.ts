import { atom } from "jotai";
import { AuthType } from "src/types/AuthTypes";

export const authAtom = atom<AuthType>({ sub: "" });
