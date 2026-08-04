import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  BookOpen,
  Library,
  BookCheck,
  Pencil,
  Trash2,
  IndianRupee,
} from "lucide-react";

export default function AdminLibrary() {

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    publisher: "",
    price: "",
    total_copies: "",
    shelf_location: "",
    description: "",
  });

  const fetchBooks = () => {

    fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/libraryBooks.php"
    )
      .then((res) => res.json())
      .then((data) => {

        if (data.status) {
          setBooks(data.data);
        }

      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });

  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookChange = (e) => {
  setBookForm({
    ...bookForm,
    [e.target.name]: e.target.value,
  });
};

const handleAddBook = async () => {

  if (
    !bookForm.title ||
    !bookForm.author ||
    !bookForm.category ||
    !bookForm.isbn ||
    !bookForm.total_copies
  ) {
    alert("Please fill all required fields.");
    return;
  }

  try {

    const response = await fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/addBook.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookForm),
      }
    );

    const data = await response.json();

    if (data.status) {

      alert(data.message);

      setShowAddModal(false);

      setBookForm({
        title: "",
        author: "",
        category: "",
        isbn: "",
        publisher: "",
        price: "",
        total_copies: "",
        shelf_location: "",
        description: "",
      });

      fetchBooks();

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error("Add Book Error:", error);

    alert("Something went wrong while adding the book.");

  }
};
  const filteredBooks = useMemo(() => {

  return books.filter((book) => {

    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      book.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      book.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;

  });

}, [books, searchQuery, categoryFilter, statusFilter]);

const categories = [
  "All",
  ...new Set(books.map((book) => book.category))
];

const totalBooks = books.reduce(
  (total, book) => total + Number(book.total_copies || 0),
  0
);

const availableBooks = books.reduce(
  (total, book) => total + Number(book.available_copies || 0),
  0
);

const issuedBooks = totalBooks - availableBooks;

const totalValue = books.reduce(
  (total, book) =>
    total +
    Number(book.price || 0) * Number(book.total_copies || 0),
  0
);

const stats = [
  {
    title: "Total Books",
    value: totalBooks,
    icon: Library,
    bg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Issued Books",
    value: issuedBooks,
    icon: BookCheck,
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Available Books",
    value: availableBooks,
    icon: BookOpen,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Library Value",
    value: `₹${totalValue.toLocaleString("en-IN")}`,
    icon: IndianRupee,
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
            Library Management
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Manage books and library records.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition"
        >
          <Plus size={16} />
          Add Book
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
            placeholder="Search by book name, author or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
           Total : {filteredBooks.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-600">
                <th className="px-6 py-4 text-left">
                  Book
                </th>
                <th className="px-6 py-4 text-center">
                  Author
                </th>

                <th className="px-6 py-4 text-center">
                  Category
                </th>

                <th className="px-6 py-4 text-center">
                  Price
                </th>

                <th className="px-6 py-4 text-center">
                  Copies
                </th>

                <th className="px-6 py-4 text-center">
                  Shelf
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
              {filteredBooks.map((book) => (
                <tr
                  key={book.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                                  
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">

                      <img
                        src={book.cover_image}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded-lg border"
                      />

                      <div>
                        <p className="font-semibold text-gray-800">
                          {book.title}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          ISBN: {book.isbn}
                        </p>
                      </div>

                    </div>
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {book.author}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs">
                      {book.category}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center font-medium text-gray-700">
                    ₹{Number(book.price).toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    <span className="font-medium">
                      {book.available_copies}
                    </span>
                    {" / "}
                    {book.total_copies}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {book.shelf_location}
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

      {/* Add Book Modal */}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">

            {/* Modal Header */}

            <div className="flex justify-between items-center px-7 py-5 border-b">

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Add New Book
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Add a new book to the school library.
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

                {/* Book Title */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={bookForm.title}
                    onChange={handleBookChange}
                    placeholder="Enter book title"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>


                {/* Author */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>

                  <input
                    type="text"
                    name="author"
                    value={bookForm.author}
                    onChange={handleBookChange}
                    placeholder="Enter author name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>


                {/* Category */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>

                  <select
                    name="category"
                    value={bookForm.category}
                    onChange={handleBookChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option value="Academic">
                      Academic
                    </option>

                    <option value="Science">
                      Science
                    </option>

                    <option value="Language">
                      Language
                    </option>

                    <option value="Technology">
                      Technology
                    </option>

                    <option value="Literature">
                      Literature
                    </option>

                    <option value="General">
                      General
                    </option>
                  </select>
                </div>


                {/* ISBN */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ISBN *
                  </label>

                  <input
                    type="text"
                    name="isbn"
                    value={bookForm.isbn}
                    onChange={handleBookChange}
                    placeholder="Enter ISBN"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>


                {/* Publisher */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publisher
                  </label>

                  <input
                    type="text"
                    name="publisher"
                    value={bookForm.publisher}
                    onChange={handleBookChange}
                    placeholder="Enter publisher"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>


                {/* Price */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={bookForm.price}
                    onChange={handleBookChange}
                    placeholder="₹ Enter price"
                    min="0"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>


                {/* Total Copies */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Copies *
                  </label>

                  <input
                    type="number"
                    name="total_copies"
                    value={bookForm.total_copies}
                    onChange={handleBookChange}
                    placeholder="Enter total copies"
                    min="1"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    All copies will initially be available.
                  </p>
                </div>


                {/* Shelf */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shelf Location
                  </label>

                  <input
                    type="text"
                    name="shelf_location"
                    value={bookForm.shelf_location}
                    onChange={handleBookChange}
                    placeholder="Example: A-12"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

              </div>


              {/* Cover Preview */}

              {bookForm.isbn && (
                <div className="mt-6 p-4 bg-gray-50 rounded-2xl flex items-center gap-4">

                  <img
                    src={`https://covers.openlibrary.org/b/isbn/${bookForm.isbn}-M.jpg`}
                    alt="Book Cover Preview"
                    className="w-16 h-20 object-cover rounded-lg border"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Book Cover Preview
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Cover will be generated automatically using ISBN.
                    </p>
                  </div>

                </div>
              )}


              {/* Description */}

              <div className="mt-5">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description / Summary
                </label>

                <textarea
                  name="description"
                  value={bookForm.description}
                  onChange={handleBookChange}
                  placeholder="Write a short description about this book..."
                  rows="4"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-green-500"
                />

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
                onClick={handleAddBook}
                className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
              >
                Save Book
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

 