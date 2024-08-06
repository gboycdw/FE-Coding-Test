import { DEFAULT_WORKING_HOUR_TABLE, RangeInputDataType, weekDay, WorkingHourTableType } from "@atoms";
import { somethingChangeState } from "@atoms/states/somethingChanged.state";
import RangeInput from "@components/common/rangeInput";
import { Dispatch, SetStateAction, useState } from "react";

import { useSetRecoilState } from "recoil";

interface WorkingHourProps {
  resetTrigger: number;
  workingHourTable: WorkingHourTableType;
  setWorkingHourTable: Dispatch<SetStateAction<WorkingHourTableType>>;
}

export default function WorkingHour(props: WorkingHourProps) {
  const { resetTrigger, workingHourTable, setWorkingHourTable } = props;
  const setSomethingChangeState = useSetRecoilState(somethingChangeState);
  const weekDay = Object.keys(DEFAULT_WORKING_HOUR_TABLE);
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="flex flex-col divide-y" key={resetTrigger + resetKey}>
      {weekDay.map((day, weekIndex) => {
        const weekDayData = workingHourTable[day as weekDay];

        if (weekDayData.length === 0)
          return (
            <div className="flex gap-3 items-start py-2 min-h-[81px]" key={weekIndex}>
              <div className="w-[120px] pt-[20px]">{day}</div>
              <div
                className="pt-[20px]"
                onClick={() => {
                  setWorkingHourTable((prev) => {
                    const newTable = [...prev[day as weekDay], { index: 0, start: 0, end: 0 }];
                    return { ...prev, [day as weekDay]: newTable };
                  });
                  setSomethingChangeState(true);
                }}
              >
                ➕
              </div>
            </div>
          );

        return (
          <div className="flex gap-3 items-start py-3" key={(weekIndex + resetKey) * 10}>
            <div className="w-[120px] pt-[16px]">{day}</div>
            <div className="flex flex-col">
              {weekDayData.map((table: RangeInputDataType, rangeIndex: number) => {
                const rangeInputCount = weekDayData.length;

                return (
                  <div key={rangeIndex * 100} className="flex gap-2 py-2">
                    <RangeInput day={day as weekDay} index={rangeIndex} workingHourTable={workingHourTable} setWorkingHourTable={setWorkingHourTable} />
                    <div className="flex items-center gap-4">
                      {rangeInputCount > 0 && (
                        <div
                          onClick={() => {
                            setWorkingHourTable((prev) => {
                              const newTable = prev[day as weekDay].filter((_, index) => index !== rangeIndex);
                              return { ...prev, [day as weekDay]: newTable };
                            });
                            setSomethingChangeState(true);
                            setResetKey((prev) => prev + 1);
                          }}
                        >
                          ❎
                        </div>
                      )}
                      {(!table || rangeIndex === rangeInputCount - 1) && (
                        <div
                          onClick={() => {
                            setWorkingHourTable((prev) => {
                              const newTable = [...prev[day as weekDay], { index: rangeInputCount, start: 0, end: 0 }];
                              return { ...prev, [day as weekDay]: newTable };
                            });
                            setSomethingChangeState(true);
                          }}
                        >
                          ➕
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
