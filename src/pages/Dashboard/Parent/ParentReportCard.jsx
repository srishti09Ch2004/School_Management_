import {
  User,
  GraduationCap,
  Hash,
  Trophy,
  Medal,
  Percent,
  FileText,
} from "lucide-react";

export default function ParentReportCard() {
  const marks = [
    {
      subject: "Mathematics",
      marks: 92,
      grade: "A+",
    },
    {
      subject: "Science",
      marks: 88,
      grade: "A",
    },
    {
      subject: "English",
      marks: 95,
      grade: "A+",
    },
    {
      subject: "Computer",
      marks: 98,
      grade: "A+",
    },
    {
      subject: "Social Science",
      marks: 90,
      grade: "A+",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Report Card
      </h2>

      {/* Student Information */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="grid md:grid-cols-4 gap-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <User size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Student Name
              </p>

              <h3 className="font-bold">
                Aarti Sharma
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <GraduationCap size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Class
              </p>

              <h3 className="font-bold">
                10-A
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Hash size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Roll No
              </p>

              <h3 className="font-bold">
                18
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <FileText size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Exam
              </p>

              <h3 className="font-bold">
                Unit Test - 1
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Total Marks
              </p>

              <h3 className="text-xl font-bold mt-4">
                463/500
              </h3>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Trophy size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Percentage
              </p>

              <h3 className="text-xl font-bold text-green-600 mt-4">
                92.6%
              </h3>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <Percent size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Grade
              </p>

              <h3 className="text-xl font-bold text-purple-600 mt-4">
                A+
              </h3>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Medal size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Class Rank
              </p>

              <h3 className="text-xl font-bold text-orange-600 mt-4">
                #3
              </h3>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Trophy size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Subject Marks */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-5">
          Subject Wise Result
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 text-sm text-gray-500">
                  Subject
                </th>

                <th className="text-left py-3 text-sm text-gray-500">
                  Marks
                </th>

                <th className="text-left py-3 text-sm text-gray-500">
                  Grade
                </th>
              </tr>
            </thead>

            <tbody>
              {marks.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100"
                >
                  <td className="py-4 font-medium">
                    {item.subject}
                  </td>

                  <td className="py-4 font-semibold text-green-600">
                    {item.marks}/100
                  </td>

                  <td className="py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                      {item.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Teacher Remark */}
        <div className="mt-6 bg-blue-50 rounded-2xl p-5">
          <h4 className="font-bold mb-2">
            Class Teacher Remarks
          </h4>

          <p className="text-gray-700">
            Excellent academic performance.
            Shows great interest in studies and
            actively participates in classroom activities.
          </p>
        </div>
      </div>
    </div>
  );
}