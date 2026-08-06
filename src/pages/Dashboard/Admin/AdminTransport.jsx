import { useEffect, useMemo, useState } from "react";

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

  const [buses, setBuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBus, setEditingBus] = useState(null);

  const [busForm, setBusForm] = useState({
    bus_number: "",
    bus_type: "School Bus",
    driver_name: "",
    driver_phone: "",
    route_name: "",
    capacity: "",
    status: "Running",
  });

  const fetchBuses = async () => {
  try {
    const response = await fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/transportbuses.php"
    );

    const data = await response.json();

    if (data.status) {
      setBuses(data.data);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error fetching buses:", error);
  }
};
useEffect(() => {
  fetchBuses();
}, []);

const filteredBuses = useMemo(() => {
  return buses.filter((bus) =>
    String(bus.bus_number || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
}, [buses, searchQuery]);


const totalBuses = buses.length;

const activeRoutes = new Set(
  buses
    .filter((bus) => bus.status === "Running")
    .map((bus) => bus.route_name)
).size;

const studentsUsing = buses.reduce(
  (total, bus) => total + Number(bus.students_count || 0),
  0
);

const stats = [
  {
    title: "Total Buses",
    value: totalBuses,
    icon: Bus,
    bg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Active Routes",
    value: activeRoutes,
    icon: Route,
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Students Using",
    value: studentsUsing,
    icon: Users,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];


const handleAddBus = async () => {

  if (
    !busForm.bus_number ||
    !busForm.driver_name ||
    !busForm.route_name ||
    !busForm.capacity
  ) {
    alert("Please fill all required fields.");
    return;
  }

  try {

    const response = await fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/addbus.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(busForm),
      }
    );

    const data = await response.json();

    if (data.status) {

      alert(data.message);

      setShowAddModal(false);

      setBusForm({
        bus_number: "",
        bus_type: "School Bus",
        driver_name: "",
        driver_phone: "",
        route_name: "",
        capacity: "",
        status: "Running",
      });

      fetchBuses();

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error("Add Bus Error:", error);

    alert("Something went wrong while adding the bus.");

  }
};

const handleUpdateBus = async () => {

  if (
    !editingBus.bus_number ||
    !editingBus.driver_name ||
    !editingBus.route_name ||
    !editingBus.capacity
  ) {
    alert("Please fill all required fields.");
    return;
  }

  try {

    const response = await fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/updatebus.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingBus),
      }
    );

    const data = await response.json();

    if (data.status) {

      alert(data.message);

      setShowEditModal(false);
      setEditingBus(null);

      fetchBuses();

    } else {
      alert(data.message);
    }

  } catch (error) {

    console.error("Update Bus Error:", error);

    alert("Something went wrong while updating the bus.");

  }
};

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

        <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition"
          >
            <Plus size={16} />
            Add Bus
          </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-xl font-bold text-gray-800 mt-2">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`${item.bg} w-11 h-11 rounded-2xl flex items-center justify-center`}
                >
                  <Icon
                    size={20}
                    className={item.iconColor}
                  />
                </div>
              </div>
            </div>
          );
        })}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            Total : {filteredBuses.length}
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
              {filteredBuses.map((bus) => (
                <tr
                  key={bus.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-medium text-gray-800">
                    {bus.bus_number}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {bus.driver_name}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                      {bus.route_name || "Not Assigned"}
                    </td>

                    <td className="px-6 py-5 text-center text-gray-600">
                      {bus.students_count || 0}
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
                      <button onClick={() => {
                        setEditingBus({
                          ...bus,
                          bus_number: bus.bus_number || "",
                          bus_type: bus.bus_type || "School Bus",
                          driver_name: bus.driver_name || "",
                          driver_phone: bus.driver_phone || "",
                          route_name: bus.route_name || "",
                          capacity: bus.capacity || "",
                          status: bus.status || "Running",
                        });

                    setShowEditModal(true);
                  }}
                  className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                  title="Edit Bus"
                >
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

{showAddModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center px-7 py-5 border-b">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Add New Bus
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Add a school bus to the transport system.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(false)}
          className="w-9 h-9 rounded-full hover:bg-gray-100 text-gray-500 text-xl"
        >
          ×
        </button>

      </div>

      {/* Form */}
      <div className="p-7">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Bus Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bus Number *
            </label>

            <input
              type="text"
              value={busForm.bus_number}
              onChange={(e) =>
                setBusForm({
                  ...busForm,
                  bus_number: e.target.value,
                })
              }
              placeholder="e.g. UP32 AB 1234"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Bus Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bus Type
            </label>

            <select
              value={busForm.bus_type}
              onChange={(e) =>
                setBusForm({
                  ...busForm,
                  bus_type: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="School Bus">School Bus</option>
              <option value="Mini Bus">Mini Bus</option>
              <option value="Van">Van</option>
            </select>
          </div>

          {/* Driver Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver Name *
            </label>

            <input
              type="text"
              value={busForm.driver_name}
              onChange={(e) =>
                setBusForm({
                  ...busForm,
                  driver_name: e.target.value,
                })
              }
              placeholder="Enter driver name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Driver Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver Phone
            </label>

            <input
              type="tel"
              value={busForm.driver_phone}
              onChange={(e) =>
                setBusForm({
                  ...busForm,
                  driver_phone: e.target.value,
                })
              }
              placeholder="Enter phone number"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Route */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Route Name *
            </label>

            <input
              type="text"
              value={busForm.route_name}
              onChange={(e) =>
                setBusForm({
                  ...busForm,
                  route_name: e.target.value,
                })
              }
              placeholder="e.g. Route A"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bus Capacity *
            </label>

            <input
              type="number"
              min="1"
              value={busForm.capacity}
              onChange={(e) =>
                setBusForm({
                  ...busForm,
                  capacity: e.target.value,
                })
              }
              placeholder="e.g. 50"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>

            <select
              value={busForm.status}
              onChange={(e) =>
                setBusForm({
                  ...busForm,
                  status: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Running">Running</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 px-7 py-5 border-t bg-gray-50">

        <button
          onClick={() => setShowAddModal(false)}
          className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition"
        >
          Cancel
        </button>

        <button
          onClick={handleAddBus}
          className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          Add Bus
        </button>

      </div>

    </div>

  </div>
)}

        </div>
      </div>

{/* Edit Bus Modal */}

{showEditModal && editingBus && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

    <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">

      {/* Header */}
      <div className="flex justify-between items-center px-7 py-5 border-b">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Bus
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Update bus and driver information.
          </p>
        </div>

        <button
          onClick={() => {
            setShowEditModal(false);
            setEditingBus(null);
          }}
          className="w-9 h-9 rounded-full hover:bg-gray-100 text-gray-500 text-xl"
        >
          ×
        </button>

      </div>

      {/* Form */}
      <div className="p-7">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Bus Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bus Number *
            </label>

            <input
              type="text"
              value={editingBus.bus_number || ""}
              onChange={(e) =>
                setEditingBus({
                  ...editingBus,
                  bus_number: e.target.value,
                })
              }
              placeholder="Example: UP32 AB 1234"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Bus Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bus Type
            </label>

            <select
              value={editingBus.bus_type || "School Bus"}
              onChange={(e) =>
                setEditingBus({
                  ...editingBus,
                  bus_type: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="School Bus">School Bus</option>
              <option value="Mini Bus">Mini Bus</option>
              <option value="Van">Van</option>
            </select>
          </div>

          {/* Driver */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver Name *
            </label>

            <input
              type="text"
              value={editingBus.driver_name || ""}
              onChange={(e) =>
                setEditingBus({
                  ...editingBus,
                  driver_name: e.target.value,
                })
              }
              placeholder="Enter driver name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Driver Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver Phone
            </label>

            <input
              type="tel"
              value={editingBus.driver_phone || ""}
              onChange={(e) =>
                setEditingBus({
                  ...editingBus,
                  driver_phone: e.target.value,
                })
              }
              placeholder="Enter phone number"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Route */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Route Name *
            </label>

            <input
              type="text"
              value={editingBus.route_name || ""}
              onChange={(e) =>
                setEditingBus({
                  ...editingBus,
                  route_name: e.target.value,
                })
              }
              placeholder="Example: Route A"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacity *
            </label>

            <input
              type="number"
              min="1"
              value={editingBus.capacity || ""}
              onChange={(e) =>
                setEditingBus({
                  ...editingBus,
                  capacity: e.target.value,
                })
              }
              placeholder="Enter bus capacity"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>

            <select
              value={editingBus.status || "Running"}
              onChange={(e) =>
                setEditingBus({
                  ...editingBus,
                  status: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Running">Running</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 px-7 py-5 border-t bg-gray-50">

        <button
          onClick={() => {
            setShowEditModal(false);
            setEditingBus(null);
          }}
          className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdateBus}
          className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          Update Bus
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}