export default function AdminTeacher() {
  return (
    <div className="space-y-9">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Teacher Management
        </h1>
        <p className="text-gray-500 mt-1">
          Manage all teachers of Future Academy
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-gray-500">Total Teachers</h3>
          <p className="text-2xl font-bold mt-2">185</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-gray-500">Active Teachers</h3>
          <p className="text-2xl font-bold mt-2">176</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-gray-500">Departments</h3>
          <p className="text-2xl font-bold mt-2">18</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Teacher List
        </h2>

        <table className="w-full border-collapse">
            <thead>
            <tr className="border-b border-gray-200">
                <th className="py-4 text-left font-semibold text-gray-700 w-[30%]">
                Name
                </th>
                <th className="py-4 text-left font-semibold text-gray-700 w-[30%]">
                Subject
                </th>
                <th className="py-4 text-left font-semibold text-gray-700 w-[20%]">
                Experience
                </th>
                <th className="py-4 text-left font-semibold text-gray-700 w-[20%]">
                Status
                </th>
            </tr>
            </thead>

            <tbody>
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="py-5 text-gray-800">
                Amit Sharma
                </td>
                <td className="py-5 text-gray-700">
                Mathematics
                </td>
                <td className="py-5 text-gray-700">
                8 Years
                </td>
                <td className="py-5">
                <span className="text-green-600 font-medium">
                    Active
                </span>
                </td>
            </tr>

            <tr className="hover:bg-gray-50 transition">
                <td className="py-5 text-gray-800">
                Neha Gupta
                </td>
                <td className="py-5 text-gray-700">
                Science
                </td>
                <td className="py-5 text-gray-700">
                6 Years
                </td>
                <td className="py-5">
                <span className="text-green-600 font-medium">
                    Active
                </span>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
  );
}