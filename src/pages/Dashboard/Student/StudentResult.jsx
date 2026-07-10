import {
  Download,
  Printer,
  Trophy,
  CheckCircle2,
} from "lucide-react";

export default function StudentResult() {
  const student = {
    name: "Rahul Sharma",
    class: "10-A",
    rollNo: "101",
    exam: "Annual Examination 2026",
    session: "2025-26",
  };

  const results = [
    {
      subject: "Mathematics",
      marks: 95,
      maxMarks: 100,
      grade: "A+",
    },
    {
      subject: "Science",
      marks: 90,
      maxMarks: 100,
      grade: "A+",
    },
    {
      subject: "English",
      marks: 82,
      maxMarks: 100,
      grade: "B+",
    },
    {
      subject: "Computer",
      marks: 97,
      maxMarks: 100,
      grade: "A+",
    },
    {
      subject: "Social Science",
      marks: 74,
      maxMarks: 100,
      grade: "B",
    },
  ];

  const totalMarks = results.reduce(
    (sum, item) => sum + item.marks,
    0
  );

  const totalMaxMarks = results.reduce(
    (sum, item) => sum + item.maxMarks,
    0
  );

  const percentage = (
    (totalMarks / totalMaxMarks) *
    100
  ).toFixed(2);

  let overallGrade = "A+";

  if (percentage < 90) overallGrade = "A";
  if (percentage < 80) overallGrade = "B";
  if (percentage < 70) overallGrade = "C";
  if (percentage < 60) overallGrade = "D";

  const handlePrint = () => {
    const printContents =
      document.getElementById("marksheet")?.innerHTML;

    const printWindow = window.open(
      "",
      "",
      "width=900,height=700"
    );

    printWindow.document.write(`
      <html>
        <head>
          <title>Marksheet</title>
          <style>
            body{
              font-family:Arial,sans-serif;
              padding:30px;
              color:#111;
            }

            table{
              width:100%;
              border-collapse:collapse;
              margin-top:20px;
            }

            th,td{
              border:1px solid #ddd;
              padding:12px;
              text-align:left;
            }

            th{
              background:#f5f5f5;
            }

            .summary{
              display:grid;
              grid-template-columns:repeat(3,1fr);
              gap:20px;
              margin-top:30px;
            }

            .card{
              border:1px solid #ddd;
              border-radius:12px;
              padding:16px;
            }

            .signatures{
              display:grid;
              grid-template-columns:1fr 1fr;
              gap:80px;
              margin-top:60px;
              text-align:center;
            }

            .line{
              border-top:1px solid #000;
              padding-top:8px;
              margin-top:8px;
            }
          </style>
        </head>

        <body>
          ${printContents}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Exam Result
          </h2>

          <p className="text-gray-500 mt-2">
            Annual Examination Report Card
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handlePrint}
            className="px-6 py-3 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-3 rounded-2xl bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
          >
            <Download size={18} />
            Download
          </button>
        </div>
      </div>

      {/* Marksheet */}
      <div
        id="marksheet"
        className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* School Header */}
        <div className="border-b border-gray-100 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            FUTURE ACADEMY SCHOOL
          </h1>

          <p className="text-gray-500 mt-2">
            Annual Examination Marksheet
          </p>
        </div>

        {/* Student Details */}
        <div className="p-7 border-b border-gray-100">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-sm text-gray-500">
                Student Name
              </p>

              <h3 className="font-semibold text-gray-800">
                {student.name}
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Roll Number
              </p>

              <h3 className="font-semibold text-gray-800">
                {student.rollNo}
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Class
              </p>

              <h3 className="font-semibold text-gray-800">
                {student.class}
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Session
              </p>

              <h3 className="font-semibold text-gray-800">
                {student.session}
              </h3>
            </div>

            <div className="col-span-2">
              <p className="text-sm text-gray-500">
                Examination
              </p>

              <h3 className="font-semibold text-gray-800">
                {student.exam}
              </h3>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-6 text-left">
                  Subject
                </th>

                <th className="px-8 py-4 text-center">
                  Max
                </th>

                <th className="px-8 py-4 text-center">
                  Marks
                </th>

                <th className="px-8 py-4 text-center">
                  Grade
                </th>

                <th className="px-8 py-4 text-center">
                  Result
                </th>
              </tr>
            </thead>

            <tbody>
              {results.map((item) => (
                <tr
                  key={item.subject}
                  className="border-t"
                >
                  <td className="px-8 py-4">
                    {item.subject}
                  </td>

                  <td className="text-center">
                    {item.maxMarks}
                  </td>

                  <td className="text-center font-semibold">
                    {item.marks}
                  </td>

                  <td className="text-center">
                    {item.grade}
                  </td>

                  <td className="text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      <CheckCircle2 size={14} />
                      Pass
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="border-t-2 font-bold bg-gray-50">
                <td className="px-8 py-5">
                  Total
                </td>

                <td className="text-center">
                  {totalMaxMarks}
                </td>

                <td className="text-center">
                  {totalMarks}
                </td>

                <td
                  className="text-center"
                  colSpan={2}
                >
                  {percentage}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 p-5 border-t">
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              Percentage
            </p>

            <h3 className="text-2xl font-bold mt-3">
              {percentage}%
            </h3>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              Overall Grade
            </p>

            <h3 className="text-2xl font-bold mt-3">
              {overallGrade}
            </h3>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              Final Result
            </p>

            <div className="flex items-center gap-2 mt-3">
              <Trophy
                size={20}
                className="text-green-600"
              />

              <h3 className="text-2xl font-bold text-green-600">
                PASS
              </h3>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-10 p-6 mt-6">
          <div className="text-center">
            <div className="mb-2 font-semibold italic">
              Mrs. Pooja Sharma
            </div>

            <div className="border-t pt-2 text-sm text-gray-600">
              Class Teacher
            </div>
          </div>

          <div className="text-center">
            <div className="mb-2 font-semibold italic">
              Dr. Rajesh Kumar
            </div>

            <div className="border-t pt-2 text-sm text-gray-600">
              Principal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}