const plans = [
  {
    title: "Basic",
    subtitle: "Perfect for Small Schools",
    price: "₹999",
    period: "/month",
    popular: false,
    button: "Get Started",
    features: [
      "Student Management",
      "Attendance Tracking",
      "Fee Management",
      "Parent Portal",
      "Email Support",
    ],
  },
  {
    title: "Standard",
    subtitle: "Best for Growing Schools",
    price: "₹2,499",
    period: "/month",
    popular: true,
    button: "Choose Plan",
    features: [
      "Everything in Basic",
      "Examination",
      "Library Management",
      "Transport Module",
      "Reports & Analytics",
      "Priority Support",
    ],
  },
  {
    title: "Premium",
    subtitle: "Advanced School Solution",
    price: "₹4,999",
    period: "/month",
    popular: false,
    button: "Get Premium",
    features: [
      "Everything in Standard",
      "Hostel Management",
      "Payroll & HR",
      "Mobile App",
      "Custom Reports",
      "24×7 Support",
    ],
  },
  {
    title: "Enterprise",
    subtitle: "Custom ERP for Large Institutions",
    price: "Custom",
    period: "",
    popular: false,
    button: "Contact Sales",
    features: [
      "Unlimited Users",
      "Custom Modules",
      "API Integration",
      "Dedicated Account Manager",
      "On-site Training",
      "Premium Support",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">

          <span className="text-red-600 uppercase tracking-[3px] font-semibold">
            Pricing Plan
          </span>

          <h2 className="mt-7 text-4xl md:text-4xl font-bold text-gray-900">
            Flexible Plans for Every School
          </h2>

          <p className="mt-5 text-lg text-gray-600 leading-8">
            Choose the plan that best fits your school's size and requirements.
            Upgrade anytime as your institution grows.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 mt-16 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl bg-white border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular
                  ? "border-green-500 shadow-xl scale-105"
                  : "border-gray-200 hover:border-green-400"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <span className="absolute top-5 right-5 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              {/* Plan Name */}
              <h3 className="text-1xl font-bold text-gray-900">
                {plan.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {plan.subtitle}
              </p>

              {/* Price */}
              <div className="mt-8 flex items-end gap-1">
                <span className="text-3xl font-bold text-gray-900">
                  {plan.price}
                </span>

                <span className="text-gray-500 mb-1">
                  {plan.period}
                </span>
              </div>

              <div className="w-full h-px bg-gray-200 my-8"></div>

              {/* Features */}
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 text-[14px]">
                      check_circle
                    </span>

                    <span className="text-gray-700 text-[14px] leading-6">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`mt-12 w-full py-3 rounded-xl font-semibold transition ${
                  plan.popular
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-green-500 hover:text-white text-gray-800"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}