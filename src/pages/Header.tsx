import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex w-full justify-center items-center h-[100px]">
      <ul className="flex gap-3">
        <li className="border rounded-xl px-5 py-2 hover:bg-gray-200">
          <Link to="/cat-viewer">CatViewer</Link>
        </li>
        <li className="border rounded-xl px-5 py-2 hover:bg-gray-200">
          <Link to="/working-hour">WorkingHours</Link>
        </li>
      </ul>
    </div>
  );
}
