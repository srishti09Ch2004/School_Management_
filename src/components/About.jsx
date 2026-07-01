
import {
  GraduationCap,
  Target,
  Eye,
} from "lucide-react";

function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-red-50 py-28">
        {/* Background Blur */}
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-red-100/40 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-16 text-center">
          
          <h1 className="mt-8 text-4xl md:text-5xl font-black leading-tight text-gray-900">
            Transforming Education Through Smart School Management
            
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-lg leading-9 text-gray-600">
            Driksha is an intelligent School Management System built to
            simplify administration, strengthen communication, automate
            academic operations, and create a seamless digital experience
            for students, teachers, parents, and school administrators.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          <div className="text-center">
            <span className="uppercase tracking-[4px] text-red-600 font-semibold text-xl">
              Our Purpose
            </span>

            <h2 className="mt-5 text-4xl md:text-5xl font-bold text-gray-900">
              Empowering Modern Education
            </h2>

            <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-gray-600">
              We believe technology should simplify education, not complicate
              it. Our platform helps institutions streamline daily operations,
              improve collaboration, and create better learning experiences.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mt-20">

            {/* Mission */}

            <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-10 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl">

              <div className="absolute top-0 left-0 h-1 w-full bg-green-500"></div>

              <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                <Target size={30} />
              </div>

              <h3 className="mt-8 text-3xl font-bold text-gray-900">
                Our Mission
              </h3>

              <p className="mt-6 text-gray-600 leading-8">
                Our mission is to simplify school administration by providing
                an innovative digital platform that automates routine tasks,
                improves communication, and enables educators to focus on
                delivering quality education instead of paperwork.
              </p>

            </div>

            {/* Vision */}

            <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-10 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl">

              <div className="absolute top-0 left-0 h-1 w-full bg-red-500"></div>

              <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <Eye size={30} />
              </div>

              <h3 className="mt-8 text-3xl font-bold text-gray-900">
                Our Vision
              </h3>

              <p className="mt-6 text-gray-600 leading-8">
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