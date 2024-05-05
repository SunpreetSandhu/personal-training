import { Outlet } from "react-router-dom";
function AppLayout() {
  return (
    <div>
      <p>APP Layout</p>
      <Outlet />
    </div>
  );
}

export default AppLayout;
