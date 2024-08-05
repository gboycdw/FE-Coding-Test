import { RouterProvider } from "react-router-dom";
import { routers } from "./router";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <div>
      <RecoilRoot>
        <RouterProvider router={routers} />
      </RecoilRoot>
    </div>
  );
}
