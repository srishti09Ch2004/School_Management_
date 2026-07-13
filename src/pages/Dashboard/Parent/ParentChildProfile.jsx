
import {
  User,
  GraduationCap,
  Calendar,
  Phone,
  MapPin,
  Droplets,
  Hash,
  Users,
  Briefcase,
} from "lucide-react";

export default function ParentChildProfile() {
  const student = {
    name: "Aarti Sharma",
    admissionNo: "FA1023",
    class: "10-A",
    rollNo: "18",
    gender: "Female",
    dob: "12 Jan 2010",
    age: "16 Years",
    bloodGroup: "B+",
    phone: "+91 9876543210",
    address: "New Delhi, India",
    fatherName: "Rajesh Sharma",
    fatherOccupation: "Software Engineer",
    fatherPhone: "+91 9876543211",
    motherName: "Pooja Sharma",
    motherOccupation: "Teacher",
    motherPhone: "+91 9876543212",
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">
        Child Profile
      </h2>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Profile */}
          <div className="lg:w-72 flex flex-col items-center border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
            <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center">
              <User
                size={50}
                className="text-blue-600"
              />
            </div>

            <h3 className="text-xl font-bold mt-4">
              {student.name}
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Class {student.class}
            </p>

            <div className="mt-5 w-full space-y-3">
              <div className="bg-gray-50 rounded-2xl p-3">
                <p className="text-xs text-gray-500">
                  Admission No
                </p>

                <p className="font-semibold">
                  {student.admissionNo}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-3">
                <p className="text-xs text-gray-500">
                  Roll Number
                </p>

                <p className="font-semibold">
                  {student.rollNo}
                </p>
              </div>
            </div>
          </div>

          {/* Right Information */}
          <div className="flex-1 space-y-8">
            {/* Student Information */}
            <div>
              <h3 className="text-lg font-bold mb-4">
                Student Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <GraduationCap size={16} />
                    Class
                  </div>

                  <p className="font-semibold mt-2">
                    {student.class}
                  </p>
                </div>

                <div className="border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Users size={16} />
                    Gender
                  </div>

                  <p className="font-semibold mt-2">
                    {student.gender}
                  </p>
                </div>

                <div className="border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar size={16} />
                    Date of Birth
                  </div>

                  <p className="font-semibold mt-2">
                    {student.dob}
                  </p>
                </div>

                <div className="border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Hash size={16} />
                    Age
                  </div>

                  <p className="font-semibold mt-2">
                    {student.age}
                  </p>
                </div>

                <div className="border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Droplets size={16} />
                    Blood Group
                  </div>

                  <p className="font-semibold mt-2">
                    {student.bloodGroup}
                  </p>
                </div>

                <div className="border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Phone size={16} />
                    Phone Number
                  </div>

                  <p className="font-semibold mt-2">
                    {student.phone}
                  </p>
                </div>

                <div className="border border-gray-100 rounded-2xl p-4 md:col-span-2">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={16} />
                    Address
                  </div>

                  <p className="font-semibold mt-2">
                    {student.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div>
              <h3 className="text-lg font-bold mb-4">
                Parent Information
              </h3>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Father */}
                <div className="border border-gray-100 rounded-3xl p-5">
                  <h4 className="font-bold text-lg mb-4">
                    Father Details
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">
                        Name
                      </p>

                      <p className="font-semibold">
                        {student.fatherName}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Occupation
                      </p>

                      <p className="font-semibold flex items-center gap-2">
                        <Briefcase size={16} />
                        {student.fatherOccupation}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Contact Number
                      </p>

                      <p className="font-semibold">
                        {student.fatherPhone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mother */}
                <div className="border border-gray-100 rounded-3xl p-5">
                  <h4 className="font-bold text-lg mb-4">
                    Mother Details
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">
                        Name
                      </p>

                      <p className="font-semibold">
                        {student.motherName}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Occupation
                      </p>

                      <p className="font-semibold flex items-center gap-2">
                        <Briefcase size={16} />
                        {student.motherOccupation}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Contact Number
                      </p>

                      <p className="font-semibold">
                        {student.motherPhone}
                      </p>
                    </div>
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