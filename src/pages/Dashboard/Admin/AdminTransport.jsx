import { Search, Plus, Bus, Route, Users } from "lucide-react";

export default function AdminTransport() {
  const stats = [
    {
      title: "Total Buses",
      value: "25",
      icon: <Bus size={26} />,
      color: "bg-red-500",
    },
    {
      title: "Active Routes",
      value: "18",
      icon: <Route size={26} />,
      color: "bg-green-600",
    },
    {
      title: "Students Using",
      value: "1250",
      icon: <Users size={26} />,
      color: "bg-red-600",
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
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Transport Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage School Transport System
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18}/>
          Add Bus
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {stats.map((item)=>(

          <div
            key={item.title}
            className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
          >

            <div>
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
            </div>

            <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white`}>
              {item.icon}
            </div>

          </div>

        ))}

      </div>

      <div className="bg-white rounded-2xl shadow p-5">

        <div className="relative w-96">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Bus..."
            className="w-full border rounded-xl py-3 pl-11 outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="p-6 border-b flex justify-between">

          <h2 className="text-xl font-semibold">
            Bus List
          </h2>

          <span>Total : {buses.length}</span>

        </div>

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">Bus No.</th>

              <th className="px-6 py-4 text-center">Driver</th>

              <th className="px-6 py-4 text-center">Route</th>

              <th className="px-6 py-4 text-center">Students</th>

              <th className="px-6 py-4 text-center">Status</th>

              <th className="px-6 py-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {buses.map((bus)=>(

              <tr
                key={bus.id}
                className="border-t hover:bg-green-50"
              >

                <td className="px-6 py-5 font-medium">
                  {bus.bus}
                </td>

                <td className="text-center">
                  {bus.driver}
                </td>

                <td className="text-center">
                  {bus.route}
                </td>

                <td className="text-center">
                  {bus.students}
                </td>

                <td className="text-center">

                  <span className={`px-4 py-1 rounded-full ${
                    bus.status==="Running"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}>

                    {bus.status}

                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Edit
                    </button>

                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}