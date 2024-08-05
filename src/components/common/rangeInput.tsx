import { useState } from "react";
import SelectorInput, { TimeOption } from "./selectorInput";
import { weekDay } from "@atoms";

interface RangeInputProps {
  day: weekDay;
  index: number;
}

export default function RangeInput(props: RangeInputProps) {
  const [selectedTimeEnd, setSelectedTimeEnd] = useState<TimeOption>("00:00");
  const [selectedTimeStart, setSelectedTimeStart] = useState<TimeOption>("00:00");
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
