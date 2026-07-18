
import { useMemo, useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function StudentHomework() {
  // Demo data (only today & previous dates)
  const homework = [
    {
      id: 1,
      subject: "Mathematics",
      title: "Complete Algebra Worksheet - Chapter 5",
      date: "2026-07-10",
      status: "Pending",
    },
    {
      id: 2,
      subject: "Science",
      title: "Prepare Solar System Project",
      date: "2026-07-10",
      status: "Submitted",
    },
    {
      id: 3,
      subject: "English",
      title: "Write Essay on My Favourite Teacher",
      date: "2026-07-09",
      status: "Pending",
    },
    {
      id: 4,
      subject: "Computer",
      title: "Create PowerPoint Presentation",
      date: "2026-07-08",
      status: "Pending",
    },
    {
      id: 5,
      subject: "Hindi",
      title: "Learn Poem and Write Question Answers",
      date: "2026-07-07",
      status: "Submitted",
    },
  ];

  // Real current date
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);

  // Previous & Next date change
  const changeDate = (days) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + days);

    const newDate = date.toISOString().split("T")[0];

    // Future date allow nahi hogi
    if (newDate <= today) {
      setSelectedDate(newDate);
    }
  };

  // Filter homework according to selected date
  const filteredHomework = useMemo(() => {
    return homework.filter(
      (item) => item.date === selectedDate
    );
  }, [selectedDate]);

  const pending = filteredHomework.filter(
    (item) => item.status === "Pending"
  ).length;

  const submitted = filteredHomework.filter(
    (item) => item.status === "Submitted"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          My Homework
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          View homework date-wise.
        </p>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => changeDate(-1)}
            className="w-11 h-11 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-3">
              <Calendar size={16} />
              <span className="text-sm">
                Select Date
              </span>
            </div>

            <input
              type="date"
              value={selectedDate}
              max={today}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
              className="border border-gray-200 rounded-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-gray-200"
            />

            <p className="text-sm text-gray-500 mt-3">
              {new Date(
                selectedDate
              ).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <button
            type="button"
            disabled={selectedDate === today}
            onClick={() => changeDate(1)}
            className={`w-11 h-11 rounded-2xl border border-gray-200 flex items-center justify-center transition ${
              selectedDate === today
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-50"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Small Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center">
              <Clock3
                size={20}
                className="text-gray-700"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Pending
              </p>

              <h3 className="text-xl font-bold text-gray-800">
                {pending}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center">
              <CheckCircle2
                size={20}
                className="text-gray-700"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Submitted
              </p>

              <h3 className="text-xl font-bold text-gray-800">
                {submitted}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Homework List */}
      <div className="space-y-4">
        {filteredHomework.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
            <div className="w-16 h-16 rounded-3xl bg-gray-100 mx-auto flex items-center justify-center mb-4">
              <FileText
                size={28}
                className="text-gray-500"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              No Homework Found
            </h3>

            <p className="text-gray-500 mt-2">
              There is no homework for this date.
            </p>
          </div>
        ) : (
          filteredHomework.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <FileText
                      size={20}
                      className="text-gray-700"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      {item.subject}
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 mt-1">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    item.status === "Submitted"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-orange-50 text-orange-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}