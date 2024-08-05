import { DEFAULT_TIME_VALIDATOR } from "@atoms/constants/timeValidator.default";
import { TimeValidatorStateType } from "@atoms/interfaces/timeValidator.type";
import { atom } from "recoil";

export const timeValidatorState = atom<TimeValidatorStateType>({
  key: "timeValidatorState",
  default: DEFAULT_TIME_VALIDATOR,
});
