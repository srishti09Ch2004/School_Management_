import { Target, Eye } from "lucide-react";

function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-white">
        {/* Background Image */}
        <img
          src="/images/about.jpeg"
          alt="About"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Light Overlay */}
        <div className="absolute inset-0 bg-white/20" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 -mt-20">
          <div className="max-w-4xl text-center animate-fade-in">
            <h1 className="text-3xl font-black leading-snug text-gray-900 md:text-5xl">
              Transforming Education Through
              <span className="mt-2 block text-green-700">
                Smart School Management
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-700 md:text-sm">
              Driksha simplifies school administration, automates academic
              operations and creates a seamless digital experience for
              students, teachers, parents and administrators.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="text-center">
            <span className="text-xl font-semibold uppercase tracking-[4px] text-red-600">
              Our Purpose
            </span>

            <h2 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
              Empowering Modern Education
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              We believe technology should simplify education, not complicate
              it. Our platform helps institutions streamline daily operations,
              improve collaboration, and create better learning experiences.
            </p>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-2">
            {/* Mission */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-green-50 p-10 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
              <div className="absolute left-0 top-0 h-1 w-full bg-green-500"></div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <Target size={30} />
              </div>

              <h3 className="mt-8 text-3xl font-bold text-gray-900">
                Our Mission
              </h3>

              <p className="mt-6 leading-8 text-gray-600">
                Our mission is to simplify school administration by providing
                an innovative digital platform that automates routine tasks,
                improves communication, and enables educators to focus on
                delivering quality education instead of paperwork.
              </p>
            </div>

            {/* Vision */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-red-50 p-10 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
              <div className="absolute left-0 top-0 h-1 w-full bg-red-500"></div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <Eye size={30} />
              </div>

              <h3 className="mt-8 text-3xl font-bold text-gray-900">
                Our Vision
              </h3>

              <p className="mt-6 leading-8 text-gray-600">
                We envision a future where every educational institution
                embraces digital transformation to create efficient,
                transparent, and student-focused learning environments that
                inspire excellence and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;