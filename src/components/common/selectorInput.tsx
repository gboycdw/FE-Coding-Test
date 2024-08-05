import { SELECTOR_INPUT_OPTION } from "@constants/selectorInput.const";
import { useState } from "react";

type TimeOption = (typeof SELECTOR_INPUT_OPTION)[0][number];
export default function SelectorInput() {
  const [selectedTime, setSelectedTime] = useState<TimeOption>("00:00"); // 조금 더 엄밀한 타입 선언이 필요할 수도 있다

  return (
    <div>
      <div>
        <div className="relative">
          <div className="flex justify-between border rounded-md w-[160px] h-[40px] pl-7 pr-2 py-3 items-center hover:border-blue-300">
            {selectedTime}
            <div className="text-[10px]">▼</div>
          </div>
          <div className="absolute top-[45px] h-[225px] overflow-y-scroll border rounded-md">
            {SELECTOR_INPUT_OPTION.map((time: TimeOption, index: number) => {
              return (
                <div key={index} className="px-2 ">
                  <div className="w-[130px] h-[40px] flex justify-start items-center px-5 py-3 rounded-md hover:bg-gray-100">{time}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
