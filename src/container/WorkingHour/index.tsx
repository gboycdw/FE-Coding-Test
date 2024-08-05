import { DEFAULT_WORKING_HOUR_TABLE, RangeInputDataType, weekDay, workingHourState } from "@atoms";
import RangeInput from "@components/common/rangeInput";
import { useRecoilValue } from "recoil";

export default function WorkingHour() {
  const workingHourTable = useRecoilValue(workingHourState);
  return (
    <div className="flex flex-col gap-3">
      {Object.keys(DEFAULT_WORKING_HOUR_TABLE).map((day, weekIndex) => {
        return (
          <div className="flex gap-3 items-center pb-3 border-b" key={weekIndex}>
            <div className="w-[120px]">{day}</div>

            {workingHourTable[day as weekDay].map((table: RangeInputDataType, index: number) => {
              const rangeInputCount = workingHourTable[day as weekDay].length;
              return (
                <div key={index} className="flex gap-2">
                  <RangeInput day={day as weekDay} index={table.index} />
                  <div className="flex items-center gap-4">
                    {rangeInputCount > 0 && <div>X</div>}
                    {index === rangeInputCount - 1 && <div>➕</div>}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
