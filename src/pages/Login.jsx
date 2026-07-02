import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import RoleCard from "../components/RoleCard";
import LoginForm from "../components/LoginForm";

function Login() {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Access classes, assignments and results.",
      color: "blue",
      icon: "graduation",
    },
    {
      id: "teacher",
      title: "Teacher",
      description: "Manage classes and attendance.",
      color: "green",
      icon: "teacher",
    },
    {
      id: "parent",
      title: "Parent",
      description: "Track your child's progress.",
      color: "pink",
      icon: "parent",
    },
    {
      id: "principal",
      title: "Principal",
      description: "Monitor school operations.",
      color: "purple",
      icon: "principal",
    },
    {
      id: "admin",
      title: "Admin",
      description: "Manage the complete platform.",
      color: "orange",
      icon: "admin",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-red-50">

      {/* Background Blur */}
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-green-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-red-300/20 rounded-full blur-3xl"></div>

      <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] -translate-x-1/2 -translate-y-1/2 bg-green-100 rounded-full blur-[140px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-10">

        {/* Back Button */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 mt-10 items-start">

          {/* LEFT */}

          <div>

            <span className="inline-flex items-center px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
              Welcome to Driksha
            </span>

            <h1 className="mt-6 text-5xl lg:text-6xl font-black leading-tight text-gray-900">
              Sign in to your
              <span className="block text-green-600">
                Digital Campus
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">
              Choose your role to continue securely. Every dashboard is
              designed specifically for your responsibilities inside your
              institution.
            </p>

            {/* Role Cards */}

            <div className="grid md:grid-cols-2 gap-5 mt-12">

              {roles.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  selectedRole={selectedRole}
                  onSelect={() => setSelectedRole(role)}
                />
              ))}

            </div>

          </div>

          {/* RIGHT */}

          <div className="sticky top-10">

            <div className="rounded-[35px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_60px_rgba(0,0,0,.08)] p-10">

              {!selectedRole ? (

                <div className="flex flex-col justify-center items-center py-20">

                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">

                    <span className="text-5xl">
                      🎓
                    </span>

                  </div>

                  <h2 className="mt-8 text-3xl font-bold">

                    Select Your Role

                  </h2>

                  <p className="mt-4 text-center text-gray-500 leading-7">

                    Please choose your role from the left panel.

                    <br />

                    The login form will appear here.

                  </p>

                </div>

              ) : (

                <LoginForm role={selectedRole} />

              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Login;