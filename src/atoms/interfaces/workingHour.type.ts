export type weekDay = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";
export type RangeInputDataType = {
  index: number;
  start: string;
  end: string;
};
export type WorkingHourTableType = {
  [key in weekDay]: RangeInputDataType[];
};
