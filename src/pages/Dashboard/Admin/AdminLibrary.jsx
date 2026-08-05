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
  Eye,
} from "lucide-react";

export default function AdminLibrary() {

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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

const handleDeleteBook = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this book?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

    const response = await fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/deleteBook.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      }
    );

    const data = await response.json();

    if (data.status) {

      alert(data.message);

      fetchBooks();

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error("Delete Book Error:", error);

    alert("Something went wrong while deleting the book.");

  }
};

const handleUpdateBook = async () => {

  if (
    !editingBook.title ||
    !editingBook.author ||
    !editingBook.category ||
    !editingBook.isbn ||
    !editingBook.total_copies
  ) {
    alert("Please fill all required fields.");
    return;
  }

  try {

    const response = await fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/updateBook.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingBook),
      }
    );

    const data = await response.json();

    if (data.status) {

      alert(data.message);

      setShowEditModal(false);
      setEditingBook(null);

      fetchBooks();

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error("Update Book Error:", error);

    alert("Something went wrong while updating the book.");

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

    
      
      {/* Search & Filters */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">

          <div className="flex flex-col lg:flex-row gap-4">

            {/* Search */}
            <div className="relative flex-1">

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

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            >

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All"
                    ? "All Categories"
                    : category}
                </option>
              ))}

            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            >

              <option value="All">
                All Status
              </option>

              <option value="Available">
                Available
              </option>

              <option value="Out of Stock">
                Out of Stock
              </option>

            </select>

          </div>

          {/* Result Information */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">

            <span>
              Showing <b className="text-gray-700">{filteredBooks.length}</b> books
            </span>

            {(searchQuery || categoryFilter !== "All" || statusFilter !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("All");
                  setStatusFilter("All");
                }}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Clear Filters
              </button>
            )}

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

                    {/* View Book */}
                    <button
                      onClick={() => {
                        setSelectedBook(book);
                        setShowViewModal(true);
                      }}
                      className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition"
                      title="View Book"
                    >
                      <Eye size={16} />
                    </button>

                    {/* Edit Book */}
                    <button
                      onClick={() => {
                        setEditingBook({
                          ...book,
                          price: book.price || "",
                          total_copies: book.total_copies || "",
                          description: book.description || "",
                        });

                        setShowEditModal(true);
                      }}
                      className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                      title="Edit Book"
                    >
                      <Pencil size={16} />
                    </button>

                    {/* Delete Book */}
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"
                      title="Delete Book"
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

      {/* Edit Book Modal */}

      {showEditModal && editingBook && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">

            {/* Header */}

            <div className="flex justify-between items-center px-7 py-5 border-b">

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Edit Book
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update the book information.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingBook(null);
                }}
                className="w-9 h-9 rounded-full hover:bg-gray-100 text-gray-500 text-xl"
              >
                ×
              </button>

            </div>


            {/* Form */}

            <div className="p-7">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Title */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book Title *
                  </label>

                  <input
                    type="text"
                    value={editingBook.title}
                    onChange={(e) =>
                      setEditingBook({
                        ...editingBook,
                        title: e.target.value,
                      })
                    }
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
                    value={editingBook.author}
                    onChange={(e) =>
                      setEditingBook({
                        ...editingBook,
                        author: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>


                {/* Category */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>

                  <select
                    value={editingBook.category}
                    onChange={(e) =>
                      setEditingBook({
                        ...editingBook,
                        category: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Science">Science</option>
                    <option value="Language">Language</option>
                    <option value="Technology">Technology</option>
                    <option value="Literature">Literature</option>
                    <option value="General">General</option>
                  </select>
                </div>


                {/* ISBN */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ISBN *
                  </label>

                  <input
                    type="text"
                    value={editingBook.isbn}
                    onChange={(e) =>
                      setEditingBook({
                        ...editingBook,
                        isbn: e.target.value,
                      })
                    }
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
                    value={editingBook.publisher || ""}
                    onChange={(e) =>
                      setEditingBook({
                        ...editingBook,
                        publisher: e.target.value,
                      })
                    }
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
                    min="0"
                    value={editingBook.price || ""}
                    onChange={(e) =>
                      setEditingBook({
                        ...editingBook,
                        price: e.target.value,
                      })
                    }
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
                    min="1"
                    value={editingBook.total_copies || ""}
                    onChange={(e) =>
                      setEditingBook({
                        ...editingBook,
                        total_copies: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>


                {/* Shelf */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shelf Location
                  </label>

                  <input
                    type="text"
                    value={editingBook.shelf_location || ""}
                    onChange={(e) =>
                      setEditingBook({
                        ...editingBook,
                        shelf_location: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

              </div>


              {/* Description */}

              <div className="mt-5">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description / Summary
                </label>

                <textarea
                  rows="4"
                  value={editingBook.description || ""}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-green-500"
                />

              </div>

            </div>


            {/* Footer */}

            <div className="flex justify-end gap-3 px-7 py-5 border-t bg-gray-50">

              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingBook(null);
                }}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-white transition"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateBook}
                className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
              >
                Update Book
              </button>

            </div>

          </div>

        </div>
      )}


      {/* View Book Details Modal */}

{showViewModal && selectedBook && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

    <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">

      {/* Header */}
      <div className="flex justify-between items-center px-7 py-5 border-b">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Book Details
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Complete information about this book
          </p>
        </div>

        <button
          onClick={() => {
            setShowViewModal(false);
            setSelectedBook(null);
          }}
          className="w-10 h-10 rounded-full hover:bg-gray-100 text-gray-500 text-2xl transition"
        >
          ×
        </button>

      </div>


      {/* Main Book Information */}
      <div className="p-7">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Book Cover */}
          <div className="flex flex-col items-center">

            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <img
                src={selectedBook.cover_image}
                alt={selectedBook.title}
                className="w-48 h-64 object-cover rounded-xl shadow-md"
              />
            </div>

            {/* Status */}
            <span
              className={`mt-4 px-4 py-2 rounded-full text-sm font-medium ${
                selectedBook.status === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {selectedBook.status}
            </span>

          </div>


          {/* Book Basic Information */}
          <div className="md:col-span-2">

            <div className="mb-6">

              <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium mb-3">
                {selectedBook.category}
              </span>

              <h1 className="text-3xl font-bold text-gray-800">
                {selectedBook.title}
              </h1>

              <p className="text-gray-500 mt-2 text-base">
                Written by{" "}
                <span className="font-semibold text-gray-700">
                  {selectedBook.author}
                </span>
              </p>

            </div>


            {/* Information Grid */}
            <div className="grid sm:grid-cols-2 gap-4">

              {/* Publisher */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400">
                  Publisher
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {selectedBook.publisher || "Not available"}
                </p>
              </div>


              {/* ISBN */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400">
                  ISBN
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {selectedBook.isbn}
                </p>
              </div>


              {/* Price */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400">
                  Book Price
                </p>

                <p className="font-semibold text-green-600 text-lg mt-1">
                  ₹{Number(selectedBook.price || 0).toLocaleString("en-IN")}
                </p>
              </div>


              {/* Shelf */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400">
                  Shelf Location
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {selectedBook.shelf_location || "Not assigned"}
                </p>
              </div>

            </div>


            {/* Copies */}
            <div className="mt-4 grid sm:grid-cols-2 gap-4">

              <div className="bg-blue-50 rounded-2xl p-4">

                <p className="text-xs text-blue-500">
                  Total Copies
                </p>

                <p className="text-2xl font-bold text-blue-700 mt-1">
                  {selectedBook.total_copies}
                </p>

              </div>


              <div className="bg-green-50 rounded-2xl p-4">

                <p className="text-xs text-green-500">
                  Available Copies
                </p>

                <p className="text-2xl font-bold text-green-700 mt-1">
                  {selectedBook.available_copies}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* Description */}
        <div className="mt-8 border-t pt-7">

          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            About This Book
          </h3>

          <div className="bg-gray-50 rounded-2xl p-5">

            <p className="text-gray-600 leading-7">
              {selectedBook.description ||
                "No description is available for this book."}
            </p>

          </div>

        </div>


        {/* Availability Summary */}
        <div className="mt-6">

          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Availability
          </h3>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

            <div className="flex justify-between items-center mb-3">

              <span className="text-sm text-gray-500">
                Available Copies
              </span>

              <span className="font-semibold text-gray-800">
                {selectedBook.available_copies} /{" "}
                {selectedBook.total_copies}
              </span>

            </div>


            <div className="w-full bg-gray-200 rounded-full h-2">

              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{
                  width: `${
                    selectedBook.total_copies > 0
                      ? (Number(selectedBook.available_copies) /
                          Number(selectedBook.total_copies)) *
                        100
                      : 0
                  }%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>


      {/* Footer */}
      <div className="flex justify-end px-7 py-5 border-t bg-gray-50">

        <button
          onClick={() => {
            setShowViewModal(false);
            setSelectedBook(null);
          }}
          className="px-6 py-2.5 rounded-xl bg-gray-800 text-white hover:bg-gray-900 transition"
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}

 