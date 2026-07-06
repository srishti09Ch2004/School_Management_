export default function Topbar({ role = "Admin" }) {
  return (
    <header className="bg-white border-b h-20 flex items-center justify-between px-9">

      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          {role} Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back 
        </p>

      </div>

      <div className="flex items-center gap-9">

        <button className="relative">

          <span className="material-symbols-outlined text-3xl text-gray-600">
            notifications
          </span>

          <span className="absolute -top-0 -right-0 h-1.5 w-1.5 rounded-full bg-red-500"></span>

        </button>

        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-11 h-11 rounded-full"
        />

      </div>

    </header>
  );
}