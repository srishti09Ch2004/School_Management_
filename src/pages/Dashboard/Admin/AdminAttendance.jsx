// import { useRef, useState } from "react";
// import {
//   ScanFace,
//   Fingerprint,
//   X,
// } from "lucide-react";

// export default function AdminAttendance() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [cameraOpen, setCameraOpen] = useState(false);
//   const [fingerOpen, setFingerOpen] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);

//   // Open Camera
//   const openCamera = async () => {
//     setCapturedImage(null);
//     setCameraOpen(true);

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//       });

//       setTimeout(() => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       }, 100);
//     } catch (error) {
//       console.error(error);
//       alert("Camera access denied.");
//       setCameraOpen(false);
//     }
//   };

//   // Close Camera
//   const closeCamera = () => {
//     if (videoRef.current?.srcObject) {
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach((track) => track.stop());
//     }

//     setCameraOpen(false);
//     setCapturedImage(null);
//   };

//   // Capture Photo
//   const capturePhoto = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     if (!video || !canvas) return;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0);

//     const image = canvas.toDataURL("image/png");
//     setCapturedImage(image);

//     // Camera band kar do capture ke baad
//     if (video.srcObject) {
//       const tracks = video.srcObject.getTracks();
//       tracks.forEach((track) => track.stop());
//     }
//   };

//   // Submit Attendance
//   const submitAttendance = async () => {
//     try {
//       // Yahan API call laga sakte ho
//       // await axios.post("/api/attendance", {
//       //   image: capturedImage,
//       // });

//       alert("Attendance submitted successfully!");

//       closeCamera();
//     } catch (error) {
//       console.error(error);
//       alert("Failed to submit attendance.");
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <h2 className="text-3xl font-bold">
//         Attendance Management
//       </h2>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Face Recognition Card */}
//         <div className="bg-white p-8 rounded-3xl shadow">
//           <h3 className="text-xl font-bold mb-4">
//             Face Recognition
//           </h3>

//           <div className="flex justify-center py-10">
//             <div className="bg-green-100 p-8 rounded-full">
//               <ScanFace
//                 size={80}
//                 className="text-green-600"
//               />
//             </div>
//           </div>

//           <button
//             onClick={openCamera}
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
//           >
//             Scan Face
//           </button>
//         </div>

//         {/* Fingerprint Card */}
//         <div className="bg-white p-8 rounded-3xl shadow">
//           <h3 className="text-xl font-bold mb-4">
//             Fingerprint Scanner
//           </h3>

//           <div className="flex justify-center py-10">
//             <div className="bg-blue-100 p-8 rounded-full">
//               <Fingerprint
//                 size={80}
//                 className="text-blue-600"
//               />
//             </div>
//           </div>

//           <button
//             onClick={() => setFingerOpen(true)}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
//           >
//             Scan Fingerprint
//           </button>
//         </div>
//       </div>

//       {/* Camera Modal */}
//       {cameraOpen && (
//         <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-3xl p-6 w-full max-w-2xl relative">
//             <button
//               onClick={closeCamera}
//               className="absolute top-4 right-4"
//             >
//               <X size={28} />
//             </button>

//             <h3 className="text-2xl font-bold text-center mb-5">
//               Face Attendance
//             </h3>

//             {!capturedImage ? (
//               <>
//                 <video
//                   ref={videoRef}
//                   autoPlay
//                   playsInline
//                   className="w-full rounded-2xl border"
//                 />

//                 <button
//                   onClick={capturePhoto}
//                   className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
//                 >
//                   Capture Photo
//                 </button>
//               </>
//             ) : (
//               <>
//                 <img
//                   src={capturedImage}
//                   alt="Captured"
//                   className="w-full rounded-2xl border"
//                 />

//                 <div className="grid grid-cols-2 gap-4 mt-5">
//                   <button
//                     onClick={openCamera}
//                     className="bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl"
//                   >
//                     Retake
//                   </button>

//                   <button
//                     onClick={submitAttendance}
//                     className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
//                   >
//                     Submit Attendance
//                   </button>
//                 </div>
//               </>
//             )}

//             <canvas
//               ref={canvasRef}
//               className="hidden"
//             />
//           </div>
//         </div>
//       )}

//       {/* Fingerprint Modal */}
//       {fingerOpen && (
//         <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-3xl p-8 w-full max-w-md relative text-center">
//             <button
//               onClick={() => setFingerOpen(false)}
//               className="absolute top-4 right-4"
//             >
//               <X size={28} />
//             </button>

//             <div className="flex justify-center mb-6">
//               <Fingerprint
//                 size={90}
//                 className="text-blue-600"
//               />
//             </div>

//             <h3 className="text-2xl font-bold mb-3">
//               Fingerprint Scanner
//             </h3>

//             <p className="text-gray-600 mb-6">
//               Place your finger on the biometric device to
//               mark attendance.
//             </p>

//             <button
//               onClick={() => {
//                 alert(
//                   "Fingerprint scanned successfully!"
//                 );
//                 setFingerOpen(false);
//               }}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
//             >
//               Start Scan
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }















import {
Users,
UserCheck,
UserX,
Calendar,
} from "lucide-react";

export default function AdminAttendance() {
const attendanceData = [
{
class: "10-A",
present: 42,
absent: 3,
percentage: "93%",
},
{
class: "9-B",
present: 38,
absent: 2,
percentage: "95%",
},
{
class: "8-C",
present: 40,
absent: 5,
percentage: "89%",
},
{
class: "12-A",
present: 36,
absent: 1,
percentage: "97%",
},
];

const cards = [
{
title: "Total Students",
value: "2,540",
icon: <Users size={22} />,
color: "bg-blue-500",
},
{
title: "Present Today",
value: "2,412",
icon: <UserCheck size={22} />,
color: "bg-green-600",
},
{
title: "Absent Today",
value: "128",
icon: <UserX size={22} />,
color: "bg-red-500",
},
{
title: "Attendance Rate",
value: "95%",
icon: <Calendar size={22} />,
color: "bg-purple-500",
},
];

return ( <div className="space-y-8"> <div> <h2 className="text-3xl font-bold text-gray-800">
Attendance Reports </h2>


    <p className="text-gray-500 mt-2">
      Monitor school attendance and daily reports.
    </p>
  </div>

  <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
    {cards.map((item) => (
      <div
        key={item.title}
        className="bg-white rounded-3xl p-6 shadow hover:shadow-lg transition"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">
              {item.title}
            </p>

            <h3 className="text-3xl font-bold mt-3">
              {item.value}
            </h3>
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

  <div className="bg-white rounded-3xl p-8 shadow">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h3 className="text-2xl font-bold">
          Class Wise Attendance
        </h3>

        <p className="text-gray-500 mt-2">
          Today's attendance summary.
        </p>
      </div>

      <button className="bg-green-600 text-white px-5 py-3 rounded-xl">
        Export Report
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4">
              Class
            </th>

            <th className="text-left py-4">
              Present
            </th>

            <th className="text-left py-4">
              Absent
            </th>

            <th className="text-left py-4">
              Percentage
            </th>

            <th className="text-left py-4">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {attendanceData.map((item) => (
            <tr
              key={item.class}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-5 font-semibold">
                {item.class}
              </td>

              <td className="py-5">
                {item.present}
              </td>

              <td className="py-5">
                {item.absent}
              </td>

              <td className="py-5">
                {item.percentage}
              </td>

              <td className="py-5">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Good
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  <div className="bg-white rounded-3xl p-8 shadow">
    <h3 className="text-2xl font-bold mb-6">
      Attendance Insights
    </h3>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-blue-50 rounded-2xl p-6">
        <h4 className="font-bold text-lg">
          Best Attendance
        </h4>

        <p className="text-gray-500 mt-2">
          Class 12-A has the highest attendance with 97%.
        </p>
      </div>

      <div className="bg-red-50 rounded-2xl p-6">
        <h4 className="font-bold text-lg">
          Needs Attention
        </h4>

        <p className="text-gray-500 mt-2">
          Class 8-C attendance is below the school average.
        </p>
      </div>

      <div className="bg-green-50 rounded-2xl p-6">
        <h4 className="font-bold text-lg">
          Overall Performance
        </h4>

        <p className="text-gray-500 mt-2">
          School attendance rate improved by 3% this month.
        </p>
      </div>
    </div>
  </div>
</div>

);
}
