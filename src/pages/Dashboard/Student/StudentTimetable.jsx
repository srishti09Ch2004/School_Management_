
import { useState } from "react";
import {
CalendarDays,
Clock,
} from "lucide-react";

export default function StudentTimetable() {
const [selectedDate, setSelectedDate] =
useState(
new Date()
.toISOString()
.split("T")[0]
);

const timetable = {
Monday: [
"Mathematics",
"Science",
"English",
"Computer",
"Hindi",
"Sports",
],


Tuesday: [
  "Physics",
  "Mathematics",
  "Computer",
  "English",
  "Chemistry",
  "Library",
],

Wednesday: [
  "Science",
  "Computer",
  "Mathematics",
  "English",
  "Physics",
  "Sports",
],

Thursday: [
  "English",
  "Mathematics",
  "Science",
  "Computer",
  "Hindi",
  "Activity",
],

Friday: [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Computer",
  "English",
  "Games",
],

Saturday: [
  "Revision",
  "Computer Lab",
  "Sports",
  "Activity",
  "Library",
  "Test",
],


};

const day =
new Date(
selectedDate
).toLocaleDateString(
"en-US",
{
weekday: "long",
}
);

const todaySchedule =
timetable[day] || [];

const periods = [
"09:00 - 09:45",
"09:45 - 10:30",
"10:30 - 11:15",
"12:15 - 01:00",
"01:00 - 01:45",
"02:00 - 03:00",
];

return ( <div className="space-y-8">


  <div className="flex flex-col lg:flex-row lg:justify-between gap-5">

    <div>
      <h2 className="text-2xl font-bold text-gray-800">
        Class Timetable
      </h2>

      <p className="text-gray-500 mt-2">
        Select any date to view
        that day's timetable.
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-3">
      <CalendarDays
        className="text-green-600"
      />

      <input
        type="date"
        value={selectedDate}
        onChange={(e) =>
          setSelectedDate(
            e.target.value
          )
        }
        className="outline-none"
      />
    </div>

  </div>

  <div className="bg-white rounded-3xl shadow p-8">

    <div className="flex items-center gap-3 mb-7">
      <Clock
        className="text-green-600"
      />

      <h3 className="text-2xl font-bold">
        {day}'s Schedule
      </h3>
    </div>

    {day === "Sunday" ? (
      <div className="text-center py-16">
        <h3 className="text-3xl font-bold text-red-500">
          Holiday
        </h3>

        <p className="text-gray-500 mt-3">
          No classes scheduled on
          Sunday.
        </p>
      </div>
    ) : (
      <div className="overflow-x-auto">

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-5 px-10">
                Period
              </th>

              <th className="text-left py-5 px-10">
                Time
              </th>

              <th className="text-left py-5 px-10">
                Subject
              </th>
            </tr>
          </thead>

          <tbody>

            {periods.map(
              (time, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-5 px-10 font-semibold">
                    Period{" "}
                    {index + 1}
                  </td>

                  <td className="py-5 px-10">
                    {time}
                  </td>

                  <td className="py-5 px-10">
                    {
                      todaySchedule[
                        index
                      ]
                    }
                  </td>
                </tr>
              )
            )}

            <tr className="bg-yellow-50">
              <td className="py-5 px-10 font-bold">
                Break
              </td>

              <td className="py-5 px-10 font-bold">
                11:45 - 12:15
              </td>

              <td className="py-5 px-10 font-bold text-yellow-700">
                Lunch Break
              </td>
            </tr>

          </tbody>
        </table>

      </div>
    )}

  </div>

</div>


);
}
