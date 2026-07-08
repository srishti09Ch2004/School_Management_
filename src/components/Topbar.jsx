
export default function Topbar({
role = "Admin",
title = "Dashboard",
}) {
return ( <header className="bg-white h-20 border-b border-gray-100 shadow-sm flex items-center justify-between px-18">

  <div>
    <h1 className="text-2xl font-bold text-gray-700">
      {title}
    </h1>

    <p className="text-gray-500">
      Welcome back, {role}
    </p>
  </div>

  <div className="flex items-center gap-6">

    <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2">
      <span className="material-symbols-outlined text-gray-500">
        search
      </span>

      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none ml-2"
      />
    </div>

    <button className="relative">
      <span className="material-symbols-outlined text-2xl">
        notifications
      </span>

      <span className="absolute -top-0 -right-0 w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
        3
      </span>
    </button>

    <div className="flex items-center gap-3">
      <img
        src="https://i.pravatar.cc/100"
        alt="profile"
        className="w-11 h-11 rounded-full"
      />

      <div className="hidden md:block">
        <h4 className="font-semibold">
          {role}
        </h4>

        <p className="text-xs text-gray-500">
          Future Academy
        </p>
      </div>
    </div>

  </div>
</header>


);
}
