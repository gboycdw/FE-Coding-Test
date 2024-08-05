export type weekDay = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
export type RangeInputDataType = {
  index: number;
  start: string;
  end: string;
};

export type WorkingHourTableType = {
  [key in weekDay]: RangeInputDataType[];
};
