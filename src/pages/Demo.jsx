import { useState } from "react";

const demos = [
  {
    id: "admin",
    title: "Admin Dashboard",
    icon: "admin_panel_settings",
    description:
      "Manage your entire school from one powerful dashboard including students, teachers, fees, academics, reports and more.",

    image: "/images/admin_dashboard.png",

    credentials: {
      school: "DEMO",
      username: "admin",
      password: "admin123",
    },

    features: [
      "Student Management",
      "Teacher Management",
      "Fee Management",
      "Exam Management",
      "Library",
      "Transport",
      "Reports",
      "Communication",
    ],
  },

  {
    id: "teacher",
    title: "Teacher Panel",
    icon: "co_present",

    description:
      "Teachers can manage attendance, homework, examinations, marks and communicate with parents effortlessly.",

    image: "/images/teacher_dashboard.png",

    credentials: {
      school: "DEMO",
      username: "teacher",
      password: "teacher123",
    },

    features: [
      "Attendance",
      "Homework",
      "Class Timetable",
      "Marks Entry",
      "Assignments",
      "Notices",
      "Student Progress",
      "Communication",
    ],
  },

  {
    id: "student",
    title: "Student Panel",
    icon: "school",

    description:
      "Students can access homework, results, attendance, notices, timetable and learning resources anytime.",

    image: "/images/student_dashboard.png",

    credentials: {
      school: "DEMO",
      username: "student",
      password: "student123",
    },

    features: [
      "Attendance",
      "Homework",
      "Results",
      "Timetable",
      "Assignments",
      "Library",
      "Fee Status",
      "Notices",
    ],
  },

  {
    id: "parent",
    title: "Parent Panel",
    icon: "family_restroom",

    description:
      "Parents stay connected with attendance, fees, homework, exam results and school announcements.",

    image: "/images/parent_dashboard.png",

    credentials: {
      school: "DEMO",
      username: "parent",
      password: "parent123",
    },

    features: [
      "Attendance",
      "Fee Payment",
      "Homework",
      "Exam Results",
      "School Notices",
      "Progress Reports",
      "Communication",
      "Timetable",
    ],
  },

  {
    id: "mobile",
    title: "Mobile App",
    icon: "smartphone",

    description:
      "Experience the complete School ERP on Android and iOS with a beautiful mobile application.",

    image: "/images/mobile_dashboard.png",

    credentials: {
      school: "DEMO",
      username: "mobile",
      password: "mobile123",
    },

    features: [
      "Push Notifications",
      "Attendance",
      "Homework",
      "Fees",
      "Results",
      "Timetable",
      "Messages",
      "Events",
    ],
  },
];


export default function Demo() {
  const [activeDemo, setActiveDemo] = useState(demos[0]);

  return (
    <section className="bg-gradient-to-b from-[#f6f7fb] to-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Hero */}

        <div className="max-w-3xl mx-auto text-center">

          <span className="uppercase tracking-[3px] font-semibold text-red-600">
            Live Demo
          </span>

          <h1 className="text-4xl font-bold text-gray-900 mt-5 leading-tight">
            Experience Our Future Academy Before You Decide
          </h1>

          <p className="text-gray-500 text-lg mt-6 leading-8">
            Explore every module including Admin Dashboard, Teacher Panel,
            Student Portal, Parent Portal and Mobile App with an interactive
            live preview.
          </p>


        </div>

        {/* Demo Cards */}

        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6 mt-20">

          {demos.map((demo) => (

            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo)}
              className={`rounded-2xl border p-9 text-center transition-all duration-300

              ${
                activeDemo.id === demo.id
                  ? "border-green-400 shadow-xl bg-green-50"
                  : "border-gray-200 bg-white hover:border-red-300 hover:-translate-y-2"
              }
              
              `}
            >

              <div
                className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center

                ${
                  activeDemo.id === demo.id
                    ? "bg-green-600"
                    : "bg-red-100"
                }
                
                `}
              >

                <span
                  className={`material-symbols-outlined text-4xl

                  ${
                    activeDemo.id === demo.id
                      ? "text-white"
                      : "text-red-600"
                  }
                  
                  `}
                >
                  {demo.icon}
                </span>

              </div>

              <h3 className="mt-6 text-1xl font-bold text-gray-900">
                {demo.title}
              </h3>

            </button>

          ))}

        </div>

        {/* Selected Demo */}

        <div className="mt-20 bg-white rounded-[35px] shadow-xl border border-gray-200 overflow-hidden">

          <div className="grid lg:grid-cols-[58%_42%] items-stretch">

            {/* Image */}

           
            <div className="bg-gray-100 flex items-center justify-center p-10 min-h-[600px]">

              <img
                src={activeDemo.image}
                alt={activeDemo.title}
                className="max-w-full max-h-[520px] object-contain mx-auto transition-all duration-300"
              />

            </div>

            {/* Right Side */}

            <div className="p-8 lg:p-12 flex flex-col justify-center">

              <span className="uppercase tracking-[3px] text-red-600 font-semibold">
                Live Preview
              </span>

              <h2 className="text-4xl font-bold mt-4 text-gray-900">
                {activeDemo.title}
              </h2>

              <p className="text-gray-600 mt-6 leading-8">
                {activeDemo.description}
              </p>

              {/* Features */}

              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-5">
                  Included Features
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {activeDemo.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-600 text-lg">
                          check
                        </span>
                      </div>

                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo Credentials */}

              <div className="mt-12 rounded-3xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Demo Login Credentials
                </h3>

                <div className="space-y-5">

                  <div>
                    <label className="block text-sm font-semibold text-gray-500">
                      School Code
                    </label>

                    <div className="mt-2 rounded-xl bg-white border px-4 py-3 font-semibold text-gray-800">
                      {activeDemo.credentials.school}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-500">
                      Username
                    </label>

                    <div className="mt-2 rounded-xl bg-white border px-4 py-3 font-semibold text-gray-800">
                      {activeDemo.credentials.username}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-500">
                      Password
                    </label>

                    <div className="mt-2 rounded-xl bg-white border px-4 py-3 font-semibold text-gray-800">
                      {activeDemo.credentials.password}
                    </div>
                  </div>

                </div>

                <button
                  className="w-full mt-8 bg-gradient-to-r from-green-600 to-green-700
                  hover:from-green-700 hover:to-green-800
                  text-white py-4 rounded-2xl font-semibold
                  shadow-lg transition duration-300 hover:-translate-y-1"
                >
                  Launch Live Demo
                </button>
              </div>

            </div>

          </div>

        </div>

        

      </div>

    </section>
  );
}