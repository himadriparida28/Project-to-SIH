import RegisterNewsCard from "./RegisterNewsCard";
import news1 from "../../assets/news1.jpg";
import news2 from "../../assets/news2.jpg";
import news3 from "../../assets/news3.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const news = [
  {
    title: "New Digital Initiative",
    date: "May 20, 2024",
    description: "New digital initiatives launched to improve citizen services across India.",
    image: news1,
  },
  {
    title: "Grievance Redressal",
    date: "May 18, 2024",
    description: "Faster grievance redressal system ensures transparency and accountability.",
    image: news2,
  },
  {
    title: "Women Empowerment",
    date: "May 15, 2024",
    description: "Government schemes for women empowerment and financial independence.",
    image: news3,
  },
];

export default function RegisterLatestNews() {
  return (
    <section className="absolute left-[50px] top-[470px] z-30 flex gap-20">
      {/* Left */}
      <div className="w-[15px]">
        <h2 className="text-pink-30 text-3xl font-bold">
          Latest
        </h2>
        <h2 className="text-[#14295d] text-3xl font-black leading-none">
          News
        </h2>
        <div className="flex gap-3 mt-5">
          <button className="w-20 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition">
            <ChevronLeft size={22} />
          </button>
          <button className="w-20 h-12 rounded-full bg-purple-600 text-white shadow-lg flex items-center justify-center hover:scale-110 transition">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex gap-2">
        {news.map((item, index) => (
          <RegisterNewsCard
            key={index}
            {...item}
          />
        ))}
      </div>
    </section>
  );
}
