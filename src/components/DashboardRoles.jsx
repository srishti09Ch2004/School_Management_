import {
  GraduationCap,
  UserCog,
  HeartHandshake,
  Briefcase,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const roles = [
  {
    title: "Student",
    icon: <GraduationCap size={28} />,
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "hover:border-blue-400",
    desc: "Attendance, Homework, Results & Timetable",
  },
  {
    title: "Teacher",
    icon: <UserCog size={28} />,
    bg: "bg-green-100",
    text: "text-green-700",
    border: "hover:border-green-400",
    desc: "Manage Classes, Marks & Attendance",
  },
  {
    title: "Parent",
    icon: <HeartHandshake size={28} />,
    bg: "bg-pink-100",
    text: "text-pink-700",
    border: "hover:border-pink-400",
    desc: "Track Child Progress, Fees & Homework",
  },
  {
    title: "Principal",
    icon: <Briefcase size={28} />,
    bg: "bg-purple-100",
    text: "text-purple-700",
    border: "hover:border-purple-400",
    desc: "Analytics, Reports & School Overview",
  },
  {
    title: "Admin",
    icon: <ShieldCheck size={28} />,
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "hover:border-orange-400",
    desc: "Manage Users, School Settings, Roles & Complete System Control",
  },
];

function DashboardRoles() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <span className="text-red-600 uppercase tracking-[3px] font-semibold">
            Dashboard Access
          </span>

          <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-gray-900">
            One Platform, Every User
          </h2>

          <p className="mt-5 text-gray-600 text-lg leading-8">
            Smart dashboards designed for every member of your school,
            providing secure access to the tools and information they need.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mt-20">

          {roles.map((role, index) => (

            <div
              key={index}
              className={`group rounded-3xl bg-white border border-gray-200
              p-8 shadow-sm transition-all duration-300
              hover:-translate-y-2 hover:shadow-2xl
              ${role.border}
              ${
                index >= 3
                  ? "lg:col-span-3"
                  : "lg:col-span-2"
              }`}
            >

              {/* Icon */}

              <div
                className={`w-13 h-13 rounded-2xl
                ${role.bg}
                ${role.text}
                flex items-center justify-center
                shadow-md
                group-hover:scale-110
                transition-all duration-300`}
              >
                {role.icon}
              </div>

              {/* Title */}

              <h3 className="mt-8 text-2xl font-bold text-gray-900">
                {role.title}
              </h3>

              {/* Description */}

              <p className="mt-4 text-gray-600 leading-7">
                {role.desc}
              </p>

             

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default DashboardRoles;