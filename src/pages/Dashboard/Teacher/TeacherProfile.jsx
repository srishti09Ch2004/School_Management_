import { useState } from "react";
import {
  Mail,
  Phone,
  Briefcase,
  Award,
  BookOpen,
  MapPin,
  Calendar,
  Lock,
  Users,
  GraduationCap,
  Edit,
} from "lucide-react";

export default function TeacherProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  const teacherData = {
    name: "Rajesh Kumar",
    role: "Mathematics Teacher",
    id: "EMP-2026-089",
    email: "rajesh@futureacademy.com",
    phone: "+91 98765 43210",
    department: "Mathematics Department",
    experience: "8 Years",
    joiningDate: "12 July 2018",
    location: "Greater Noida, India",
avatar:
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    qualifications: [
      "M.Sc. Mathematics",
      "B.Ed.",
    ],
    assignedClasses: [
      {
        code: "10-A",
        subject: "Algebra",
        strength: 40,
      },
      {
        code: "12-A",
        subject: "Calculus",
        strength: 35,
      },
      {
        code: "11-B",
        subject: "Trigonometry",
        strength: 38,
      },
    ],
  };

  const totalStudents =
    teacherData.assignedClasses.reduce(
      (a, b) => a + b.strength,
      0
    );

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-center">
<div className="w-20 h-14 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-md border border-slate-200">
  <img
    src={teacherData.avatar}
    alt={teacherData.name}
    // className="w-22 h-22 object-contain"
  />
</div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-800">
              {teacherData.name}
            </h2>

            <p className="text-slate-500 mt-1">
              {teacherData.role}
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <GraduationCap size={16} />
                {teacherData.department}
              </span>

              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {teacherData.location}
              </span>

              <span className="flex items-center gap-1">
                <Briefcase size={16} />
                {teacherData.id}
              </span>
            </div>
          </div>

          <button className="bg-slate-900 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-800">
            <Edit size={18} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-slate-400 text-sm">
            Assigned Classes
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {teacherData.assignedClasses.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-slate-400 text-sm">
            Total Students
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {totalStudents}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-slate-400 text-sm">
            Experience
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {teacherData.experience}
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-sm flex gap-2 overflow-auto">
        {[
          "overview",
          "classes",
          "security",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab)
            }
            className={`px-5 py-3 rounded-xl capitalize whitespace-nowrap transition ${
              activeTab === tab
                ? "bg-slate-900 text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-xl mb-6">
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <InfoCard
              icon={<Mail size={18} />}
              title="Email"
              value={teacherData.email}
            />

            <InfoCard
              icon={<Phone size={18} />}
              title="Phone"
              value={teacherData.phone}
            />

            <InfoCard
              icon={<Calendar size={18} />}
              title="Joining Date"
              value={teacherData.joiningDate}
            />

            <InfoCard
              icon={<Briefcase size={18} />}
              title="Experience"
              value={teacherData.experience}
            />
          </div>

          <div className="mt-8">
            <h4 className="font-semibold mb-3">
              Qualifications
            </h4>

            <div className="space-y-3">
              {teacherData.qualifications.map(
                (item, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 p-4 rounded-xl"
                  >
                    <div className="flex gap-2 items-center">
                      <Award
                        size={18}
                        className="text-blue-600"
                      />
                      {item}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Classes */}
      {activeTab === "classes" && (
        <div className="grid md:grid-cols-2 gap-5">
          {teacherData.assignedClasses.map(
            (cls, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl shadow-sm"
              >
                <h3 className="font-bold text-lg">
                  Class {cls.code}
                </h3>

                <p className="text-slate-500 mt-2">
                  {cls.subject}
                </p>

                <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
                  <Users size={16} />
                  {cls.strength} Students
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className="bg-white rounded-3xl p-6 shadow-sm max-w-xl">
          <h3 className="font-bold text-xl mb-5">
            Change Password
          </h3>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full border rounded-xl p-3"
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-xl p-3"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-xl p-3"
            />

            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <Lock size={18} />
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4 flex gap-3">
      <div className="text-slate-500">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-400">
          {title}
        </p>

        <p className="font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}