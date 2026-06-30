const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Parent",
    school: "Delhi Public School",
    review:
      "The school management system keeps me updated with my child's attendance, homework and results. Everything is available in one place.",
  },
  {
    name: "Rahul Verma",
    role: "Teacher",
    school: "Future Academy",
    review:
      "Managing attendance, assignments and marks has become incredibly easy. It saves time and improves communication with parents.",
  },
  {
    name: "Aditya Singh",
    role: "Student",
    school: "Green Valley School",
    review:
      "I can easily check homework, class schedules and exam results anytime. The interface is clean, fast and very easy to use.",
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}

         <div className="max-w-3xl mx-auto text-center">
          <span className="text-red-600 uppercase tracking-[3px] font-semibold">
            Testimonials
          </span>

          <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-gray-900">
            Trusted By Our Community
          </h2>

          <p className="mt-5 text-lg text-gray-600 leading-8">
            Hear what students, teachers and parents say about their
            experience with our School Management System.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >

              {/* Quote */}

              <div className="absolute top-6 right-6 text-green-100 group-hover:text-green-200 transition">

                <span className="material-symbols-outlined text-6xl">
                  format_quote
                </span>

              </div>

              {/* Stars */}

              <div className="flex gap-1 mb-6">

                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="material-symbols-outlined text-yellow-400 text-[20px]"
                  >
                    star
                  </span>
                ))}

              </div>

              {/* Review */}

              <p className="text-gray-600 leading-8 relative z-10">
                "{item.review}"
              </p>

              {/* User */}

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white flex items-center justify-center text-lg font-bold shadow-lg">
                  {item.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div>

                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h4>

                  <p className="text-sm text-green-600 font-medium">
                    {item.role}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.school}
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

export default Testimonials;