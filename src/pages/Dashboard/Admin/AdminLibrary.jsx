import { Search, Plus, BookOpen, Library, BookCheck } from "lucide-react";

export default function AdminLibrary() {
  const stats = [
    {
      title: "Total Books",
      value: "4,530",
      icon: <Library size={20} />,
      color: "bg-red-500",
    },
    {
      title: "Issued Books",
      value: "1,245",
      icon: <BookCheck size={20} />,
      color: "bg-green-600",
    },
    {
      title: "Available Books",
      value: "3,285",
      icon: <BookOpen size={20} />,
      color: "bg-red-600",
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
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Library Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage Books and Library Records
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18} />
          Add Book
        </button>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        {stats.map((item) => (

          <div
            key={item.title}
            className="bg-white rounded-2xl shadow p-7 flex justify-between items-center"
          >

            <div>

              <p className="text-gray-500">
                {item.title}
              </p>

              <h2 className="text-2xl font-bold mt-2">
                {item.value}
              </h2>

            </div>

            <div
              className={`${item.color} w-11 h-11 rounded-2xl flex items-center justify-center text-white`}
            >
              {item.icon}
            </div>

          </div>

        ))}

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow p-5">

        <div className="relative w-90">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Book..."
            className="w-full border rounded-xl py-3 pl-11 outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="flex justify-between items-center p-8 border-b">

          <h2 className="text-xl font-semibold">
            Book List
          </h2>

          <span className="text-gray-500">
            Total : {books.length}
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-8 py-4 text-left">Book Name</th>

                <th className="px-8 py-4 text-center">Author</th>

                <th className="px-8 py-4 text-center">Category</th>

                <th className="px-8 py-4 text-center">Status</th>

                <th className="px-8 py-4 text-center">Action</th>

              </tr>

            </thead>

            <tbody>

              {books.map((book) => (

                <tr
                  key={book.id}
                  className="border-t hover:bg-green-50 transition"
                >

                  <td className="px-8 py-5 font-medium">
                    {book.title}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {book.author}
                  </td>

                  <td className="px-8 py-5 text-center">
                    {book.category}
                  </td>

                  <td className="px-8 py-5 text-center">

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        book.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {book.status}
                    </span>

                  </td>

                  <td className="px-8 py-5">

                    <div className="flex justify-center gap-3">

                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Edit
                      </button>

                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
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

    </div>
  );
}