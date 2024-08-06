import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SelectorInput, { TimeOption } from "./selectorInput";
import { weekDay, WorkingHourTableType } from "@atoms";
import { useSetRecoilState } from "recoil";
import { somethingChangeState } from "@atoms/states/somethingChanged.state";
import { useCustomAlertHook } from "../../hooks/customAlert";
import { TimeValidator } from "@tools/timeValidator";
import { timeValidatorState } from "@atoms/states/timeValidator.state";

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
  const { customWarningMessage } = useCustomAlertHook();
  const [selectedTimeStart, setSelectedTimeStart] = useState<TimeOption>(initialStart);
  const [selectedTimeEnd, setSelectedTimeEnd] = useState<TimeOption>(initialEnd);
  const setSomethingChangeState = useSetRecoilState(somethingChangeState);
  const [timeWrong, setTimeWrong] = useState(false);
  const setTimeValidator = useSetRecoilState(timeValidatorState);

  useEffect(() => {
    if (selectedTimeStart !== initialStart || selectedTimeEnd !== initialEnd) {
      setSomethingChangeState(true);

      if (TimeValidator(selectedTimeStart, selectedTimeEnd)) {
        setTimeValidator((prev) => ({ ...prev, [day]: true }));
        setTimeWrong(false);
      } else {
        setTimeWrong(true);
        setTimeValidator((prev) => ({ ...prev, [day]: false }));
        customWarningMessage(`[${day}] The end time cannot be the same as or earlier than the start time.`);
      }

      setWorkingHourTable((prev) => ({
        ...prev,
        [day]: [...prev[day].map((item) => (item.index === index ? { index, start: selectedTimeStart, end: selectedTimeEnd } : item))],
      }));
    }
  }, [selectedTimeStart, selectedTimeEnd]);

  return (
    <div>
      <div className="flex gap-2 items-center relative">
        <SelectorInput selectedTime={selectedTimeStart} setSelectedTime={setSelectedTimeStart} />
        <div>-</div>
        <SelectorInput selectedTime={selectedTimeEnd} setSelectedTime={setSelectedTimeEnd} />
      </div>
      {timeWrong && <div className="absolute text-[11px] w-[343px] flex justify-start text-red-500">[Error] Please check the time conditions.</div>}
    </div>
  );
}
