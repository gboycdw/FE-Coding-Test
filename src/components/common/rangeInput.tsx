import { useEffect, useState } from "react";
import SelectorInput, { TimeOption } from "./selectorInput";
import { weekDay, workingHourState } from "@atoms";
import { useRecoilState } from "recoil";

interface RangeInputProps {
  day: weekDay;
  index: number;
}

export default function RangeInput(props: RangeInputProps) {
  const { day, index } = props;
  const [workingHourTable, setWorkingHourTable] = useRecoilState(workingHourState);

  const [selectedTimeStart, setSelectedTimeStart] = useState<TimeOption>(workingHourTable[day]?.[index]?.start || "00:00");
  const [selectedTimeEnd, setSelectedTimeEnd] = useState<TimeOption>(workingHourTable[day]?.[index]?.end || "00:00");

  useEffect(() => {
    setWorkingHourTable((prev) => ({ ...prev, [day]: [...prev[day].map((item) => (item.index === index ? { index, start: selectedTimeStart, end: selectedTimeEnd } : item))] }));
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
