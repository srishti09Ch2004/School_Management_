import { useState, useEffect, useMemo } from "react";

import {
  Search,
  Plus,
  ClipboardCheck,
  CalendarDays,
  Award,
  Pencil,
  Trash2,
} from "lucide-react";

export default function AdminExam() {
  const [exams, setExams] = useState([]);
const [searchQuery, setSearchQuery] = useState("");

const [showAddModal, setShowAddModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);

const [examForm, setExamForm] = useState({
  exam_name: "",
  class: "",
  section: "",
  subject: "",
  exam_date: "",
  start_time: "",
  end_time: "",
  total_marks: "",
  passing_marks: "",
  status: "Scheduled",
});

const [editExam, setEditExam] = useState(null);

const fetchExams = () => {

  fetch("http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/exams.php")

    .then((res) => res.json())

    .then((data) => {

      if (data.status) {

        setExams(data.data);

      }

    });

};

useEffect(() => {

    fetchExams();

}, []);

const handleChange = (e) => {

    setExamForm({

        ...examForm,

        [e.target.name]: e.target.value

    });

};


const handleSubmit = async () => {

    const response = await fetch(
        "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/addExam.php",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(examForm),
        }
    );

    const data = await response.json();

    alert(data.message);

    if (data.status) {

        setShowAddModal(false);

        setExamForm({
            exam_name: "",
            class_name: "",
            exam_date: "",
            status: "Upcoming",
        });

        fetchExams();
    }
};


const filteredExams = useMemo(() => {

  if (!searchQuery.trim()) return exams;

  return exams.filter((exam) =>
    exam.exam_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.class_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

}, [exams, searchQuery]);


  const stats = [
  {
    title: "Total Exams",
    value: "18",
    icon: ClipboardCheck,
    bg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Upcoming Exams",
    value: "5",
    icon: CalendarDays,
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Results Published",
    value: "13",
    icon: Award,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];



  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Exam Management
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Manage school examinations and results.
          </p>
        </div>

        <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition"
          >
            <Plus size={18} />
            Add Exam
          </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-xl font-bold text-gray-800 mt-2">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`${item.bg} w-11 h-11 rounded-2xl flex items-center justify-center`}
                >
                  <Icon
                    size={20}
                    className={item.iconColor}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search exam..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Exam List
          </h2>

          <span className="text-sm text-gray-500">
            Total : {filteredExams.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-600">
                <th className="px-6 py-4 text-left">
                  Exam Name
                </th>

                <th className="px-6 py-4 text-center">
                  Class
                </th>

                <th className="px-6 py-4 text-center">
                  Date
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredExams.map((exam) => (
                <tr
                  key={exam.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-medium text-gray-800">
                    {exam.exam}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {exam.class}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {exam.date}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exam.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : exam.status === "Upcoming"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition">
                        <Pencil size={16} />
                      </button>

                      <button className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}