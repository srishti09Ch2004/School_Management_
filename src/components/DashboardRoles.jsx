const roles = [
  {
    title: "Student",
    icon: "school",
    color: "bg-blue-500",
    desc: "Attendance, Homework, Results & Timetable",
  },
  {
    title: "Teacher",
    icon: "co_present",
    color: "bg-green-500",
    desc: "Manage Classes, Marks & Attendance",
  },
  {
    title: "Parent",
    icon: "family_restroom",
    color: "bg-pink-500",
    desc: "Track Child Progress, Fees & Homework",
  },
  {
    title: "Principal",
    icon: "shield_person",
    color: "bg-gray-800",
    desc: "Analytics, Reports & School Overview",
  },
];

function DashboardRoles() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

         <div className="max-w-3xl mx-auto text-center">
          <span className="text-red-600 uppercase tracking-[3px] font-semibold">
            Dashboard Access
          </span>

          <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-gray-900">
            One Platform, <span className="text-green-600">Every User</span>
          </h2>

          <p className="mt-5 text-gray-600 text-lg">
            Smart dashboards designed for every member of your school.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 mt-20">

          {roles.map((role, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >

              <div
                className={`w-14 h-14 rounded-2xl ${role.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {role.icon}
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-bold text-gray-900">
                {role.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {role.desc}
              </p>

              <button className="mt-7 text-green-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore
                <span className="material-symbols-outlined text-xl">
                  arrow_forward
                </span>
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default DashboardRoles;