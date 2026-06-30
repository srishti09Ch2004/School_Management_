import { useState } from "react";

const faqs = [
  {
    question: "How do I log in to my dashboard?",
    answer:
      "Click the Login button and choose your role. Enter your username and password to securely access your dashboard.",
  },
  {
    question: "Can parents monitor their child's progress?",
    answer:
      "Yes. Parents can track attendance, homework, exam results, notices and fee status from their dashboard.",
  },
  {
    question: "Is student and school data secure?",
    answer:
      "Absolutely. We use secure authentication, encrypted connections and role-based access to protect school data.",
  },
  {
    question: "Can I use the system on mobile phones?",
    answer:
      "Yes. The system works smoothly on mobiles, tablets, laptops and desktop devices without installing any app.",
  },
  {
    question: "How can fees be paid online?",
    answer:
      "Parents can securely pay fees using UPI, Debit Card, Credit Card or Net Banking with instant payment confirmation.",
  },
  {
    question: "Can teachers manage attendance and marks?",
    answer:
      "Yes. Teachers can easily manage attendance, upload marks, assign homework and communicate with parents.",
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
          </p>

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