import { useRecoilState } from "recoil";
import WorkingHour from "../container/WorkingHour";
import { savedWorkingHourState, workingHourState } from "@atoms";
import { useCustomAlertHook } from "../hooks/customAlert";

export default function WorkingHourPage() {
  const [workingHourTable, setWorkingHourTable] = useRecoilState(workingHourState);
  const [savedWorkingHourTable, setSavedWorkingHourTable] = useRecoilState(savedWorkingHourState);
  const { customInfoMessage } = useCustomAlertHook();
  return (
    <div className="flex gap-5">
      <div className="font-semibold h-full w-[200px]">Working Hour</div>
      <div>
        <div className="font-semibold border-b pb-3 flex justify-between">
          <div>Set your weekly hours</div>
          <div className="text-gray-500">▼</div>
        </div>
        <WorkingHour />
        <div className="border-t pt-5 flex justify-end gap-6 items-center">
          <div
            className="py-2 px-7 items-center flex cursor-pointer hover:bg-gray-200"
            onClick={() => {
              setWorkingHourTable(savedWorkingHourTable);
            }}
          >
            Cancel
          </div>
          <div
            className="text-white bg-blue-700 py-2 px-7 items-center flex cursor-pointer hover:bg-blue-500"
            onClick={() => {
              setSavedWorkingHourTable(workingHourTable);
              customInfoMessage("현재 상태가 저장되었습니다", 1);
            }}
          >
            Update
          </div>
        </div>
      </div>
    </div>
  );
}
