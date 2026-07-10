

import {
  CalendarCheck,
  ClipboardList,
  IndianRupee,
  Award,
} from "lucide-react";

export default function StudentHome() {
  const stats = [
    {
      title: "Attendance",
      value: "95%",
      bg: "bg-green-100",
      text: "text-green-600",
      icon: <CalendarCheck size={20} />,
    },
    {
      title: "Assignments",
      value: "06",
      bg: "bg-blue-100",
      text: "text-blue-600",
      icon: <ClipboardList size={20} />,
    },
    {
      title: "Fees Due",
      value: "₹5,000",
      bg: "bg-red-100",
      text: "text-red-600",
      icon: <IndianRupee size={20} />,
    },
    {
      title: "Current Grade",
      value: "A+",
      bg: "bg-purple-100",
      text: "text-purple-600",
      icon: <Award size={20} />,
    },
  ];

  const classes = [
    {
      subject: "Mathematics",
      time: "09:00 AM",
    },
    {
      subject: "Science",
      time: "10:00 AM",
    },
    {
      subject: "English",
      time: "12:00 PM",
    },
    {
      subject: "Computer",
      time: "02:00 PM",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Student Dashboard
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Welcome back to Future Academy.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-3xl p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  {item.value}
                </h3>
              </div>

              <div
                className={`${item.bg} ${item.text} w-11 h-11 rounded-2xl flex items-center justify-center`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow">
          <h3 className="text-xl font-bold mb-5">
            Today's Classes
          </h3>

          <div className="space-y-5">
            {classes.map((item, index) => (
              <div
                key={index}
                className="border rounded-2xl p-5 flex justify-between items-center hover:bg-gray-50"
              >
                <div>
                  <h4 className="font-semibold text-base">
                    {item.subject}
                  </h4>
                </div>

                <div className="text-sm font-semibold text-green-600">
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow">
          <h3 className="text-xl font-bold mb-8">
            Notifications
          </h3>

          <div className="space-y-5">
            <div className="border-l-3 border-red-400 pl-4">
              <h4 className="font-medium text-sm">
                Fee Reminder
              </h4>

              <p className="text-gray-400 text-xs mt-1">
                Pay pending fees before 15 July.
              </p>
            </div>

            <div className="border-l-3 border-blue-500 pl-4">
              <h4 className="font-medium text-sm">
                Homework Submission
              </h4>

              <p className="text-gray-400 text-xs mt-1">
                Submit Mathematics homework tomorrow.
              </p>
            </div>

            <div className="border-l-3 border-green-600 pl-4">
              <h4 className="font-medium text-sm">
                Examination Notice
              </h4>

              <p className="text-gray-500 text-xs mt-1">
                Mid-term exams start next week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}