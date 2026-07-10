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
color: "bg-green-600",
icon: <CalendarCheck size={22} />,
},
{
title: "Assignments",
value: "06",
color: "bg-blue-600",
icon: <ClipboardList size={22} />,
},
{
title: "Fees Due",
value: "₹5,000",
color: "bg-red-500",
icon: <IndianRupee size={22} />,
},
{
title: "Current Grade",
value: "A+",
color: "bg-purple-600",
icon: <Award size={22} />,
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

return ( <div className="space-y-8"> <div> <h2 className="text-3xl font-bold text-gray-800">
Student Dashboard </h2>


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

            <h3 className="text-3xl font-bold mt-3">
              {item.value}
            </h3>
          </div>

          <div
            className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white`}
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
        Today's Classes
      </h3>

      <div className="space-y-4">
        {classes.map((item, index) => (
          <div
            key={index}
            className="border rounded-2xl p-5 flex justify-between items-center hover:bg-gray-50"
          >
            <div>
              <h4 className="font-bold text-lg">
                {item.subject}
              </h4>
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

        <div className="border-l-4 border-red-500 pl-4">
          <h4 className="font-semibold">
            Fee Reminder
          </h4>

          <p className="text-gray-500 text-sm">
            Pay pending fees before 15 July.
          </p>
        </div>

        <div className="border-l-4 border-blue-500 pl-4">
          <h4 className="font-semibold">
            Homework Submission
          </h4>

          <p className="text-gray-500 text-sm">
            Submit Mathematics homework tomorrow.
          </p>
        </div>

        <div className="border-l-4 border-green-600 pl-4">
          <h4 className="font-semibold">
            Examination Notice
          </h4>

          <p className="text-gray-500 text-sm">
            Mid-term exams start next week.
          </p>
        </div>

      </div>
    </div>

  </div>
</div>


);
}
