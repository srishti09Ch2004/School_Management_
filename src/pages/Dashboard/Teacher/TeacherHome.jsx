import {
BookOpen,
GraduationCap,
CalendarCheck,
ClipboardList,
} from "lucide-react";

export default function TeacherHome() {
const stats = [
{
title: "Today's Classes",
value: "06",
icon: <BookOpen size={20} />,
color: "bg-blue-500",
},
{
title: "Total Students",
value: "320",
icon: <GraduationCap size={20} />,
color: "bg-green-600",
},
{
title: "Assignments",
value: "18",
icon: <ClipboardList size={20} />,
color: "bg-orange-500",
},
{
title: "Attendance",
value: "95%",
icon: <CalendarCheck size={20} />,
color: "bg-purple-600",
},
];

const schedule = [
{
subject: "Mathematics",
className: "10-A",
time: "09:00 AM",
},
{
subject: "Science",
className: "9-B",
time: "11:00 AM",
},
{
subject: "Physics",
className: "12-A",
time: "01:00 PM",
},
{
subject: "Chemistry",
className: "11-B",
time: "02:30 PM",
},
];

return ( <div className="space-y-8">


  <div>
    <h2 className="text-2xl font-bold text-gray-800">
      Teacher Dashboard
    </h2>

    <p className="text-gray-500 mt-2">
      Welcome back to Future Academy.
    </p>
  </div>

  <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
    {stats.map((item) => (
      <div
        key={item.title}
        className="bg-white rounded-3xl p-6 shadow hover:shadow-lg transition"
      >
        <div className="flex justify-between items-center">

          <div>
            <p className="text-gray-500">
              {item.title}
            </p>

            <h3 className="text-2xl font-bold mt-3">
              {item.value}
            </h3>
          </div>

          <div
            className={`${item.color} w-11 h-11 rounded-2xl flex items-center justify-center text-white`}
          >
            {item.icon}
          </div>

        </div>
      </div>
    ))}
  </div>

  <div className="grid lg:grid-cols-3 gap-6">

    <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow">
      <h3 className="text-2xl font-bold mb-6">
        Today's Schedule
      </h3>

      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="border rounded-2xl p-5 flex justify-between items-center hover:bg-gray-50"
          >
            <div>
              <h4 className="font-bold text-lg">
                {item.subject}
              </h4>

              <p className="text-gray-500">
                Class {item.className}
              </p>
            </div>

            <div className="font-semibold text-green-600">
              {item.time}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow">

      <h3 className="text-2xl font-bold mb-6">
        Notifications
      </h3>

      <div className="space-y-5">

        <div className="border-l-4 border-green-600 pl-4">
          <h4 className="font-semibold">
            Staff Meeting
          </h4>

          <p className="text-gray-500 text-sm">
            Meeting at 03:00 PM today.
          </p>
        </div>

        <div className="border-l-4 border-blue-600 pl-4">
          <h4 className="font-semibold">
            Examination Notice
          </h4>

          <p className="text-gray-500 text-sm">
            Mid-term exams start next week.
          </p>
        </div>

        <div className="border-l-4 border-orange-500 pl-4">
          <h4 className="font-semibold">
            Assignment Submission
          </h4>

          <p className="text-gray-500 text-sm">
            Class 10-A assignment due tomorrow.
          </p>
        </div>

      </div>
    </div>

  </div>
</div>


);
}
