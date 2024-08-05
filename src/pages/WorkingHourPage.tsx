import { useRecoilState } from "recoil";
import WorkingHour from "../container/WorkingHour";
import { DEFAULT_WORKING_HOUR_TABLE, savedWorkingHourState } from "@atoms";
import { useCustomAlertHook } from "../hooks/customAlert";
import { useState } from "react";
import { somethingChangeState } from "@atoms/states/somethingChanged.state";
import { timeValidatorState } from "@atoms/states/timeValidator.state";
import { DEFAULT_TIME_VALIDATOR } from "@atoms/constants/timeValidator.default";

export default function WorkingHourPage() {
  const [savedWorkingHourTable, setSavedWorkingHourTable] = useRecoilState(savedWorkingHourState);
  const [workingHourTable, setWorkingHourTable] = useState(savedWorkingHourTable);
  const [viewToggle, setViewToggle] = useState(true);
  const { customInfoMessage } = useCustomAlertHook();
  const [somethingChange, setSomethingChangeState] = useRecoilState(somethingChangeState);
  const [resetKey, setResetKey] = useState(0);

  const [timeValidatorList, setTimeValidatorList] = useRecoilState(timeValidatorState);
  const timeValidatorFailed = Object.values(timeValidatorList).includes(false);

  return (
    <div className="flex gap-5">
      <div className="font-semibold h-full w-[200px]">Working Hour</div>
      <div>
        <div className="font-semibold border-b w-[550px] pb-3 flex justify-between">
          <div>Set your weekly hours</div>
          <div className="flex gap-2">
            <div
              className="cursor-pointer px-2 py-1 items-center"
              onClick={() => {
                localStorage.removeItem("recoil-persist");
                setWorkingHourTable(DEFAULT_WORKING_HOUR_TABLE);
                setTimeValidatorList(DEFAULT_TIME_VALIDATOR);
                setSomethingChangeState(false);
                setResetKey((prev) => prev + 1);
              }}
            >
              Clear
            </div>
            <div
              className="text-gray-500 cursor-pointer items-center flex"
              onClick={() => {
                setViewToggle(!viewToggle);
              }}
            >
              {viewToggle ? "▼" : "▲"}
            </div>
          </div>
        </div>
        {viewToggle && (
          <>
            <WorkingHour resetTrigger={resetKey} workingHourTable={workingHourTable} setWorkingHourTable={setWorkingHourTable} />
            {somethingChange && (
              <div className="border-t pt-5 flex justify-end gap-6 items-center">
                <button
                  className="py-2 px-7 items-center flex cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setWorkingHourTable(savedWorkingHourTable);
                    setTimeValidatorList(DEFAULT_TIME_VALIDATOR);
                    setSomethingChangeState(false);
                    setResetKey((prev) => prev + 1);
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`text-white  py-2 px-7 items-center flex cursor-pointer ${timeValidatorFailed ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-500"}`}
                  disabled={timeValidatorFailed}
                  onClick={() => {
                    if (!timeValidatorFailed) {
                      setSavedWorkingHourTable(workingHourTable);
                      setTimeValidatorList(DEFAULT_TIME_VALIDATOR);
                      setSomethingChangeState(false);
                      setResetKey((prev) => prev + 1);
                      customInfoMessage("현재 상태가 저장되었습니다", 1);
                    }
                  }}
                >
                  Update
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
