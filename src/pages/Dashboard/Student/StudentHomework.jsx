// export default function StudentHomework() {
// const homework = [
// {
// subject: "Mathematics",
// title: "Algebra Worksheet",
// due: "11 July 2026",
// status: "Pending",
// },
// {
// subject: "Science",
// title: "Solar System Project",
// due: "12 July 2026",
// status: "Submitted",
// },
// {
// subject: "English",
// title: "Essay Writing",
// due: "13 July 2026",
// status: "Pending",
// },
// ];

// return ( <div className="space-y-8"> <h2 className="text-2xl font-bold">
// My Homework </h2>


//   <div className="grid gap-6">
//     {homework.map((item, index) => (
//       <div
//         key={index}
//         className="bg-white rounded-3xl p-6 shadow"
//       >
//         <div className="flex justify-between items-start">
//           <div>
//             <p className="text-green-600 font-semibold">
//               {item.subject}
//             </p>

//             <h3 className="text-xl font-bold mt-2">
//               {item.title}
//             </h3>

//             <p className="text-gray-500 mt-2">
//               Due Date : {item.due}
//             </p>
//           </div>

//           <span
//             className={`px-4 py-2 rounded-full text-sm ${
//               item.status === "Submitted"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-orange-100 text-orange-700"
//             }`}
//           >
//             {item.status}
//           </span>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>


// );
// }






// import {
//   BookOpen,
//   Clock,
//   CheckCircle2,
//   FileText,
// } from "lucide-react";

// export default function StudentHomework() {
//   const homework = [
//     {
//       subject: "Mathematics",
//       title: "Algebra Worksheet",
//       due: "11 July 2026",
//       status: "Pending",
//     },
//     {
//       subject: "Science",
//       title: "Solar System Project",
//       due: "12 July 2026",
//       status: "Submitted",
//     },
//     {
//       subject: "English",
//       title: "Essay Writing",
//       due: "13 July 2026",
//       status: "Pending",
//     },
//   ];

//   const total = homework.length;
//   const submitted = homework.filter(
//     (item) => item.status === "Submitted"
//   ).length;
//   const pending = total - submitted;
//   const progress = (submitted / total) * 100;

//   return (
//     <div className="space-y-7">
//       {/* Header */}
//       <div>
//         <h2 className="text-2xl font-bold text-gray-800">
//           My Homework
//         </h2>
//         <p className="text-gray-500 mt-1">
//           Keep track of your assignments and submissions.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid md:grid-cols-3 gap-5">
//         <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">
//                 Total Homework
//               </p>
//               <h3 className="text-2xl font-bold text-gray-800 mt-2">
//                 {total}
//               </h3>
//             </div>

//             <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
//               <BookOpen size={22} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">
//                 Submitted
//               </p>
//               <h3 className="text-2xl font-bold text-green-600 mt-2">
//                 {submitted}
//               </h3>
//             </div>

//             <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
//               <CheckCircle2 size={22} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">
//                 Pending
//               </p>
//               <h3 className="text-2xl font-bold text-orange-600 mt-2">
//                 {pending}
//               </h3>
//             </div>

//             <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
//               <Clock size={22} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Progress */}
//       <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
//         <div className="flex justify-between mb-3">
//           <h3 className="font-semibold text-gray-800">
//             Completion Progress
//           </h3>

//           <span className="text-sm font-medium text-green-600">
//             {Math.round(progress)}%
//           </span>
//         </div>

//         <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-green-500 rounded-full transition-all duration-500"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>

//       {/* Homework List */}
//       <div className="space-y-5">
//         {homework.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
//           >
//             <div className="flex justify-between gap-4">
//               <div className="flex gap-4">
//                 <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
//                   <FileText size={24} />
//                 </div>

//                 <div>
//                   <p className="text-sm font-semibold text-green-600">
//                     {item.subject}
//                   </p>

//                   <h3 className="text-lg font-bold text-gray-800 mt-1">
//                     {item.title}
//                   </h3>

//                   <p className="text-gray-500 text-sm mt-2">
//                     Due Date : {item.due}
//                   </p>
//                 </div>
//               </div>

//               <div>
//                 <span
//                   className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
//                     item.status === "Submitted"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-orange-100 text-orange-700"
//                   }`}
//                 >
//                   {item.status}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }








import { useMemo, useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function StudentHomework() {
  const homework = [
    {
      id: 1,
      subject: "Mathematics",
      title: "Complete Algebra Worksheet - Chapter 5",
      date: "2026-07-11",
      status: "Pending",
    },
    {
      id: 2,
      subject: "Science",
      title: "Prepare Solar System Project",
      date: "2026-07-11",
      status: "Submitted",
    },
    {
      id: 3,
      subject: "English",
      title: "Write Essay on My Favourite Teacher",
      date: "2026-07-12",
      status: "Pending",
    },
    {
      id: 4,
      subject: "Computer",
      title: "Create MS PowerPoint Presentation",
      date: "2026-07-13",
      status: "Pending",
    },
    {
      id: 5,
      subject: "Hindi",
      title: "Learn Poem and Write Question Answers",
      date: "2026-07-13",
      status: "Submitted",
    },
  ];

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );

  const changeDate = (days) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + days);
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const filteredHomework = useMemo(() => {
    return homework.filter((item) => item.date === selectedDate);
  }, [selectedDate]);

  const pending = filteredHomework.filter(
    (item) => item.status === "Pending"
  ).length;

  const submitted = filteredHomework.filter(
    (item) => item.status === "Submitted"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          My Homework
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          View your homework according to date.
        </p>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => changeDate(-1)}
            className="w-11 h-11 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
              <Calendar size={16} />
              <span className="text-sm">Selected Date</span>
            </div>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-200 rounded-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-gray-200"
            />

            <p className="text-sm text-gray-500 mt-2">
              {new Date(selectedDate).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <button
            type="button"
            onClick={() => changeDate(1)}
            className="w-11 h-11 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Small Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center">
              <Clock3 size={20} className="text-gray-700" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-xl font-bold text-gray-800">
                {pending}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-gray-700" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Submitted</p>
              <h3 className="text-xl font-bold text-gray-800">
                {submitted}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Homework List */}
      <div className="space-y-4">
        {filteredHomework.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
            <div className="w-16 h-16 rounded-3xl bg-gray-100 mx-auto flex items-center justify-center mb-4">
              <FileText size={28} className="text-gray-500" />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              No Homework
            </h3>

            <p className="text-gray-500 mt-2">
              No homework available for this date.
            </p>
          </div>
        ) : (
          filteredHomework.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-gray-700" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      {item.subject}
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 mt-1">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <span
                  className={`px-4 py-2 h-fit rounded-full text-sm font-medium ${
                    item.status === "Submitted"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-orange-50 text-orange-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

