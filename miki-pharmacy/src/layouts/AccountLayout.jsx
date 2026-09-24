import { Outlet } from "react-router-dom";
import AccountSidebar from "../components/AccountSidebar";

function AccountLayout() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-8">
        <AccountSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;
