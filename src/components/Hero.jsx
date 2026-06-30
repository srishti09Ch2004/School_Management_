function Hero() {
  const academyName = "Future Academy";

  const heading = "Empowering Minds. Shaping Futures.";

  const description =
    "Future Academy provides a dynamic and supportive space where quality education meets modern learning to build your successful tomorrow.";

  return (
    <section className="bg-gradient-to-r from-[#f5f9f8] via-[#f9fcfb] to-white min-h-[89vh] flex items-center">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">

          {/* Left Content */}
          <div className="flex-1 lg:-mt-16 text-center lg:text-left">

            <span className="text-red-600 font-semibold uppercase tracking-[2px]">
              {academyName}
            </span>

            <h1 className="mt-4 text-4xl lg:text-6xl font-bold leading-tight text-gray-900">
              {heading}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-500">
              {description}
            </p>

            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">

              <button className="px-8 py-3 text-white transition bg-green-600 rounded-full hover:bg-green-700">
                Get Started
              </button>

              <button className="px-8 py-3 text-green-600 transition bg-white border border-green-600 rounded-full hover:bg-green-50">
                Login
              </button>

            </div>

          </div>

          {/* Right Image */}

          <div className="flex justify-center flex-1">

            <div className="overflow-hidden border-4 border-white rounded-full shadow-2xl w-[330px] h-[330px] md:w-[430px] md:h-[430px] lg:w-[520px] lg:h-[520px]">

              <img
                src="/images/hero-students.png"
                alt="Students"
                className="object-cover w-full h-full"
              />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;