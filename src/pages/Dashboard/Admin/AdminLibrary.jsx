import {
  Search,
  Plus,
  BookOpen,
  Library,
  BookCheck,
  Pencil,
  Trash2,
} from "lucide-react";

export default function AdminLibrary() {
  const stats = [
    {
      title: "Total Books",
      value: "4,530",
      icon: <Library size={22} />,
      color: "bg-red-500",
    },
    {
      title: "Issued Books",
      value: "1,245",
      icon: <BookCheck size={22} />,
      color: "bg-green-600",
    },
    {
      title: "Available Books",
      value: "3,285",
      icon: <BookOpen size={22} />,
      color: "bg-blue-600",
    },
  ];

  const books = [
    {
      id: 1,
      title: "Mathematics",
      author: "R.D. Sharma",
      category: "Academic",
      status: "Available",
    },
    {
      id: 2,
      title: "Physics",
      author: "H.C. Verma",
      category: "Science",
      status: "Issued",
    },
    {
      id: 3,
      title: "English Grammar",
      author: "Wren & Martin",
      category: "Language",
      status: "Available",
    },
    {
      id: 4,
      title: "Computer Science",
      author: "Sumita Arora",
      category: "Technology",
      status: "Issued",
    },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Library Management
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Manage books and library records.
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition">
          <Plus size={16} />
          Add Book
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
            placeholder="Search book..."
            className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Book List
          </h2>

          <span className="text-sm text-gray-500">
            Total : {books.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-600">
                <th className="px-6 py-4 text-left">
                  Book Name
                </th>

                <th className="px-6 py-4 text-center">
                  Author
                </th>

                <th className="px-6 py-4 text-center">
                  Category
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
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-medium text-gray-800">
                    {book.title}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {book.author}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {book.category}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        book.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {book.status}
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