// import { Search, Plus, Bus, Route, Users } from "lucide-react";

// export default function AdminTransport() {
//   const stats = [
//     {
//       title: "Total Buses",
//       value: "25",
//       icon: <Bus size={26} />,
//       color: "bg-red-500",
//     },
//     {
//       title: "Active Routes",
//       value: "18",
//       icon: <Route size={26} />,
//       color: "bg-green-600",
//     },
//     {
//       title: "Students Using",
//       value: "1250",
//       icon: <Users size={26} />,
//       color: "bg-red-600",
//     },
//   ];

//   const buses = [
//     {
//       id: 1,
//       bus: "UP32 AB 1234",
//       driver: "Ramesh Kumar",
//       route: "Route A",
//       students: 55,
//       status: "Running",
//     },
//     {
//       id: 2,
//       bus: "UP32 XY 5678",
//       driver: "Suresh Yadav",
//       route: "Route B",
//       students: 48,
//       status: "Running",
//     },
//     {
//       id: 3,
//       bus: "UP32 CD 9012",
//       driver: "Amit Singh",
//       route: "Route C",
//       students: 40,
//       status: "Maintenance",
//     },
//   ];

//   return (
//     <div className="space-y-8">

//       <div className="flex justify-between items-center">

//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             Transport Management
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Manage School Transport System
//           </p>
//         </div>

//         <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
//           <Plus size={18}/>
//           Add Bus
//         </button>

//       </div>

//       <div className="grid md:grid-cols-3 gap-6">

//         {stats.map((item)=>(

//           <div
//             key={item.title}
//             className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
//           >

//             <div>
//               <p className="text-gray-500">{item.title}</p>
//               <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
//             </div>

//             <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white`}>
//               {item.icon}
//             </div>

//           </div>

//         ))}

//       </div>

//       <div className="bg-white rounded-2xl shadow p-5">

//         <div className="relative w-96">

//           <Search
//             size={18}
//             className="absolute left-4 top-4 text-gray-400"
//           />

//           <input
//             type="text"
//             placeholder="Search Bus..."
//             className="w-full border rounded-xl py-3 pl-11 outline-none focus:ring-2 focus:ring-green-500"
//           />

//         </div>

//       </div>

//       <div className="bg-white rounded-2xl shadow overflow-hidden">

//         <div className="p-6 border-b flex justify-between">

//           <h2 className="text-xl font-semibold">
//             Bus List
//           </h2>

//           <span>Total : {buses.length}</span>

//         </div>

//         <table className="min-w-full">

//           <thead className="bg-gray-100">

//             <tr>

//               <th className="px-6 py-4 text-left">Bus No.</th>

//               <th className="px-6 py-4 text-center">Driver</th>

//               <th className="px-6 py-4 text-center">Route</th>

//               <th className="px-6 py-4 text-center">Students</th>

//               <th className="px-6 py-4 text-center">Status</th>

//               <th className="px-6 py-4 text-center">Action</th>

//             </tr>

//           </thead>

//           <tbody>

//             {buses.map((bus)=>(

//               <tr
//                 key={bus.id}
//                 className="border-t hover:bg-green-50"
//               >

//                 <td className="px-6 py-5 font-medium">
//                   {bus.bus}
//                 </td>

//                 <td className="text-center">
//                   {bus.driver}
//                 </td>

//                 <td className="text-center">
//                   {bus.route}
//                 </td>

//                 <td className="text-center">
//                   {bus.students}
//                 </td>

//                 <td className="text-center">

//                   <span className={`px-4 py-1 rounded-full ${
//                     bus.status==="Running"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                   }`}>

//                     {bus.status}

//                   </span>

//                 </td>

//                 <td>

//                   <div className="flex justify-center gap-3">

//                     <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//                       Edit
//                     </button>

//                     <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
//                       Delete
//                     </button>

//                   </div>

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }












import {
  Search,
  Plus,
  Bus,
  Route,
  Users,
  Pencil,
  Trash2,
} from "lucide-react";

export default function AdminTransport() {
  const stats = [
    {
      title: "Total Buses",
      value: "25",
      icon: <Bus size={22} />,
      color: "bg-red-500",
    },
    {
      title: "Active Routes",
      value: "18",
      icon: <Route size={22} />,
      color: "bg-green-600",
    },
    {
      title: "Students Using",
      value: "1250",
      icon: <Users size={22} />,
      color: "bg-blue-600",
    },
  ];

  const buses = [
    {
      id: 1,
      bus: "UP32 AB 1234",
      driver: "Ramesh Kumar",
      route: "Route A",
      students: 55,
      status: "Running",
    },
    {
      id: 2,
      bus: "UP32 XY 5678",
      driver: "Suresh Yadav",
      route: "Route B",
      students: 48,
      status: "Running",
    },
    {
      id: 3,
      bus: "UP32 CD 9012",
      driver: "Amit Singh",
      route: "Route C",
      students: 40,
      status: "Maintenance",
    },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Transport Management
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Manage school buses and routes.
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition">
          <Plus size={16} />
          Add Bus
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                  {item.value}
                </h2>
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

      {/* Search */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search bus number..."
            className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Bus List
          </h2>

          <span className="text-sm text-gray-500">
            Total : {buses.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-600">
                <th className="px-6 py-4 text-left">
                  Bus Number
                </th>

                <th className="px-6 py-4 text-center">
                  Driver
                </th>

                <th className="px-6 py-4 text-center">
                  Route
                </th>

                <th className="px-6 py-4 text-center">
                  Students
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
              {buses.map((bus) => (
                <tr
                  key={bus.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-medium text-gray-800">
                    {bus.bus}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {bus.driver}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {bus.route}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {bus.students}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        bus.status === "Running"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {bus.status}
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