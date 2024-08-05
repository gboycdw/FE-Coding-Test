import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SelectorInput, { TimeOption } from "./selectorInput";
import { weekDay, WorkingHourTableType } from "@atoms";
import { useSetRecoilState } from "recoil";
import { somethingChangeState } from "@atoms/states/somethingChanged.stats";

interface RangeInputProps {
  day: weekDay;
  index: number;
  workingHourTable: WorkingHourTableType;
  setWorkingHourTable: Dispatch<SetStateAction<WorkingHourTableType>>;
}

export default function RangeInput(props: RangeInputProps) {
  const { day, index, workingHourTable, setWorkingHourTable } = props;

  const initialStart = workingHourTable[day]?.[index]?.start || "00:00";
  const initialEnd = workingHourTable[day]?.[index]?.end || "00:00";

  const [selectedTimeStart, setSelectedTimeStart] = useState<TimeOption>(initialStart);
  const [selectedTimeEnd, setSelectedTimeEnd] = useState<TimeOption>(initialEnd);
  const setSomethingChangeState = useSetRecoilState(somethingChangeState);

  useEffect(() => {
    if (selectedTimeStart !== initialStart || selectedTimeEnd !== initialEnd) {
      setWorkingHourTable((prev) => ({ ...prev, [day]: [...prev[day].map((item) => (item.index === index ? { index, start: selectedTimeStart, end: selectedTimeEnd } : item))] }));
      setSomethingChangeState(true);
    }
  }, [selectedTimeStart, selectedTimeEnd]);

  return (
    <div>
      <div className="flex gap-2 items-center">
        <SelectorInput selectedTime={selectedTimeStart} setSelectedTime={setSelectedTimeStart} />
        <div>-</div>
        <SelectorInput selectedTime={selectedTimeEnd} setSelectedTime={setSelectedTimeEnd} />
      </div>
    </div>
  );
}
