import RangeInput from "@components/common/rangeInput";
import SelectorInput, { TimeOption } from "@components/common/selectorInput";
import { useState } from "react";

export default function WorkingHour() {
  const [selectedTimeEnd, setSelectedTimeEnd] = useState<TimeOption>("00:00");

  return (
    <div>
      <SelectorInput selectedTime={selectedTimeEnd} setSelectedTime={setSelectedTimeEnd} />
      {/* <RangeInput /> */}
    </div>
  );
}
