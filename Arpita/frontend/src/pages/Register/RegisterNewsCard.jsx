export default function RegisterNewsCard({
  image,
  title,
  date,
  description,
}) {
  return (
    <div className="w-[180px] bg-white/50 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-5">
      <div className="flex items-center gap-2">
        <img
          src={image}
          alt=""
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-[12px] text-[#1c2957] truncate w-[90px]">
            {title}
          </h3>
          <p className="text-xs text-gray-500">
            {date}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[14px] text-[#334155] leading-5 line-clamp-9 h-28">
        {description}
      </p>

      <button className="mt text-purple-600 font-semibold text-sm hover:translate-x-1 transition flex items-center gap-3">
        Read More →
      </button>
    </div>
  );
}
