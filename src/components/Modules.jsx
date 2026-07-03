const modules = [
  {
    icon: "school",
    title: "Student Management",
    description:
      "Manage student profiles, attendance, records and academic details.",
  },
  {
    icon: "person_add",
    title: "Admission",
    description:
      "Simplify admissions, registrations and document verification.",
  },
  {
    icon: "co_present",
    title: "Teacher Management",
    description:
      "Manage teachers, subjects, schedules and daily attendance.",
  },
  {
    icon: "menu_book",
    title: "Academics",
    description:
      "Organize classes, subjects, curriculum and homework with ease.",
  },
  {
    icon: "fact_check",
    title: "Attendance",
    description:
      "Track student and staff attendance with smart reports.",
  },
  {
    icon: "calendar_month",
    title: "Timetable",
    description:
      "Create class schedules and avoid timetable conflicts.",
  },
  {
    icon: "payments",
    title: "Fee Management",
    description:
      "Collect fees online, generate receipts and track payments.",
  },
  {
    icon: "grading",
    title: "Examination",
    description:
      "Conduct exams, publish results and generate report cards.",
  },
  {
    icon: "library_books",
    title: "Library",
    description:
      "Manage books, issue returns and library inventory easily.",
  },
  {
    icon: "directions_bus",
    title: "Transport",
    description:
      "Manage buses, routes, drivers and student transport.",
  },
  {
    icon: "apartment",
    title: "Hostel",
    description:
      "Handle room allocation, residents and hostel records.",
  },
  {
    icon: "account_balance_wallet",
    title: "Payroll & HR",
    description:
      "Manage salaries, payroll, leaves and employee records.",
  },
  {
    icon: "family_restroom",
    title: "Parent Portal",
    description:
      "Parents can track attendance, fees, homework and results.",
  },
  {
    icon: "campaign",
    title: "Communication",
    description:
      "Send notices, SMS, emails and instant announcements.",
  },
  {
    icon: "analytics",
    title: "Reports & Analytics",
    description:
      "Generate insightful reports with real-time school analytics.",
  },
];

export default function Modules() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">

          <span className="text-red-600 uppercase tracking-[3px] font-semibold">
            Our Modules
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Everything Your School Needs
          </h2>

          <p className="mt-5 text-lg text-gray-600 leading-8">
            Powerful ERP modules designed to simplify academics,
            administration, finance, communication and everyday school
            operations.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid gap-8 mt-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {modules.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl border border-gray-200 p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-br from-red-50 to-green-100 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-4xl text-green-600">
                  {item.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}