import { atom } from "recoil";

export const somethingChangeState = atom<boolean>({
  key: "somethingChange",
  default: false,
});
