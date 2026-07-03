import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-white shadow-lg">
                <GraduationCap size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Driksha
                </h2>

                <p className="text-xs uppercase tracking-widest text-red-600 font-semibold">
                  School Management
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-600 text-sm leading-6 max-w-sm">
              Smart School Management System that simplifies attendance,
              fees, student records, teacher management and academics
              through one powerful platform.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-3">
              Social Media
            </h4>

            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white shadow hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white shadow hover:bg-pink-500 hover:text-white transition flex items-center justify-center"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white shadow hover:bg-blue-700 hover:text-white transition flex items-center justify-center"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Quick Links
            </h3>

            <div className="space-y-3">
              <a
                href="/about"
                className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
              >
                <ArrowRight size={15} />
                About
              </a>

              <a
                href="/features"
                className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
              >
                <ArrowRight size={15} />
                Features
              </a>

              <a
                href="/pricing"
                className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
              >
                <ArrowRight size={15} />
                Pricing
              </a>

              <a
                href="/demo"
                className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
              >
                <ArrowRight size={15} />
                Demo
              </a>

              <a
                href="/career"
                className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
              >
                <ArrowRight size={15} />
                Career
              </a>

              <a
                href="/contact"
                className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
              >
                <ArrowRight size={15} />
                Contact
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Contact
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Mail className="text-green-600" size={18} />
                </div>

                <span className="text-gray-600 text-sm">
                  info@driksha.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <Phone className="text-red-600" size={18} />
                </div>

                <span className="text-gray-600 text-sm">
                  +91 98765 43210
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <MapPin className="text-green-600" size={18} />
                </div>

                <span className="text-gray-600 text-sm">
                  Bihar, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">
            © 2026 Driksha. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="/privacy-policy"
              className="text-gray-500 hover:text-green-600 transition"
            >
              Privacy Policy
            </a>

            <a
              href="/terms-conditions"
              className="text-gray-500 hover:text-green-600 transition"
            >
              Terms & Conditions
            </a>

            <a
              href="/refund-policy"
              className="text-gray-500 hover:text-green-600 transition"
            >
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;