
import { useState } from "react";
import {
  CalendarCheck,
  CalendarX,
  BookOpen,
  CheckCircle2,
  XCircle,
  ChevronDown
} from "lucide-react";

export default function StudentAttendance() {
  // Sabhi subjects ka independent attendance data
  const subjectsData = {
    "Mathematics": { present: 45, absent: 3, total: 48, percentage: 90, history: [
      { date: "10 July 2026", status: "Present" },
      { date: "08 July 2026", status: "Present" },
      { date: "06 July 2026", status: "Absent" },
    ]},
    "Science": { present: 40, absent: 5, total: 45, percentage: 87, history: [
      { date: "10 July 2026", status: "Absent" },
      { date: "09 July 2026", status: "Present" },
      { date: "07 July 2026", status: "Present" },
    ]},
    "English": { present: 42, absent: 2, total: 44, percentage: 95, history: [
      { date: "09 July 2026", status: "Present" },
      { date: "08 July 2026", status: "Present" },
      { date: "06 July 2026", status: "Present" },
    ]},
    "Computer": { present: 50, absent: 0, total: 50, percentage: 77, history: [
      { date: "10 July 2026", status: "Present" },
      { date: "07 July 2026", status: "Present" },
      { date: "05 July 2026", status: "Present" },
    ]}
  };

  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  
  // Current selected subject ka data nikalne ke liye
  const currentData = subjectsData[selectedSubject];

  // Pie Chart/Donut Chart ka fill percentage calculate karne ke liye (SVG strokeDashoffset configuration)
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentData.percentage / 100) * circumference;

  return (
    <div className="space-y-8 max-w-[1800px] mx-auto p-3">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight sm:text-2xl">Attendance Analytics</h2>
          <p className="text-gray-500 text-sm mt-1">Track your overall and subject-wise classroom attendance metrics.</p>
        </div>
      </div>

      {/* Top Row: Overall Summary & Subject Selector Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Overall Aggregate Status */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Performance</span>
            <h3 className="text-2xl font-extrabold text-gray-800 mt-2">Overall Attendance</h3>
            <p className="text-gray-400 text-xs mt-1">Combined aggregate across all enrolled modules.</p>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-baseline mb-2">
              <h4 className="text-3xl font-black text-green-500">94%</h4>
             
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-[94%] bg-green-400 rounded-full transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {/* Card 2 & 3 Combined Block: Subject Selector Toolbar */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BookOpen size={18} className="text-gray-400" />
              Select Subject Module
            </h3>
            <p className="text-xs text-gray-400 max-w-sm">Choose any academic discipline from the controller below to fetch live present/absent tracking distribution graphs.</p>
          </div>

          {/* Clean Select Custom Dropdown */}
          <div className="relative w-full sm:w-64">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-gray-50 hover:bg-gray-100/70 border border-gray-200 text-gray-700 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-green-500/20 text-sm font-semibold cursor-pointer appearance-none transition"
            >
              {Object.keys(subjectsData).map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Main Breakdown Dashboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Grid Area: Pie Chart (Donut) Analytics */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <h3 className="text-base font-bold text-gray-800 self-start mb-6 w-full text-left border-b border-gray-50 pb-3">
            {selectedSubject} Distribution
          </h3>

          {/* SVG Pure Native Tailwind Pie / Donut Chart */}
          <div className="relative flex items-center justify-center w-40 h-40">
            <svg className="w-full h-40 transform -rotate-90" viewBox="0 0 120 120">
              {/* Absent/Background Track (Red segment representation) */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="text-red-100 stroke-current"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Present Track (Green Fill Arc) */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="text-green-500 stroke-current transition-all duration-500 ease-in-out"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Center Absolute Label Text */}
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-gray-800">{currentData.percentage}%</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Attended</span>
            </div>
          </div>

          {/* Bottom Chart Legends Info */}
          <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-4 border-t border-gray-50 text-sm">
            <div className="flex flex-col items-center p-2.5 bg-green-50/40 rounded-2xl border border-green-100/40">
              <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5 mb-1">
                <CheckCircle2 size={13} className="text-green-500" /> Present Days
              </span>
              <span className="text-lg font-bold text-green-700">{currentData.present} Lectures</span>
            </div>

            <div className="flex flex-col items-center p-2.5 bg-red-50/40 rounded-2xl border border-red-100/40">
              <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5 mb-1">
                <XCircle size={13} className="text-red-500" /> Absent Days
              </span>
              <span className="text-lg font-bold text-red-700">{currentData.absent} Lectures</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 mt-4 font-medium">Total Classes Conducted: {currentData.total}</p>
        </div>

        {/* Right Grid Area: Subject Logs History */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-5 border-b border-gray-50 pb-3">
              {selectedSubject} - Activity Logs
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px]">
                <thead className="bg-gray-50/70">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider rounded-l-xl">Lecture Date</th>
                    <th className="text-center px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider rounded-r-xl">Status Descriptor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currentData.history.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition">
                      <td className="px-4 py-4 font-semibold text-gray-700 text-sm">{item.date}</td>
                      <td className="text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Present" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
