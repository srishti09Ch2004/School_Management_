import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  Droplets,
  Shield,
  Camera,
} from "lucide-react";

export default function PrincipalProfile() {
  const principal = {
    name: "Dr. Rajesh Sharma",
    employeeId: "PR-1001",
    designation: "Principal",
    email: "principal@futureacademy.com",
    phone: "+91 9876543210",
    qualification: "Ph.D, M.Ed",
    experience: "18 Years",
    joiningDate: "15 June 2008",
    dob: "12 March 1978",
    department: "Administration",
    bloodGroup: "B+",
    emergency: "+91 9876543200",
    address: "New Delhi, India",
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Principal Profile
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          View and manage principal information.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Profile */}
          <div className="lg:w-72 flex flex-col items-center border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
            <label className="relative cursor-pointer group">
              <input
                type="file"
                className="hidden"
              />

              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                <User
                  size={55}
                  className="text-blue-600"
                />
              </div>

              <div className="absolute bottom-2 right-1 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center group-hover:bg-blue-50">
                <Camera
                  size={18}
                  className="text-gray-600"
                />
              </div>
            </label>

            <h3 className="text-xl font-bold mt-5 text-gray-800">
              {principal.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {principal.designation}
            </p>

            <div className="mt-5 w-full space-y-3">
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500">
                  Employee ID
                </p>

                <p className="font-semibold mt-1">
                  {principal.employeeId}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500">
                  Department
                </p>

                <p className="font-semibold mt-1">
                  {principal.department}
                </p>
              </div>
            </div>
          </div>

          {/* Right Information */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  label: "Email",
                  value: principal.email,
                  icon: (
                    <Mail
                      size={18}
                      className="text-blue-600"
                    />
                  ),
                },
                {
                  label: "Contact Number",
                  value: principal.phone,
                  icon: (
                    <Phone
                      size={18}
                      className="text-green-600"
                    />
                  ),
                },
                {
                  label: "Qualification",
                  value: principal.qualification,
                  icon: (
                    <GraduationCap
                      size={18}
                      className="text-purple-600"
                    />
                  ),
                },
                {
                  label: "Experience",
                  value: principal.experience,
                  icon: (
                    <Briefcase
                      size={18}
                      className="text-orange-600"
                    />
                  ),
                },
                {
                  label: "Joining Date",
                  value: principal.joiningDate,
                  icon: (
                    <Calendar
                      size={18}
                      className="text-cyan-600"
                    />
                  ),
                },
                {
                  label: "Date of Birth",
                  value: principal.dob,
                  icon: (
                    <Calendar
                      size={18}
                      className="text-pink-600"
                    />
                  ),
                },
                {
                  label: "Blood Group",
                  value: principal.bloodGroup,
                  icon: (
                    <Droplets
                      size={18}
                      className="text-red-600"
                    />
                  ),
                },
                {
                  label: "Emergency Contact",
                  value: principal.emergency,
                  icon: (
                    <Shield
                      size={18}
                      className="text-yellow-600"
                    />
                  ),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-gray-100 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      {item.icon}
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        {item.label}
                      </p>

                      <h3 className="font-semibold text-gray-800 mt-1">
                        {item.value}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}

              {/* Address */}
              <div className="md:col-span-2 border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <MapPin
                      size={18}
                      className="text-red-600"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Address
                    </p>

                    <h3 className="font-semibold text-gray-800 mt-1">
                      {principal.address}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Designation */}
              <div className="md:col-span-2 border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Building2
                      size={18}
                      className="text-indigo-600"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Designation
                    </p>

                    <h3 className="font-semibold text-gray-800 mt-1">
                      {principal.designation}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
}