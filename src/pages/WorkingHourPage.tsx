import WorkingHour from "../container/WorkingHour";

export default function WorkingHourPage() {
  return (
    <div className="flex gap-5">
      <div className="font-semibold h-full w-[200px]">Working Hour</div>
      <div>
        <div className="font-semibold border-b pb-3 flex justify-between">
          <div>Set your weekly hours</div>
          <div className="text-gray-500">▼</div>
        </div>
        <WorkingHour />
      </div>
    </div>
  );
}
