import { useState, useEffect, useRef, useCallback } from "react";
import {
  Fingerprint,
  ScanFace,
  Calendar,
  Users,
  UserCheck,
  UserX,
  Save,
  X,
  Search,
  Loader2,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react";


function useToast() {
  const [toast, setToast] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return { toast, showToast };
}


function useCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [active, setActive] = useState(false);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setActive(true);
    } catch {
      alert("Camera permission denied or not available.");
    }
  }, []);

  const stop = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setActive(false);
  }, []);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { videoRef, active, start, stop };
}


function usePagination(items, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    paginatedItems,
    goToPage,
  };
}


const generateStudents = (base, count) => {
  const names = [
    "Rahul", "Priya", "Ankit", "Sneha", "Aman", "Neha", "Rohit", "Pooja",
    "Vikas", "Kavya", "Suresh", "Meera", "Arjun", "Kiran", "Ravi", "Sunita",
    "Deepak", "Anjali", "Mohan", "Nisha",
  ];
  const statuses = ["Present", "Absent"];
  return Array.from({ length: count }, (_, i) => ({
    id: base + i,
    roll: String(base + i).padStart(3, "0"),
    name: `${names[i % names.length]} ${Math.floor(Math.random() * 1000)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

const classData = {
  "10-A": generateStudents(1, 50),
  "9-B": generateStudents(51, 80),
  "8-C": generateStudents(81, 100),
};


const cardColors = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: "text-blue-600",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    icon: "text-green-600",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    icon: "text-red-600",
  },
};


function TeacherCard({ teacherMarked, setMethod }) {
  const methods = [
    {
      id: "face",
      icon: ScanFace,
      label: "Face Recognition",
      desc: "Camera verification",
      color: "green",
    },
    {
      id: "finger",
      icon: Fingerprint,
      label: "Fingerprint",
      desc: "Scanner verification",
      color: "blue",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Teacher Attendance</h2>
          <p className="text-gray-500 text-sm">Verify using biometrics</p>
        </div>
        {teacherMarked && (
          <span className="mt-3 sm:mt-0 inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <CheckCircle size={16} />
            Present Today
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {methods.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => !teacherMarked && setMethod(item.id)}
              className={`border rounded-2xl p-6 transition shadow-sm ${
                teacherMarked ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:shadow-lg"
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon
                  size={40}
                  className={item.color === "green" ? "text-green-600" : "text-blue-600"}
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.label}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


function SummaryCards({ total, present, absent }) {
  const cards = [
    { label: "Total Students", value: total, icon: Users, color: "blue" },
    { label: "Present", value: present, icon: UserCheck, color: "green" },
    { label: "Absent", value: absent, icon: UserX, color: "red" },
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        const c = cardColors[card.color];
        return (
          <div
            key={card.label}
            className={`${c.bg} ${c.border} border rounded-2xl p-5 shadow-sm flex items-center gap-4`}
          >
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Icon size={24} className={c.icon} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <h3 className={`text-3xl font-bold ${c.text}`}>{card.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}


function ProgressBar({ percentage }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border">
      <div className="flex justify-between mb-3">
        <span className="text-gray-500">Attendance Rate</span>
        <span className="font-bold text-gray-800">{percentage}%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-600 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}


function Filters({
  selectedClass,
  setSelectedClass,
  selectedDate,
  setSelectedDate,
  searchQuery,
  setSearchQuery,
  loadStudents,
  loading,
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="10-A">10-A</option>
          <option value="9-B">9-B</option>
          <option value="8-C">8-C</option>
          
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded-xl pl-10 p-3 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={loadStudents}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-3 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Load Students
        </button>
      </div>
    </div>
  );
}


function StudentList({
  selectedClass,
  students,
  searchQuery,
  itemsPerPage,
  setItemsPerPage,
  updateAttendance,
  present,
  absent,
  handleSaveAttendance,
}) {
  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roll.includes(searchQuery)
  );

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    paginatedItems,
    goToPage,
  } = usePagination(filtered, itemsPerPage);

  const totalItems = filtered.length;

  return (
    <div className="bg-white rounded-2xl shadow-md border overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-gray-50 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-gray-800">Class {selectedClass}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>
            Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded-lg p-1 bg-white"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* List */}
      {paginatedItems.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No students found</div>
      ) : (
        <div className="divide-y">
          {paginatedItems.map((student) => (
            <div
              key={student.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 hover:bg-gray-50"
            >
              <div className="mb-2 sm:mb-0">
                <h4 className="font-medium text-gray-800">{student.name}</h4>
                <p className="text-sm text-gray-500">Roll No. {student.roll}</p>
              </div>
              <div className="bg-gray-100 rounded-full p-1 flex gap-1">
                <button
                  onClick={() => updateAttendance(student.id, "Present")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    student.status === "Present"
                      ? "bg-green-600 text-white shadow-md"
                      : "hover:bg-green-200 text-gray-700"
                  }`}
                >
                  Present
                </button>
                <button
                  onClick={() => updateAttendance(student.id, "Absent")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    student.status === "Absent"
                      ? "bg-red-600 text-white shadow-md"
                      : "hover:bg-red-200 text-gray-700"
                  }`}
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t bg-gray-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border hover:bg-white disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page = currentPage;
              if (totalPages <= 5) page = i + 1;
              else if (currentPage <= 3) page = i + 1;
              else if (currentPage >= totalPages - 2) page = totalPages - 4 + i;
              else page = currentPage - 2 + i;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-1 rounded-xl border transition ${
                    page === currentPage
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border hover:bg-white disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 border-t bg-gray-50 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-gray-500">
          <span className="font-medium text-green-600">{present}</span> Present ·{" "}
          <span className="font-medium text-red-600">{absent}</span> Absent
        </div>
        <button
          onClick={handleSaveAttendance}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-sm hover:shadow"
        >
          <Save size={18} />
          Save Attendance
        </button>
      </div>
    </div>
  );
}

// FACE MODAL

function FaceModal({ onClose, onMark }) {
  const { videoRef, active, start, stop } = useCamera();

  const handleClose = () => {
    stop();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[95%] max-w-lg rounded-3xl p-6 shadow-2xl">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
            <ScanFace className="text-green-600" size={24} /> Face Recognition
          </h3>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 relative rounded-2xl overflow-hidden bg-gray-900 aspect-video flex items-center justify-center">
          {!active ? (
            <div className="text-center p-6">
              <ScanFace size={48} className="mx-auto text-gray-400 animate-pulse" />
              <p className="text-white mt-2">Camera not started</p>
              <button
                onClick={start}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium"
              >
                Start Camera
              </button>
            </div>
          ) : (
            <>
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-green-400 rounded-full shadow-lg animate-pulse ring-4 ring-green-300/50" />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                Scanning face...
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          {active && (
            <button
              onClick={() => {
                onMark();
                handleClose();
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <Camera size={20} /> Capture & Submit
            </button>
          )}
          <button onClick={handleClose} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold">
            Cancel
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-3">
          Click "Start Camera" to enable your webcam. Then "Capture & Submit" to mark attendance.
        </p>
      </div>
    </div>
  );
}

// FINGER MODAL

function FingerModal({ onClose, onMark }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[95%] max-w-lg rounded-3xl p-6 shadow-2xl">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
            <Fingerprint className="text-blue-600" size={24} /> Fingerprint Scan
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 h-56 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <Fingerprint size={80} className="text-blue-600 animate-pulse" />
        </div>

        <p className="text-center text-gray-500 text-sm mt-3">Place your finger on scanner...</p>

        <button
          onClick={() => {
            onMark();
            onClose();
          }}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
}

// MAIN COMPONENT

export default function TeacherAttendance() {
  // State
  const [method, setMethod] = useState(null); // 'face' | 'finger' | null
  const [teacherMarked, setTeacherMarked] = useState(false);
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { toast, showToast } = useToast();

  // Load students
  const loadStudents = (classValue) => {
    setLoading(true);
    setTimeout(() => {
      setStudents(classData[classValue] || []);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadStudents(selectedClass);
  }, [selectedClass]);

  // Handlers
  const changeClass = (value) => {
    setSelectedClass(value);
    setSearchQuery("");
  };

  const updateAttendance = (id, status) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const markTeacherAttendance = () => {
    setTeacherMarked(true);
    setMethod(null);
    showToast("Teacher attendance marked successfully!", "success");
  };

  const handleSaveAttendance = () => {
    showToast("Attendance saved successfully!", "success");
  };

  const total = students.length;
  const present = students.filter((s) => s.status === "Present").length;
  const absent = students.filter((s) => s.status === "Absent").length;
  const percentage = total ? Math.round((present / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Toast */}
        {toast.visible && (
          <div
            className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-white transition-all duration-300 ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.type === "success" ? <CheckCircle size={20} /> : <X size={20} />}
            <span className="font-medium">{toast.message}</span>
          </div>
        )}

        {/* Header */}
        <header className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-2xl">
                  <Users size={28} />
                </span>
                Attendance Management
              </h1>
              <p className="text-gray-500 mt-1">
                Mark your attendance and manage students effortlessly.
              </p>
            </div>
            <div className="mt-2 md:mt-0 flex items-center gap-3 bg-white/50 rounded-full px-4 py-2 shadow-inner">
              <Calendar size={20} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-600">{selectedDate}</span>
            </div>
          </div>
        </header>

        {/* Teacher Card */}
        <TeacherCard teacherMarked={teacherMarked} setMethod={setMethod} />

        {/* Summary Cards */}
        <SummaryCards total={total} present={present} absent={absent} />

        {/* Progress Bar */}
        <ProgressBar percentage={percentage} />

        {/* Filters */}
        <Filters
          selectedClass={selectedClass}
          setSelectedClass={changeClass}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loadStudents={() => loadStudents(selectedClass)}
          loading={loading}
        />

        {/* Student List */}
        <StudentList
          selectedClass={selectedClass}
          students={students}
          searchQuery={searchQuery}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          updateAttendance={updateAttendance}
          present={present}
          absent={absent}
          handleSaveAttendance={handleSaveAttendance}
        />

        {/* Modals */}
        {method === "face" && (
          <FaceModal
            onClose={() => {
              setMethod(null);
            }}
            onMark={markTeacherAttendance}
          />
        )}
        {method === "finger" && (
          <FingerModal
            onClose={() => setMethod(null)}
            onMark={markTeacherAttendance}
          />
        )}
      </div>
    </div>
  );
}