import emblem from "../../assets/emblem.png";
import { Globe, Headphones } from "lucide-react";

export default function RegisterNavbar() {
  return (
    <nav className="absolute top-0 left-6 right-10 z-50 flex justify-between items-start">
      {/* Left */}
      <div className="flex items-start gap-5">
        <img
          src={emblem}
          alt="Government of India"
          className="w-10 h-14 object-contain"
        />
        <div>
          <h1 className="text-[20px] font-bold text-[#0B1D48]">
            AAVEDAN-SETU 
          </h1>
          <p className="text-[#23395b] text-[18px]">
            Your Gateway to Smart Governance
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-12 mt-3">
        <button className="flex items-center gap-2 text-[#13244B] text-[18px] hover:text-purple-700 transition">
          <Globe size={16} />
          English
        </button>
        <button className="flex items-center gap-2 text-[#13244B] text-[18px] hover:text-purple-700 transition">
          <Headphones size={16} />
          Help Center
        </button>
      </div>
    </nav>
  );
}
