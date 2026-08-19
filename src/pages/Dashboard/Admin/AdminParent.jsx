// import {
//   Search,
//   Plus,
//   Users,
//   UserCheck,
//   HeartHandshake,
//   Pencil,
//   Trash2,
// } from "lucide-react";

// export default function AdminParent() {
//   const stats = [
//   {
//     title: "Total Parents",
//     value: "1,850",
//     icon: Users,
//     bg: "bg-blue-100",
//     iconColor: "text-blue-600",
//   },
//   {
//     title: "Active Parents",
//     value: "1,760",
//     icon: UserCheck,
//     bg: "bg-green-100",
//     iconColor: "text-green-600",
//   },
//   {
//     title: "Linked Students",
//     value: "2,540",
//     icon: HeartHandshake,
//     bg: "bg-purple-100",
//     iconColor: "text-purple-600",
//   },
// ];

//   const parents = [
//     {
//       id: 1,
//       name: "Rajesh Sharma",
//       relation: "Father",
//       student: "Rahul Sharma",
//       phone: "9876543210",
//       status: "Active",
//     },
//     {
//       id: 2,
//       name: "Sunita Singh",
//       relation: "Mother",
//       student: "Priya Singh",
//       phone: "9876501234",
//       status: "Active",
//     },
//     {
//       id: 3,
//       name: "Vijay Verma",
//       relation: "Father",
//       student: "Ankit Verma",
//       phone: "9123456789",
//       status: "Pending",
//     },
//     {
//       id: 4,
//       name: "Pooja Gupta",
//       relation: "Mother",
//       student: "Neha Gupta",
//       phone: "9988776655",
//       status: "Inactive",
//     },
//   ];

//   return (
//     <div className="space-y-7">
//       {/* Header */}
//       <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Parent Management
//           </h1>

//           <p className="text-gray-500 mt-1 text-sm">
//             Manage parents and guardians information.
//           </p>
//         </div>

//         <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition">
//           <Plus size={16} />
//           Add Parent
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="grid md:grid-cols-3 gap-5">
//         {stats.map((item) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={item.title}
//               className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-xs text-gray-500">
//                     {item.title}
//                   </p>

//                   <h2 className="text-xl font-bold text-gray-800 mt-2">
//                     {item.value}
//                   </h2>
//                 </div>

//                 <div
//                   className={`${item.bg} w-11 h-11 rounded-2xl flex items-center justify-center`}
//                 >
//                   <Icon
//                     size={20}
//                     className={item.iconColor}
//                   />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Search */}
//       <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
//         <div className="relative max-w-md">
//           <Search
//             size={18}
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type="text"
//             placeholder="Search parent..."
//             className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="flex justify-between items-center p-5 border-b">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Parent List
//           </h2>

//           <span className="text-sm text-gray-500">
//             Total : {parents.length}
//           </span>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-50">
//               <tr className="text-sm text-gray-600">
//                 <th className="px-6 py-4 text-left">
//                   Parent Name
//                 </th>

//                 <th className="px-6 py-4 text-center">
//                   Relation
//                 </th>

//                 <th className="px-6 py-4 text-center">
//                   Student
//                 </th>

//                 <th className="px-6 py-4 text-center">
//                   Phone
//                 </th>

//                 <th className="px-6 py-4 text-center">
//                   Status
//                 </th>

//                 <th className="px-6 py-4 text-center">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {parents.map((parent) => (
//                 <tr
//                   key={parent.id}
//                   className="border-t hover:bg-gray-50 transition"
//                 >
//                   <td className="px-6 py-5 font-medium text-gray-800">
//                     {parent.name}
//                   </td>

//                   <td className="px-6 py-5 text-center text-gray-600">
//                     {parent.relation}
//                   </td>

//                   <td className="px-6 py-5 text-center text-gray-600">
//                     {parent.student}
//                   </td>

//                   <td className="px-6 py-5 text-center text-gray-600">
//                     {parent.phone}
//                   </td>

//                   <td className="px-6 py-5 text-center">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         parent.status === "Active"
//                           ? "bg-green-100 text-green-700"
//                           : parent.status === "Pending"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {parent.status}
//                     </span>
//                   </td>

//                   <td className="px-6 py-5">
//                     <div className="flex justify-center gap-2">
//                       <button className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition">
//                         <Pencil size={16} />
//                       </button>

//                       <button className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition">
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  HeartHandshake,
  Pencil,
  Trash2,
  Eye,
  X,
} from "lucide-react";

export default function AdminParent() {
  const [parents, setParents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewParent, setViewParent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editParent, setEditParent] = useState(null);

  /* API URL */
  const API_URL =
    "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/parents.php";

  /* Fetch Parents */
  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch parents");
      }

      const data = await response.json();

      if (data.status) {
        setParents(data.parents || []);
      } else {
        setError(data.message || "Unable to fetch parents");
      }
    } catch (err) {
      console.error("Parent API Error:", err);
      setError("Unable to connect with server");
    } finally {
      setLoading(false);
    }
  };


  const handleUpdateParent = async () => {
  if (!editParent) {
    return;
  }

  if (
    !editParent.name ||
    !editParent.email
  ) {
    alert("Parent name and email are required");
    return;
  }

  try {

    const response = await fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/updateParent.php",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id: editParent.id,

          user_id: editParent.user_id,

          name: editParent.name,

          email: editParent.email,

          father_name:
            editParent.father_name || "",

          mother_name:
            editParent.mother_name || "",

          phone:
            editParent.phone || "",

          occupation:
            editParent.occupation || "",

          address:
            editParent.address || "",
        }),
      }
    );


    const data =
      await response.json();


    console.log(
      "Update Parent Response:",
      data
    );


    alert(data.message);


    if (data.status) {

      /*
       * Close modal
       */

      setShowEditModal(false);

      setEditParent(null);


      /*
       * Refresh parent list
       */

      fetchParents();

    }

  } catch (error) {

    console.error(
      "Update Parent Error:",
      error
    );

    alert(
      "Unable to update parent"
    );

  }
};

  /* Search */
  const filteredParents = parents.filter((parent) => {
    const searchText = search.toLowerCase();

    return (
      (parent.name || "").toLowerCase().includes(searchText) ||
      (parent.email || "").toLowerCase().includes(searchText) ||
      (parent.relation || "").toLowerCase().includes(searchText) ||
      (parent.student || "").toLowerCase().includes(searchText) ||
      (parent.phone || "").toLowerCase().includes(searchText)
    );
  });

  /* Stats */
  const totalParents = parents.length;

  const activeParents = parents.filter(
    (parent) => parent.status === "Active"
  ).length;

  const linkedStudents = parents.filter(
    (parent) =>
      parent.student_id !== null &&
      parent.student_id !== undefined &&
      parent.student_id !== ""
  ).length;

  const stats = [
    {
      title: "Total Parents",
      value: totalParents,
      icon: Users,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Parents",
      value: activeParents,
      icon: UserCheck,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Linked Students",
      value: linkedStudents,
      icon: HeartHandshake,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Parent Management
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Manage parents and guardians information.
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition">
          <Plus size={16} />
          Add Parent
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search parent..."
            className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Parent List
          </h2>

          <span className="text-sm text-gray-500">
            Total : {filteredParents.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-600">
                <th className="px-6 py-4 text-left">
                  Parent Name
                </th>

                <th className="px-6 py-4 text-center">
                  Relation
                </th>

                <th className="px-6 py-4 text-center">
                  Student
                </th>

                <th className="px-6 py-4 text-center">
                  Phone
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
              {/* Loading */}
              {loading && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Loading parents...
                  </td>
                </tr>
              )}

              {/* Error */}
              {!loading && error && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              )}

              {/* Empty */}
              {!loading &&
                !error &&
                filteredParents.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No parents found.
                    </td>
                  </tr>
                )}

              {/* Parents */}
              {!loading &&
                !error &&
                filteredParents.map((parent) => (
                  <tr
                    key={parent.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-5 font-medium text-gray-800">
                      {parent.name}
                    </td>

                    <td className="px-6 py-5 text-center text-gray-600">
                      {parent.relation}
                    </td>

                    <td className="px-6 py-5 text-center text-gray-600">
                      {parent.student || "Not Linked"}
                    </td>

                    <td className="px-6 py-5 text-center text-gray-600">
                      {parent.phone || "-"}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          parent.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : parent.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {parent.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-2">

                          {/* View */}
                          <button
                            onClick={() => setViewParent(parent)}
                            className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition"
                            title="View Parent Details"
                          >
                            <Eye size={16} />
                          </button>


                          {/* Edit - abhi sirf UI */}
                          <button
                            onClick={() => {
                              setEditParent(parent);
                              setShowEditModal(true);
                            }}
                            className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                            title="Edit Parent"
                          >
                            <Pencil size={16} />
                          </button>


                          {/* Delete - abhi sirf UI */}
                          <button
                            className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"
                            title="Delete Parent"
                          >
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

{/* ================= VIEW PARENT MODAL ================= */}

{viewParent && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

    <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-100">

      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-green-50 to-transparent flex justify-between items-center border-b border-gray-100">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Parent & Student Details
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Complete family and linked student information
          </p>
        </div>

        <button
          onClick={() => setViewParent(null)}
          className="p-2 rounded-xl hover:bg-gray-200 text-gray-500 transition"
        >
          <X size={20} />
        </button>

      </div>


      {/* Content */}
      <div className="p-6 space-y-6">


        {/* ================= PARENT INFORMATION ================= */}

        <div>

          <h3 className="text-sm font-bold text-gray-800 mb-3">
            Parent Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl">

            <div>
              <span className="text-xs text-gray-400 block">
                Parent Name
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.name || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Email
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.email || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Relation
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.relation || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Phone
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.phone || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Father Name
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.father_name || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Mother Name
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.mother_name || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Occupation
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.occupation || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Parent Status
              </span>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  viewParent.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {viewParent.status || "N/A"}
              </span>
            </div>


            <div className="md:col-span-2">

              <span className="text-xs text-gray-400 block">
                Address
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.address || "N/A"}
              </span>

            </div>

          </div>

        </div>



        {/* ================= STUDENT INFORMATION ================= */}

        <div>

          <h3 className="text-sm font-bold text-gray-800 mb-3">
            Linked Student Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl">

            <div>
              <span className="text-xs text-gray-400 block">
                Student Name
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.student || "Not Linked"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Student Email
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.student_email || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Admission No
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.student_admission || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Class
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.student_class || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Section
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.student_section || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Roll No
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.student_roll_no || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Gender
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.student_gender || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Date of Birth
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.student_dob || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Student Phone
              </span>

              <span className="font-semibold text-gray-700">
                {viewParent.student_phone || "N/A"}
              </span>
            </div>


            <div>
              <span className="text-xs text-gray-400 block">
                Student Status
              </span>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  viewParent.student_status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {viewParent.student_status || "N/A"}
              </span>
            </div>

          </div>

        </div>



        {/* ================= STUDENT ADDRESS ================= */}

        <div>

          <h3 className="text-sm font-bold text-gray-800 mb-3">
            Student Address
          </h3>

          <div className="bg-gray-50 p-5 rounded-2xl">

            <span className="text-xs text-gray-400 block">
              Address
            </span>

            <span className="font-semibold text-gray-700">
              {viewParent.student_address || "N/A"}
            </span>

          </div>

        </div>

      </div>


      {/* Footer */}
      <div className="p-5 bg-gray-50/50 border-t border-gray-100 flex justify-end">

        <button
          onClick={() => setViewParent(null)}
          className="px-5 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}

{showEditModal && editParent && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

    <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">

      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Edit Parent
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Update parent and guardian information
          </p>
        </div>

        <button
          onClick={() => {
            setShowEditModal(false);
            setEditParent(null);
          }}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-500"
        >
          <X size={18} />
        </button>

      </div>


      {/* Form */}
      <div className="p-6">

        <div className="grid md:grid-cols-2 gap-4">

          {/* Parent Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Parent Name
            </label>

            <input
              type="text"
              value={editParent.name || ""}
              onChange={(e) =>
                setEditParent({
                  ...editParent,
                  name: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>


          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>

            <input
              type="email"
              value={editParent.email || ""}
              onChange={(e) =>
                setEditParent({
                  ...editParent,
                  email: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>


          {/* Father Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Father Name
            </label>

            <input
              type="text"
              value={editParent.father_name || ""}
              onChange={(e) =>
                setEditParent({
                  ...editParent,
                  father_name: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>


          {/* Mother Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Mother Name
            </label>

            <input
              type="text"
              value={editParent.mother_name || ""}
              onChange={(e) =>
                setEditParent({
                  ...editParent,
                  mother_name: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>


          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Phone
            </label>

            <input
              type="text"
              value={editParent.phone || ""}
              onChange={(e) =>
                setEditParent({
                  ...editParent,
                  phone: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>


          {/* Occupation */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Occupation
            </label>

            <input
              type="text"
              value={editParent.occupation || ""}
              onChange={(e) =>
                setEditParent({
                  ...editParent,
                  occupation: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>


          {/* Relation */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Relation
            </label>

            <select
              value={editParent.relation || "Guardian"}
              onChange={(e) =>
                setEditParent({
                  ...editParent,
                  relation: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Father & Mother">
                Father & Mother
              </option>
              <option value="Guardian">Guardian</option>
            </select>
          </div>


          {/* Student */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Linked Student
            </label>

            <input
              type="text"
              value={editParent.student || "Not Linked"}
              disabled
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 bg-gray-100 text-gray-500"
            />
          </div>


          {/* Address */}
          <div className="md:col-span-2">

            <label className="text-sm font-medium text-gray-600">
              Address
            </label>

            <textarea
              value={editParent.address || ""}
              onChange={(e) =>
                setEditParent({
                  ...editParent,
                  address: e.target.value,
                })
              }
              rows="3"
              className="w-full border border-gray-200 rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

        </div>


        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => {
              setShowEditModal(false);
              setEditParent(null);
            }}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdateParent}
            className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium"
          >
            Update Parent
          </button>

        </div>

      </div>

    </div>

  </div>
)}

    </div>
  );
}