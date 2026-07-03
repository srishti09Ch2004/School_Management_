import { useState } from "react";

const faqs = [
  {
    question: "What is School ERP?",
    answer:
      "School ERP is an all-in-one school management system that helps manage admissions, attendance, fees, examinations, communication, and academic activities from a single platform.",
  },
  {
    question: "How can I book a demo?",
    answer:
      "You can request a free demo by filling out the demo request form on our website. Our team will contact you to schedule a personalized demonstration.",
  },
  {
    question: "Is training provided?",
    answer:
      "Yes. We provide complete onboarding and training sessions for administrators, teachers, and staff to ensure a smooth implementation.",
  },
  {
    question: "Can parents use the mobile app?",
    answer:
      "Yes. Parents can use the mobile app to check attendance, homework, exam results, notices, fee status, and communicate with the school anytime.",
  },
  {
    question: "Is online fee payment available?",
    answer:
      "Yes. The system supports secure online fee payments through UPI, Debit Cards, Credit Cards, Net Banking, and other supported payment methods.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. Your data is protected using encrypted connections, secure authentication, regular backups, and role-based access control.",
  },
  {
    question: "Can I customize the software?",
    answer:
      "Yes. The software can be customized to match your school's workflows, branding, modules, and specific operational requirements.",
  },
  {
    question: "Do you provide support?",
    answer:
      "Yes. Our dedicated support team is available to assist you with technical issues, product guidance, and ongoing maintenance whenever needed.",
  },
];


export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-24 bg-white">

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">
          

          <h2 className="text-5xl font-bold mt-5 text-gray-900">
            Got Questions?
          </h2>

          <p className="text-gray-500 mt-5 text-lg">
            Everything you need to know before getting started.
          </p><br></br>

        </div>

        {/* FAQ */}

        <div className="space-y-6">

          {faqs.map((faq, index) => {

            const active = open === index;

            return (

              <div
                key={index}
                className={`rounded-3xl border transition-all duration-500 overflow-hidden
                ${
                  active
                    ? "border-green-500 shadow-xl"
                    : "border-gray-200 hover:border-red-300"
                }`}
              >

                <button
                  onClick={() =>
                    setOpen(active ? -1 : index)
                  }
                  className="w-full flex justify-between items-center p-7 text-left"
                >

                  <div className="flex items-center gap-4">

                   <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition
                        ${
                            active
                            ? "bg-green-500 text-white"
                            : "bg-red-100 text-red-600"
                        }`}
                        >
                        <span className="material-symbols-outlined text-2xl">
                             quiz
                        </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900">
                      {faq.question}
                    </h3>

                  </div>

                  <span
                    className={`material-symbols-outlined text-3xl transition duration-500
                    ${
                      active
                        ? "rotate-180 text-green-500"
                        : "text-red-600"
                    }`}
                  >
                    keyboard_arrow_down
                  </span>

                </button>

                <div
                  className={`grid transition-all duration-500 ${
                    active
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >

                  <div className="overflow-hidden">

                    <p className="px-7 pb-7 pl-[92px] text-gray-600 leading-8">
                      {faq.answer}
                    </p>

                  </div>

                </div>

              </div>

            );
          })}
        </div>

      </div>

    </section>
  );
}