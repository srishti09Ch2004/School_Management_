
import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  BookOpen,
} from "lucide-react";

export default function TeacherTimetable() {
  const today = new Date();

  const [selectedDate, setSelectedDate] =
    useState(today);

  const currentMonth =
    selectedDate.getMonth();

  const currentYear =
    selectedDate.getFullYear();

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const dates = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  );

  const schedule = useMemo(() => {
    const subjects = [
      "Mathematics",
      "Science",
      "Physics",
      "Chemistry",
      "English",
      "Computer",
      "Biology",
    ];

    const classes = [
      "8-A",
      "8-B",
      "9-A",
      "9-B",
      "10-A",
      "10-B",
      "11-A",
      "12-A",
    ];

    const times = [
      "08:00 AM",
      "09:00 AM",
      "10:00 AM",
      "11:30 AM",
      "01:00 PM",
      "02:30 PM",
    ];

    const data = {};

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      const fullDate = new Date(
        currentYear,
        currentMonth,
        day
      );

      const weekDay =
        fullDate.getDay();

      // Sunday Holiday
      if (weekDay === 0) {
        data[day] = [];
        continue;
      }

      const totalClasses =
        (day % 4) + 2;

      data[day] = Array.from(
        { length: totalClasses },
        (_, index) => ({
          subject:
            subjects[
              (day + index) %
                subjects.length
            ],
          class:
            classes[
              (day + index * 2) %
                classes.length
            ],
          time: times[index],
        })
      );
    }

    return data;
  }, [
    currentMonth,
    currentYear,
    daysInMonth,
  ]);

  const selectedSchedule =
    schedule[selectedDate.getDate()] ||
    [];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
            <CalendarDays className="text-green-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Timetable
            </h1>

            <p className="text-gray-500 text-sm">
              View your monthly teaching
              schedule
            </p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold text-gray-800">
            Select Date
          </h2>

          <input
            type="month"
            value={`${currentYear}-${String(
              currentMonth + 1
            ).padStart(2, "0")}`}
            onChange={(e) => {
              const [year, month] =
                e.target.value.split("-");

              setSelectedDate(
                new Date(
                  Number(year),
                  Number(month) - 1,
                  1
                )
              );
            }}
            className="border rounded-xl px-4 py-2"
          />
        </div>

        <div className="grid grid-cols-7 md:grid-cols-10 lg:grid-cols-12 gap-2">
          {dates.map((date) => {
            const dateObj = new Date(
              currentYear,
              currentMonth,
              date
            );

            return (
              <button
                key={date}
                onClick={() =>
                  setSelectedDate(dateObj)
                }
                className={`h-11 rounded-xl font-medium transition ${
                  selectedDate.getDate() ===
                  date
                    ? "bg-green-600 text-white"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {date}
              </button>
            );
          })}
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="p-5 border-b flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-gray-800">
              Schedule for{" "}
              {selectedDate.toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {selectedSchedule.length}{" "}
              Classes
            </p>
          </div>
        </div>

        {selectedSchedule.length ===
        0 ? (
          <div className="py-20 text-center">
            <BookOpen
              size={45}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              Holiday
            </h3>

            <p className="text-gray-500">
              No classes scheduled.
            </p>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {selectedSchedule.map(
              (item, index) => (
                <div
                  key={index}
                  className="border rounded-2xl p-5 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.subject}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Class {item.class}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <Clock size={16} />
                    {item.time}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}