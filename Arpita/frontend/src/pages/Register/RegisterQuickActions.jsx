import {
  FileText,
  SearchCheck,
  Landmark,
  Bot,
} from "lucide-react";

const actions = [
  {
    id: "complaint",
    title: "Submit\nComplaint",
    icon: FileText,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    id: "status",
    title: "Track\nStatus",
    icon: SearchCheck,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    id: "schemes",
    title: "Find\nSchemes",
    icon: Landmark,
    bg: "bg-amber-100",
    color: "text-amber-600",
  },
  {
    id: "ai_assistant",
    title: "AI\nAssistant",
    icon: Bot,
    bg: "bg-pink-100",
    color: "text-violet-600",
  },
];

export default function RegisterQuickActions({ onAIChatToggle }) {
  return (
    <section className="absolute left-[40px] top-[410px] z-50">
      <div className="flex gap-10">
        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              className="group flex flex-col items-center"
              onClick={() => {
                if (item.id === "ai_assistant" && onAIChatToggle) {
                  onAIChatToggle();
                }
              }}
            >
              <div
                className={`
                  ${item.bg}
                  w-12
                  h-12
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:-translate-y-1
                `}
              >
                <Icon
                  size={15}
                  className={`${item.color}`}
                />
              </div>

              <p className="mt-3 text-[12px] font-semibold text-[#16264A] text-center whitespace-pre-line leading-4">
                {item.title}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
