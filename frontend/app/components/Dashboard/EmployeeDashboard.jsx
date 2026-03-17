import {
  Home,
  FileText,
  Activity,
  Folder,
  Calendar,
  Settings,
  HelpCircle,
  User,
  HandCoins,
} from "lucide-react";
import Header from "../Header/header";

const EmployeeDashboard = () => {
  return (
    <div className="flex gap-6 p-4 min-h-screen">
      {/* Sidebar */}
      <div className="w-1/6 flex flex-col gap-4">
        {/* Main Menu */}
        <div className=" p-4 rounded-2xl flex flex-col gap-2">
          <span className="p-2 text-white font-semibold">Main Menu</span>

          <div className="flex items-center gap-2 text-white text-[14px] font-normal cursor-pointer hover:bg-[#2c3650] p-2 rounded-lg transition-colors">
            <Home size={16} strokeWidth={1.5} color="white" /> Dashboard
          </div>
          <div className="flex items-center gap-2 text-white text-[14px] font-normal cursor-pointer hover:bg-[#2c3650] p-2 rounded-lg transition-colors">
            <FileText size={18} strokeWidth={1.5} color="white" /> Task
          </div>
          <div className="flex items-center gap-2 text-white text-[14px] font-normal cursor-pointer hover:bg-[#2c3650] p-2 rounded-lg transition-colors">
            <Activity size={18} strokeWidth={1.5} color="white" /> Performance
          </div>
          <div className="flex items-center gap-2 text-white text-[14px] font-normal cursor-pointer hover:bg-[#2c3650] p-2 rounded-lg transition-colors">
            <Folder size={18} strokeWidth={1.5} color="white" /> Files
          </div>
          <div className="flex items-center gap-2 text-white text-[14px] font-normal cursor-pointer hover:bg-[#2c3650] p-2 rounded-lg transition-colors">
            <Calendar size={18} strokeWidth={1.5} color="white" /> Attendance
          </div>
          <div className="flex items-center gap-2 text-white text-[14px] font-normal cursor-pointer hover:bg-[#2c3650] p-2 rounded-lg transition-colors">
            <HandCoins size={18} strokeWidth={1.5} color="white" /> Payroll
          </div>
        </div>

        {/* Settings Section */}
        <div className="border-t-1 border-[#212842] p-4 flex flex-col gap-2">
          <span className="p-2 text-white font-semibold">Settings</span>
          <div className="flex items-center gap-2 text-white text-[14px] font-normal cursor-pointer hover:bg-[#2c3650] p-2 rounded-lg transition-colors">
            <Settings size={18} strokeWidth={1.5} color="white" /> Setting
          </div>
          <div className="flex items-center gap-2 text-white text-[14px] font-normal cursor-pointer hover:bg-[#2c3650] p-2 rounded-lg transition-colors">
            <User size={18} strokeWidth={1.5} color="white" /> Account
          </div>
          <div className="flex items-center gap-2 text-white text-[14px] font-normal cursor-pointer hover:bg-[#2c3650] p-2 rounded-lg transition-colors">
            <HelpCircle size={18} strokeWidth={1.5} color="white" /> Help
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="flex-1 bg-[#e7e7ee] p-8 rounded-2xl">
        <Header />
        <div className="text-[24px] text-medium text-black">Overview</div>
        <div className="flex gap-10 mt-6">
          <div className="flex-1 min-w-[200px] bg-[#F6F7F9] rounded-[10px]">
            <div className="flex flex-col gap-2 items-start justify-center p-6">
              <div className="text-2xl text-[#030229] font-semibold">178+</div>
              <div className="text-sm text-[#030229]">Tasks</div>
            </div>
          </div>

          <div className="flex-1 min-w-[200px] bg-[#F6F7F9] rounded-[10px]">
            <div className="flex flex-col gap-2 items-start justify-center p-6">
              <div className="text-2xl text-[#030229] font-semibold">178+</div>
              <div className="text-sm text-[#030229]">Tasks</div>
            </div>
          </div>

          <div className="flex-1 min-w-[200px] bg-[#F6F7F9] rounded-[10px]">
            <div className="flex flex-col gap-2 items-start justify-center p-6">
              <div className="text-2xl text-[#030229] font-semibold">178+</div>
              <div className="text-sm text-[#030229]">Tasks</div>
            </div>
          </div>

          <div className="flex-1 min-w-[200px] bg-[#F6F7F9] rounded-[10px]">
            <div className="flex flex-col gap-2 items-start justify-center p-6">
              <div className="text-2xl text-[#030229] font-semibold">178+</div>
              <div className="text-sm text-[#030229]">Tasks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
