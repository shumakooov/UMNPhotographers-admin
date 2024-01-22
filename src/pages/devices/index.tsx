import { Outlet } from "react-router-dom";

export default function DevicesPageWrapper() {
  return (
    <div style={{ padding: "16px 120px" }}>
      <div className="shadow-container" style={{ height: "631px" }}>
        <Outlet />
      </div>
    </div>
  );
}
