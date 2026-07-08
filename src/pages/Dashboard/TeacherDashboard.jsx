import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function TeacherDashboard() {
const [activeMenu, setActiveMenu] = useState("Dashboard");

const classes = [
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
];

return ( <div className="flex min-h-screen bg-slate-100"> <Sidebar
     role="teacher"
     activeMenu={activeMenu}
     setActiveMenu={setActiveMenu}
   />


  <div className="flex-1 flex flex-col">
    <Topbar role="Teacher" title={activeMenu} />

    <main className="p-8 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">
        Teacher Dashboard
      </h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <Card title="Today's Classes" value="6" />
        <Card title="Students" value="320" />
        <Card title="Attendance" value="92%" />
        <Card title="Assignments" value="18" />

      </div>

      <div className="bg-white rounded-3xl p-8 shadow">
        <h3 className="text-2xl font-bold mb-6">
          Today's Schedule
        </h3>

        <div className="space-y-4">

          {classes.map((item, index) => (
            <div
              key={index}
              className="border rounded-2xl p-5 flex justify-between"
            >
              <div>
                <h4 className="font-bold">
                  {item.subject}
                </h4>

                <p className="text-gray-500">
                  Class {item.className}
                </p>
              </div>

              <p className="font-semibold">
                {item.time}
              </p>
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
