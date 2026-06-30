function WhyChoose() {
  const title = "Why Choose Future Academy?";

  const subtitle =
    "We provide quality education with modern technology, experienced faculty, and a safe learning environment to help every student achieve success.";

  const cards = [
    {
      icon: "school",
      title: "Smart Learning",
      description:
        "Interactive classrooms, smart boards and digital learning methods for better understanding.",
    },
    {
      icon: "groups",
      title: "Experienced Teachers",
      description:
        "Highly qualified and experienced teachers who focus on every student's overall development.",
    },
    {
      icon: "security",
      title: "Safe Campus",
      description:
        "24/7 CCTV surveillance, secure campus and disciplined environment for every student.",
    },
    {
      icon: "computer",
      title: "Digital Education",
      description:
        "Online assignments, attendance, examinations and study materials available anytime.",
    },
    {
      icon: "menu_book",
      title: "Modern Library",
      description:
        "Well-stocked digital and physical library with thousands of educational resources.",
    },
    {
      icon: "sports_soccer",
      title: "Sports Activities",
      description:
        "Indoor and outdoor sports facilities that promote physical fitness and teamwork.",
    },
    {
      icon: "science",
      title: "Science Labs",
      description:
        "Advanced laboratories equipped with modern instruments for practical learning.",
    },
    {
      icon: "emoji_events",
      title: "Excellent Results",
      description:
        "Consistent academic excellence with outstanding student performance every year.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#f4f8f7] to-[#f4f8f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">

          <span className="text-red-600 uppercase tracking-[3px] font-semibold">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900">
            {title}
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            {subtitle}
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {cards.map((card, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-3 hover:border-green-500 transition-all duration-500"
            >

              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 group-hover:bg-green-600 transition duration-500">

                <span className="material-symbols-outlined text-4xl text-green-700 group-hover:text-white transition duration-500">
                  {card.icon}
                </span>

              </div>

              <h3 className="text-2xl font-bold text-gray-900 min-h-[64px] mb-4 group-hover:text-green-700 transition">
                {card.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {card.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default WhyChoose;