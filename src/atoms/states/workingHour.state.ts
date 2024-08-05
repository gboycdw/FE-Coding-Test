import { DEFAULT_WORKING_HOUR_TABLE } from "@atoms/constants/workingHour.default";
import { WorkingHourTableType } from "@atoms/interfaces/workingHour.type";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const workingHourState = atom<WorkingHourTableType>({
  key: "workingHourState",
  default: DEFAULT_WORKING_HOUR_TABLE,
  effects_UNSTABLE: [persistAtom],
});

export const savedWorkingHourState = atom<WorkingHourTableType>({
  key: "savedWorkingHourState",
  default: DEFAULT_WORKING_HOUR_TABLE,
  effects_UNSTABLE: [persistAtom],
});
