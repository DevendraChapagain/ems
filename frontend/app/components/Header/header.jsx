import React from "react";
import { Search } from "lucide-react";

const header = () => {
  return (
    <div className=" text-white flex py-4 justify-between items-center rounded-2xl">
      <div className="w-[480px] px-2 py-3 rounded-[8px] flex items-center gap-2 border-1 border-blue-950">
        <div className="flex gap-2 px-2 text-[#030229]">
          <Search size={20} strokeWidth={1.5} color="#030229" /> Search
        </div>
      </div>
      <div>Account info</div>
    </div>
  );
};

export default header;
