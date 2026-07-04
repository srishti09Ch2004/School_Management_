import { useState } from "react";

const demos = [
  {
    id: "admin",
    title: "Admin Dashboard",
    icon: "admin_panel_settings",
    description: "Manage your entire school from one powerful dashboard including students, teachers, fees, academics, reports and more.",
    image: "/images/admin_dashboard.png",
    credentials: { school: "DEMO", username: "admin", password: "admin123" },
    features: ["Student Management", "Teacher Management", "Fee Management", "Exam Management", "Library", "Transport", "Reports", "Communication"],
  },
  {
    id: "teacher",
    title: "Teacher Panel",
    icon: "co_present",
    description: "Teachers can manage attendance, homework, examinations, marks and communicate with parents effortlessly.",
    image: "/images/teacher_dashboard.png",
    credentials: { school: "DEMO", username: "teacher", password: "teacher123" },
    features: ["Attendance", "Homework", "Class Timetable", "Marks Entry", "Assignments", "Notices", "Student Progress", "Communication"],
  },
  {
    id: "student",
    title: "Student Panel",
    icon: "school",
    description: "Students can access homework, results, attendance, notices, timetable and learning resources anytime.",
    image: "/images/student_dashboard.png",
    credentials: { school: "DEMO", username: "student", password: "student123" },
    features: ["Attendance", "Homework", "Results", "Timetable", "Assignments", "Library", "Fee Status", "Notices"],
  },
  {
    id: "parent",
    title: "Parent Panel",
    icon: "family_restroom",
    description: "Parents stay connected with attendance, fees, homework, exam results and school announcements.",
    image: "/images/parent_dashboard.png",
    credentials: { school: "DEMO", username: "parent", password: "parent123" },
    features: ["Attendance", "Fee Payment", "Homework", "Exam Results", "School Notices", "Progress Reports", "Communication", "Timetable"],
  },
  {
    id: "mobile",
    title: "Mobile App",
    icon: "smartphone",
    description: "Experience the complete School ERP on Android and iOS with a beautiful mobile application.",
    image: "/images/mobile_dashboard.png",
    credentials: { school: "DEMO", username: "mobile", password: "mobile123" },
    features: ["Push Notifications", "Attendance", "Homework", "Fees", "Results", "Timetable", "Messages", "Events"],
  },
];

export default function Demo() {
  const [activeDemo, setActiveDemo] = useState(demos[0]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="bg-slate-50 py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
         <div className="max-w-3xl mx-auto text-center">

          <span className="text-red-600 uppercase tracking-[3px] font-semibold">
            Live Demo
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-6 tracking-tight">
            Experience Our Future Academy
          </h1>
          <p className="text-slate-500 text-lg mt-5 leading-relaxed">
            Explore every module with an interactive live preview before making your final decision.
          </p>
        </div>
        {/* <div className="mt-10"></div> */}


        {/* Tab Switcher - Pill Style */}

        {/* <div className="flex flex-wrap justify-center gap-6 max-w-8xl mx-auto mb-20 p-2 bg-white rounded-2xl shadow-md border border-slate-100 mt-10"> */}
        <div className="flex flex-wrap justify-center gap-6 w-full mx-auto mt-10 mb-20 p-4 bg-white rounded-2xl shadow-md border border-slate-100">
          {demos.map((demo) => {
            const isActive = activeDemo.id === demo.id;
            return (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo)}
                className={`flex items-center gap-4 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="material-symbols-outlined text-xl">{demo.icon}</span>
                {demo.title}
              </button>
            );
          })}
        </div>

        {/* Main Content Showcase */}
        <div className="grid lg:grid-cols-[62%_38%] gap-8 items-stretch">
          
          {/* Left Side: Image Preview */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between">
            <div className="border-b border-slate-100 pb-5 mb-5 flex justify-between items-center">
              <div>
                
                <h2 className="text-2xl font-bold text-slate-800">{activeDemo.title} Screen</h2>
              </div>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
              </div>
            </div>
            
            <div className="bg-slate-100/70 rounded-2xl p-4 flex items-center justify-center flex-grow group overflow-hidden">
              <img
                src={activeDemo.image}
                alt={activeDemo.title}
                className="max-w-full h-auto max-h-[450px] object-contain rounded-xl shadow-md transform group-hover:scale-[1.05] transition-transform duration-500"
              />
            </div>
          </div>



          {/* Right Side: Features & Credentials Grid */}

          <div className="bg-slate-900 text-white rounded-3xl p-8 lg:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"></div>
            
            <div>
              <h3 className="text-3xl font-extrabold tracking-tight">{activeDemo.title}</h3>
              <p className="text-slate-400 mt-3 text-sm leading-relaxed">{activeDemo.description}</p>



              {/* Features List */}
              <div className="mt-9">
                <h4 className="text-sm uppercase font-semibold tracking-wider text-emerald-400 mb-4">Included Features</h4>
                <div className="grid grid-cols-2 gap-3">
                  {activeDemo.features.slice(0, 6).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                      
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>



            {/* Credentials Fields */}

            <div className="mt-8 pt-8 border-t border-slate-800">
              <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-4">Demo Credentials</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs mb-6">
                <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/50">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase mb-0.5">School</span>
                  <span className="font-mono text-emerald-400 font-bold">{activeDemo.credentials.school}</span>
                </div>
                <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/50">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase mb-0.5">Username</span>
                  <span className="font-mono text-slate-200 font-bold">{activeDemo.credentials.username}</span>
                </div>
                <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/50">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase mb-0.5">Password</span>
                  <span className="font-mono text-slate-200 font-bold">{activeDemo.credentials.password}</span>
                </div>
              </div>


              {/* Action Button */}
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-800/20 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <span>Watch System Demo</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">play_circle</span>
              </button>
            </div>

          </div>

        </div>

      </div>


      {/* --- VIDEO --- */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          
          <div className="relative w-full max-w-4xl bg-slate-500 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            

            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="text-white font-bold text-sm tracking-wide">System Live Demo: {activeDemo.title}</h3>
              </div>
              
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 p-1.5 rounded-xl transition"
              >
                <span className="material-symbols-outlined block text-xl">close</span>
              </button>
            </div>


            {/* Video Player  */}
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <video
                className="w-full h-full object-contain"
                autoPlay
                loop
                muted
                controls
                playsInline
                src="images/DemoVideo.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Modal Footer Hint */}
            <div className="px-6 py-3 bg-slate-950/60 text-center text-[11px] text-slate-400 border-t border-slate-800/60">
               Click the close button anytime to exit the dashboard video walkthrough.
            </div>

          </div>
        </div>
      )}
    </section>
  );
}