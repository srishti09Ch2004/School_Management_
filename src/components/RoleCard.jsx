import {
  GraduationCap,
  UserCog,
  HeartHandshake,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

function RoleCard({ role, selectedRole, onSelect }) {
  const isActive = selectedRole?.id === role.id;

  const icons = {
    graduation: <GraduationCap size={26} />,
    teacher: <UserCog size={26} />,
    parent: <HeartHandshake size={26} />,
    principal: <Briefcase size={26} />,
    admin: <ShieldCheck size={26} />,

  };

  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-400",
      shadow: "shadow-blue-100",
    },

    green: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-400",
      shadow: "shadow-green-100",
    },

    pink: {
      bg: "bg-pink-100",
      text: "text-pink-700",
      border: "border-pink-400",
      shadow: "shadow-pink-100",
    },

    purple: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      border: "border-purple-400",
      shadow: "shadow-purple-100",
    },

    orange: {
      bg: "bg-orange-100",
      text: "text-orange-700",
      border: "border-orange-400",
      shadow: "shadow-orange-100",
    },
  };

  const style = colors[role.color];

  return (
    <button
      onClick={onSelect}
      className={`relative text-left p-8 rounded-3xl border transition-all duration-300 group overflow-hidden

      ${
        isActive
          ? `${style.border} shadow-xl ${style.shadow} bg-white scale-[1.02]`
          : "border-gray-200 bg-white hover:border-green-200 hover:shadow-lg hover:-translate-y-1"
      }`}
    >
      {/* Glow */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 to-red-100/20"></div>
      )}

      {/* Selected Badge */}

      {isActive && (
        <div className="absolute top-3 right-4 text-green-700">
          <CheckCircle2 size={20} />
        </div>
      )}

      <div className="relative flex gap-6 items-start">

        <div
          className={`w-18 h-10 rounded-2xl flex items-center justify-center transition-all

          ${style.bg}

          ${style.text}

          group-hover:scale-110`}
        >
          {icons[role.icon]}
        </div>

        <div>

          <h3 className="font-bold text-xl text-gray-900">
            {role.title}
          </h3>

          <p className="mt-2 text-gray-500 leading-6 text-sm">
            {role.description}
          </p>

        </div>

      </div>
    </button>
  );
}

export default RoleCard;