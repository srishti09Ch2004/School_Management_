import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function StudentDashboard() {
const [activeMenu, setActiveMenu] = useState("Dashboard");

const timetable = [
{
subject: "Mathematics",
time: "09:00 AM",
},
{
subject: "Science",
time: "11:00 AM",
},
{
subject: "English",
time: "01:00 PM",
},
];

return ( <div className="flex min-h-screen bg-slate-100"> <Sidebar
     role="student"
     activeMenu={activeMenu}
     setActiveMenu={setActiveMenu}
   />


  <div className="flex-1 flex flex-col">
    <Topbar role="Student" title={activeMenu} />

    <main className="p-8 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">
        Student Dashboard
      </h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <Card title="Attendance" value="92%" />
        <Card title="Assignments" value="12" />
        <Card title="Fees Due" value="₹8,000" />
        <Card title="Result" value="A+" />

      </div>

      <div className="bg-white rounded-3xl p-8 shadow">
        <h3 className="text-2xl font-bold mb-6">
          Today's Timetable
        </h3>

        <div className="space-y-4">

          {timetable.map((item, index) => (
            <div
              key={index}
              className="border rounded-2xl p-5 flex justify-between"
            >
              <h4 className="font-semibold">
                {item.subject}
              </h4>

              <p>{item.time}</p>
            </div>
          ))}

        </div>
      </div>
    </main>
  </div>
</div>


);
}

function Card({ title, value }) {
return ( <div className="bg-white p-6 rounded-3xl shadow hover:shadow-lg transition"> <p className="text-gray-500">
{title} </p>


  <h3 className="text-3xl font-bold mt-3">
    {value}
  </h3>
</div>

);
}
