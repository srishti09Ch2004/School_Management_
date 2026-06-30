const badge = "Everything Included";

const title = "School Features, All in One Place";

const subtitle =
  "From attendance to the library — every workflow your school needs.";

const features = [
  {
    icon: "calendar_month",
    title: "Attendance Management",
    description:
      "Automated attendance with instant reports and parent notifications.",
  },
  {
    icon: "assignment",
    title: "Result Management",
    description:
      "Create, publish and manage student results with ease.",
  },
  {
    icon: "payments",
    title: "Online Fees",
    description:
      "Secure online fee collection with receipts and payment history.",
  },
  {
    icon: "menu_book",
    title: "Homework",
    description:
      "Assign homework digitally and track submissions effortlessly.",
  },
  {
    icon: "schedule",
    title: "Class Timetable",
    description:
      "Create and manage class schedules without conflicts.",
  },
  {
    icon: "library_books",
    title: "Library Management",
    description:
      "Issue, return and manage books through a digital library.",
  },
];

function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#f2f2f4] to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-6">

        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-5 py-4 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
            {badge}
          </span>

          <h2 className="mt-4 text-4xl font-bold text-gray-900 lg:text-5xl">
            {title}
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-500">
            {subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-green-500 transition-all duration-300"
            >
              <div className="flex items-start gap-5">

                <div className="flex items-center justify-center w-19 h-11 rounded-2xl bg-gradient-to-br from-red-50 to-green-100 border border-gray-100 shadow-sm group-hover:from-green-500 group-hover:to-green-600 transition-all duration-300">

                  <span className="material-symbols-outlined text-3xl text-red-600 group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </span>

                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-700 transition">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;