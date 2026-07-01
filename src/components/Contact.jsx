import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign, FileText } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Submitted:', formData);
  };

  return (
    <section className="min-h-screen bg-slate-50/50 py-18 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center">
          <span className="text-red-600 uppercase tracking-[3px] font-semibold">
            Get In Touch
          </span>
        <h2 className="mt-4 text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          Let's Start a Conversation
        </h2>
        <p className="mt-6 text-base text-slate-500">
          Have questions about admissions, modules, or pricing? Our management support team is just a message away.
        </p><br></br>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          
          {/* Main Info Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex-1 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl group-hover:bg-emerald-100 transition-colors duration-300" />
            
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
              Contact Information
            </h3>

            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Us</p>
                  <a href="mailto:hello@scholara.school" className="text-base font-medium text-slate-700 hover:text-emerald-600 transition-colors">
                    hello@school.edu
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Call Support</p>
                  <a href="tel:+15550102024" className="text-base font-medium text-slate-700 hover:text-emerald-600 transition-colors">
                     000-2026
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Campus Address</p>
                  <p className="text-base font-medium text-slate-700 leading-relaxed">
                    Driksha Infotech Pvt Ltd, Jehanabad, Bihar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notice Card  */}
          <div className="bg-red-50/40 border border-red-100/70 rounded-2xl p-5 flex items-center gap-4">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <p className="text-xs font-medium text-red-800/90 leading-snug">
              <strong>Urgent Query?</strong> For immediate technical support regarding student login errors, please mention "CRITICAL" in the subject line.
            </p>
          </div>

        </div>


        {/* Right Side*/}

        <div className="lg:col-span-7 bg-white border border-slate-100 shadow-xl shadow-slate-100/50 rounded-3xl p-8 sm:p-10 relative">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-slate-400" /> Full Name
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="priya" 
                  className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 text-sm placeholder:text-slate-400"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <AtSign className="w-4 h-4 text-slate-400" /> Official Email
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@school.edu" 
                  className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 text-sm placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-400" /> Subject
              </label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help your department?" 
                className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 text-sm placeholder:text-slate-400"
                required
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-slate-400" /> Message
              </label>
              <textarea 
                rows="4" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your query in detail..." 
                className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 text-sm placeholder:text-slate-400 resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Send Message
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}






