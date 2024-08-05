import { SELECTOR_INPUT_OPTION } from "@constants/selectorInput.const";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export type TimeOption = (typeof SELECTOR_INPUT_OPTION)[0][number];

interface SelectorInputProps {
  selectedTime: TimeOption;
  setSelectedTime: Dispatch<SetStateAction<TimeOption>>;
}

export default function SelectorInput(props: SelectorInputProps) {
  const { selectedTime, setSelectedTime } = props;
  const [showDropdownList, setShowDropdownLint] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdownLint(false);
    }
  };

  return (
    <div>
      <div>
        <div className="relative">
          <div
            className="flex justify-between border rounded-md w-[160px] h-[40px] pl-7 pr-2 py-3 items-center hover:border-blue-300"
            onClick={() => {
              setShowDropdownLint(true);
            }}
          >
            {selectedTime}
            <div className="text-[10px] text-gray-400">▼</div>
          </div>
          {showDropdownList && (
            <div ref={dropdownRef} className="absolute top-[45px] h-[225px] overflow-y-scroll border rounded-md">
              {SELECTOR_INPUT_OPTION.map((time: TimeOption, index: number) => {
                return (
                  <div key={index} className="px-2 ">
                    <div
                      className={`w-[130px] h-[40px] flex justify-start cursor-pointer items-center px-5 py-3 rounded-md ${
                        time === selectedTime ? "bg-blue-50" : ""
                      } hover:bg-gray-100`}
                      onClick={() => {
                        setSelectedTime(time);
                        setShowDropdownLint(false);
                      }}
                    >
                      {time}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
