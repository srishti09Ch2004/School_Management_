import { useState } from "react";
import {
  Save,
  School,
  GraduationCap,
  IndianRupee,
  CalendarDays,
  FileCheck,
  Bell,
  Shield,
  Palette,
  Database,
} from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("school");

  const menuItems = [
    { id: "school", name: "School", icon: School },
    { id: "academic", name: "Academic", icon: GraduationCap },
    { id: "finance", name: "Finance", icon: IndianRupee },
    { id: "attendance", name: "Attendance", icon: CalendarDays },
    { id: "exam", name: "Exams", icon: FileCheck },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Security", icon: Shield },
    { id: "appearance", name: "Appearance", icon: Palette },
    { id: "backup", name: "Backup", icon: Database },
  ];

  const Input = ({
    label,
    type = "text",
    defaultValue = "",
  }) => (
    <div>
      <label className="text-sm font-medium text-gray-600">
        {label}
      </label>

      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );

  const Select = ({ label, options }) => (
    <div>
      <label className="text-sm font-medium text-gray-600">
        {label}
      </label>

      <select className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500">
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "school":
        return (
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="School Name"
              defaultValue="Future Academy"
            />
            <Input
              label="School Code"
              defaultValue="FA2026"
            />
            <Input
              label="Principal Name"
              defaultValue="Dr Rajesh Kumar"
            />
            <Input
              label="Official Email"
              type="email"
              defaultValue="futureacademy@gmail.com"
            />
            <div className="md:col-span-2">
              <Input
                label="School Address"
                defaultValue="Lucknow, Uttar Pradesh"
              />
            </div>
          </div>
        );

      case "academic":
        return (
          <div className="grid md:grid-cols-2 gap-5">
            <Select
              label="Session"
              options={["2026-27", "2025-26"]}
            />

            <Select
              label="Medium"
              options={["English", "Hindi"]}
            />

            <Input
              label="Total Classes"
              type="number"
              defaultValue="12"
            />

            <Input
              label="Sections"
              defaultValue="A, B, C"
            />
          </div>
        );

      case "finance":
        return (
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Late Fee"
              type="number"
              defaultValue="100"
            />

            <Select
              label="Payment Gateway"
              options={["Razorpay", "Paytm"]}
            />
          </div>
        );

      case "attendance":
        return (
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="School Start Time"
              type="time"
              defaultValue="08:00"
            />

            <Input
              label="Minimum Attendance %"
              type="number"
              defaultValue="75"
            />
          </div>
        );

      case "exam":
        return (
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Passing Percentage"
              type="number"
              defaultValue="33"
            />

            <Select
              label="Grade System"
              options={["A+ to F", "CGPA"]}
            />
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-4">
            {["Email", "SMS", "Parent App"].map(
              (item) => (
                <div
                  key={item}
                  className="border rounded-2xl p-5 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">
                      {item}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Enable {item} notifications
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 accent-green-600"
                  />
                </div>
              )
            )}
          </div>
        );

      case "security":
        return (
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Password Length"
              type="number"
              defaultValue="8"
            />

            <Select
              label="Two Factor Authentication"
              options={["Enabled", "Disabled"]}
            />
          </div>
        );

      case "appearance":
        return (
          <div className="grid md:grid-cols-3 gap-5">
            {["Blue", "Green", "Purple"].map(
              (color) => (
                <button
                  key={color}
                  className="border rounded-2xl p-6 hover:border-green-500"
                >
                  {color}
                </button>
              )
            )}
          </div>
        );

      case "backup":
        return (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold">
              Database Backup
            </h3>

            <p className="text-gray-500 mt-2">
              Backup and restore school data.
            </p>

            <div className="flex gap-3 mt-5">
              <button className="bg-green-600 text-white px-5 py-3 rounded-xl">
                Backup
              </button>

              <button className="bg-red-600 text-white px-5 py-3 rounded-xl">
                Restore
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white p-6 rounded-3xl shadow flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            School Settings
          </h1>

          <p className="text-gray-500">
            Manage your school configuration.
          </p>
        </div>

        <button className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        <div className="bg-white rounded-3xl p-3 shadow">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() =>
                  setActiveTab(item.id)
                }
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition ${
                  activeTab === item.id
                    ? "bg-green-50 text-green-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}