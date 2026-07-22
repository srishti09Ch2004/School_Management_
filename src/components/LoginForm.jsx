import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

function LoginForm({ role }) {
  const [showPassword, setShowPassword] = useState(false);
  // 1. Inputs ke liye states banayein
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

  const roleStyles = {
    student: {
      button: "from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600",
      badge: "bg-blue-100 text-blue-700",
    },
    teacher: {
      button: "from-green-400 to-green-500 hover:from-green-500 hover:to-green-600",
      badge: "bg-green-100 text-green-700",
    },
    parent: {
      button: "from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600",
      badge: "bg-pink-100 text-pink-700",
    },
    principal: {
      button: "from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600",
      badge: "bg-purple-100 text-purple-700",
    },
    admin: {
      button: "from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600",
      badge: "bg-orange-100 text-orange-500",
    },
  };

  const style = roleStyles[role.id] || roleStyles.student;

      const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
          const response = await fetch(
            "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/login.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
                role: role.id
              }),
            }
          );

          const data = await response.json();
          console.log(data);
          console.log(data.role);

          if (!data.status) {
            alert(data.message);
            setLoading(false);
            return;
          }

          alert(data.message);
          localStorage.setItem("user", JSON.stringify(data.user));

          switch (data.role) {
            case "admin":
              navigate("/admin");
              break;

            case "teacher":
              navigate("/teacher");
              break;

            case "student":
              navigate("/student");
              break;

            case "parent":
              navigate("/parent");
              break;

            case "principal":
              navigate("/principal");
              break;

            default:
              navigate("/");
          }
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
          }

        setLoading(false);
      };



  return (
    <div>
      <div className={`inline-flex px-4 py-2 rounded-full font-semibold text-sm ${style.badge}`}>
        {role.title} Portal
      </div>

      <h2 className="mt-6 text-3xl font-bold text-gray-800">Welcome Back</h2>
      <p className="mt-2 text-gray-500">Login to continue to your dashboard.</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        {/* Email */}
        <div>
          <label className="font-medium text-gray-700">Email Address</label>
          <div className="mt-2 flex items-center border rounded-2xl px-5 h-14 focus-within:border-green-500 transition">
            <Mail size={20} className="text-gray-400" />
            <input
              type="email"
              required
              value={email} // Value ko state se tie kiya
              onChange={(e) => setEmail(e.target.value)} // State update on typing
              placeholder={`Enter your ${role.title.toLowerCase()} email`}
              className="flex-1 outline-none px-3 bg-transparent"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="font-medium text-gray-700">Password</label>
          <div className="mt-2 flex items-center border rounded-2xl px-5 h-14 focus-within:border-green-500 transition">
            <Lock size={20} className="text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password} // Value ko state se tie kiya
              onChange={(e) => setPassword(e.target.value)} // State update on typing
              placeholder="Enter Password"
              className="flex-1 outline-none px-3 bg-transparent"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} className="text-gray-500" /> : <Eye size={20} className="text-gray-500" />}
            </button>
          </div>
        </div>

        {/* Remember */}
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-green-600" />
            <span className="text-gray-600">Remember Me</span>
          </label>
          <button type="button" className="text-green-600 hover:underline">
            Forgot Password?
          </button>
        </div>

        {/* Button */}
        <button
          type="submit"
          className={`w-full h-12 rounded-2xl bg-gradient-to-r ${style.button} text-white font-semibold flex justify-center items-center gap-3 transition duration-300 hover:scale-[1.02]`}
        >
          {loading ? "Logging In..." : `Continue as ${role.title}`}
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}

export default LoginForm;