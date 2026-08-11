import { useEffect, useState } from "react";
import {
  Save,
  School,
  GraduationCap,
  IndianRupee,
  CalendarDays,
  FileCheck,
  Bell,
  Shield,
  Palette,
  Database,
} from "lucide-react";

const API = "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin";


const SettingsInput = ({ label, type = "text", value, onChange }) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};


const SettingsSelect = ({ label, value, options, onChange }) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 bg-white"
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

// MAIN COMPONENT

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("school");
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [restoringDatabase, setRestoringDatabase] = useState(false);
  const [selectedBackupFile, setSelectedBackupFile] = useState(null);
  const [backupList, setBackupList] = useState([]);
  const [loadingBackups, setLoadingBackups] = useState(false);

  // SETTINGS STATE
 
  const [settings, setSettings] = useState({
    school: {
      school_name: "",
      school_address: "",
      school_phone: "",
      school_email: "",
      school_website: "",
      principal_name: "",
      logo: "",
    },
    system: {
      academic_session: "2026-27",
      medium: "English",
      total_classes: 12,
      sections: "A, B, C",
      late_fee: 100,
      payment_gateway: "Razorpay",
      school_start_time: "08:00",
      minimum_attendance: 75,
      passing_percentage: 33,
      grade_system: "A+ to F",
      email_notification: true,
      sms_notification: true,
      parent_app_notification: true,
      password_length: 8,
      two_factor_authentication: "Disabled",
      theme_color: "Green",
    },
  });

  // GET SETTINGS

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
  if (activeTab === "backup") {
    fetchBackups();
  }
}, [activeTab]);

  const fetchSettings = async () => {
    try {
      setLoadingSettings(true);
      const response = await fetch(`${API}/getsettings.php`);
      const data = await response.json();

      if (!data.status) {
        alert(data.message || "Failed to load settings.");
        return;
      }

      const school = data.data?.school || {};
      const system = data.data?.system || {};

      setSettings({
        school: {
          school_name: school.school_name || "",
          school_address: school.school_address || "",
          school_phone: school.school_phone || "",
          school_email: school.school_email || "",
          school_website: school.school_website || "",
          principal_name: school.principal_name || "",
          logo: school.logo || "",
        },
        system: {
          academic_session: system.academic_session || "2026-27",
          medium: system.medium || "English",
          total_classes: Number(system.total_classes ?? 12),
          sections: system.sections || "",
          late_fee: Number(system.late_fee ?? 100),
          payment_gateway: system.payment_gateway || "Razorpay",
          school_start_time: system.school_start_time || "08:00",
          minimum_attendance: Number(system.minimum_attendance ?? 75),
          passing_percentage: Number(system.passing_percentage ?? 33),
          grade_system: system.grade_system || "A+ to F",
          email_notification: Boolean(Number(system.email_notification ?? 1)),
          sms_notification: Boolean(Number(system.sms_notification ?? 1)),
          parent_app_notification: Boolean(Number(system.parent_app_notification ?? 1)),
          password_length: Number(system.password_length ?? 8),
          two_factor_authentication: system.two_factor_authentication || "Disabled",
          theme_color: system.theme_color || "Green",
        },
      });
    } catch (error) {
      console.error("Get Settings Error:", error);
      alert("Unable to load settings.");
    } finally {
      setLoadingSettings(false);
    }
  };

  // SCHOOL CHANGE
  
  const handleSchoolChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      school: {
        ...prev.school,
        [field]: value,
      },
    }));
  };

  // SYSTEM CHANGE

  const handleSystemChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      system: {
        ...prev.system,
        [field]: value,
      },
    }));
  };

  // SAVE SETTINGS

  const saveSettings = async () => {
    try {
      setSavingSettings(true);
      const response = await fetch(`${API}/updatesettings.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (!data.status) {
        alert(data.message || "Failed to update settings.");
        return;
      }

      alert("Settings updated successfully.");
      await fetchSettings();
    } catch (error) {
      console.error("Update Settings Error:", error);
      alert("Unable to update settings.");
    } finally {
      setSavingSettings(false);
    }
  };


  const fetchBackups = async () => {
  try {
    setLoadingBackups(true);

    const response = await fetch(
      `${API}/listbackups.php`
    );

    const data = await response.json();

    console.log("Backup List Response:", data);

    if (!data.status) {
      alert(
        data.message ||
          "Failed to load backup list."
      );

      return;
    }

    setBackupList(
      data.data?.backups || []
    );

  } catch (error) {

    console.error(
      "Fetch Backups Error:",
      error
    );

    alert(
      "Unable to load backup history."
    );

  } finally {

    setLoadingBackups(false);

  }
};
  // MENU ITEMS

  const menuItems = [
    { id: "school", name: "School", icon: School },
    { id: "academic", name: "Academic", icon: GraduationCap },
    { id: "finance", name: "Finance", icon: IndianRupee },
    { id: "attendance", name: "Attendance", icon: CalendarDays },
    { id: "exam", name: "Exams", icon: FileCheck },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Security", icon: Shield },
    { id: "appearance", name: "Appearance", icon: Palette },
    { id: "backup", name: "Backup", icon: Database },
  ];

  // RESTORE DATABASE

  const restoreDatabase = async () => {
    if (!selectedBackupFile) {
      alert("Please select a database backup file first.");
      return;
    }

    const confirmed = window.confirm(
      "WARNING!\n\nRestoring this backup may replace the current database data.\n\nAre you sure you want to continue?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setRestoringDatabase(true);
      const formData = new FormData();
      formData.append("backup_file", selectedBackupFile);

      const response = await fetch(`${API}/restoredatabase.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.status) {
        alert(data.message || "Database restore failed.");
        return;
      }

      alert(
        "Database restored successfully!\n\n" +
          "File: " +
          (data.data?.file_name || selectedBackupFile.name)
      );

      setSelectedBackupFile(null);
      await fetchSettings();
    } catch (error) {
      console.error("Restore Database Error:", error);
      alert("Unable to restore database.");
    } finally {
      setRestoringDatabase(false);
    }
  };

  // RENDER CONTENT

  const renderContent = () => {

    if (activeTab === "school") {
      return (
        <div className="grid md:grid-cols-2 gap-5">
          <SettingsInput
            label="School Name"
            value={settings.school.school_name}
            onChange={(value) => handleSchoolChange("school_name", value)}
          />
          <SettingsInput
            label="School Phone"
            type="tel"
            value={settings.school.school_phone}
            onChange={(value) => handleSchoolChange("school_phone", value)}
          />
          <SettingsInput
            label="School Email"
            type="email"
            value={settings.school.school_email}
            onChange={(value) => handleSchoolChange("school_email", value)}
          />
          <SettingsInput
            label="School Website"
            value={settings.school.school_website}
            onChange={(value) => handleSchoolChange("school_website", value)}
          />
          <SettingsInput
            label="Principal Name"
            value={settings.school.principal_name}
            onChange={(value) => handleSchoolChange("principal_name", value)}
          />
          <SettingsInput
            label="Logo"
            value={settings.school.logo}
            onChange={(value) => handleSchoolChange("logo", value)}
          />
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              School Address
            </label>
            <textarea
              value={settings.school.school_address || ""}
              onChange={(e) =>
                handleSchoolChange("school_address", e.target.value)
              }
              rows={4}
              className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>
        </div>
      );
    }

    // ====================================================
    // ACADEMIC
    // ====================================================
    if (activeTab === "academic") {
      return (
        <div className="grid md:grid-cols-2 gap-5">
          <SettingsSelect
            label="Session"
            value={settings.system.academic_session}
            options={["2026-27", "2025-26", "2024-25"]}
            onChange={(value) =>
              handleSystemChange("academic_session", value)
            }
          />
          <SettingsSelect
            label="Medium"
            value={settings.system.medium}
            options={["English", "Hindi"]}
            onChange={(value) => handleSystemChange("medium", value)}
          />
          <SettingsInput
            label="Total Classes"
            type="number"
            value={settings.system.total_classes}
            onChange={(value) =>
              handleSystemChange(
                "total_classes",
                value === "" ? "" : Number(value)
              )
            }
          />
          <SettingsInput
            label="Sections"
            value={settings.system.sections}
            onChange={(value) => handleSystemChange("sections", value)}
          />
        </div>
      );
    }

    if (activeTab === "finance") {
      return (
        <div className="grid md:grid-cols-2 gap-5">
          <SettingsInput
            label="Late Fee"
            type="number"
            value={settings.system.late_fee}
            onChange={(value) =>
              handleSystemChange(
                "late_fee",
                value === "" ? "" : Number(value)
              )
            }
          />
          <SettingsSelect
            label="Payment Gateway"
            value={settings.system.payment_gateway}
            options={["Razorpay", "Paytm", "Cash", "Bank Transfer"]}
            onChange={(value) => handleSystemChange("payment_gateway", value)}
          />
        </div>
      );
    }

    if (activeTab === "attendance") {
      return (
        <div className="grid md:grid-cols-2 gap-5">
          <SettingsInput
            label="School Start Time"
            type="time"
            value={settings.system.school_start_time}
            onChange={(value) =>
              handleSystemChange("school_start_time", value)
            }
          />
          <SettingsInput
            label="Minimum Attendance %"
            type="number"
            value={settings.system.minimum_attendance}
            onChange={(value) =>
              handleSystemChange(
                "minimum_attendance",
                value === "" ? "" : Number(value)
              )
            }
          />
        </div>
      );
    }


    if (activeTab === "exam") {
      return (
        <div className="grid md:grid-cols-2 gap-5">
          <SettingsInput
            label="Passing Percentage"
            type="number"
            value={settings.system.passing_percentage}
            onChange={(value) =>
              handleSystemChange(
                "passing_percentage",
                value === "" ? "" : Number(value)
              )
            }
          />
          <SettingsSelect
            label="Grade System"
            value={settings.system.grade_system}
            options={["A+ to F", "CGPA"]}
            onChange={(value) => handleSystemChange("grade_system", value)}
          />
        </div>
      );
    }

    if (activeTab === "notifications") {
      const notificationItems = [
        {
          key: "email_notification",
          name: "Email",
          description: "Enable Email notifications",
        },
        {
          key: "sms_notification",
          name: "SMS",
          description: "Enable SMS notifications",
        },
        {
          key: "parent_app_notification",
          name: "Parent App",
          description: "Enable Parent App notifications",
        },
      ];

      return (
        <div className="space-y-4">
          {notificationItems.map((item) => (
            <div
              key={item.key}
              className="border border-gray-100 rounded-2xl p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {item.description}
                </p>
              </div>
              <input
                type="checkbox"
                checked={Boolean(settings.system[item.key])}
                onChange={(e) =>
                  handleSystemChange(item.key, e.target.checked)
                }
                className="w-5 h-5 accent-green-600 cursor-pointer"
              />
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === "security") {
      return (
        <div className="grid md:grid-cols-2 gap-5">
          <SettingsInput
            label="Password Length"
            type="number"
            value={settings.system.password_length}
            onChange={(value) =>
              handleSystemChange(
                "password_length",
                value === "" ? "" : Number(value)
              )
            }
          />
          <SettingsSelect
            label="Two Factor Authentication"
            value={settings.system.two_factor_authentication}
            options={["Enabled", "Disabled"]}
            onChange={(value) =>
              handleSystemChange("two_factor_authentication", value)
            }
          />
        </div>
      );
    }

    if (activeTab === "appearance") {
      const colors = ["Blue", "Green", "Purple"];

      return (
        <div className="grid md:grid-cols-3 gap-5">
          {colors.map((color) => {
            const selected = settings.system.theme_color === color;

            return (
              <button
                key={color}
                type="button"
                onClick={() => handleSystemChange("theme_color", color)}
                className={`border rounded-2xl p-6 transition ${
                  selected
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-green-500"
                }`}
              >
                <div className="font-semibold">{color}</div>
                {selected && <p className="text-xs mt-1">Selected</p>}
              </button>
            );
          })}
        </div>
      );
    }

    if (activeTab === "backup") {
      return (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-800">
            Database Backup & Restore
          </h3>
          <p className="text-gray-500 mt-2">
            Create a backup of your school database or restore the database from
            a previous backup.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              type="button"
              onClick={async () => {
                try {
                  const response = await fetch(`${API}/backupdatabase.php`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });

                  const data = await response.json();

                  if (!data.status) {
                    alert(data.message || "Backup failed.");
                    return;
                  }

                  alert(
                    `Backup created successfully!\n\nFile: ${
                      data.data?.file_name || "Backup file"
                    }\nSize: ${data.data?.file_size || "Unknown"}`
                  );
                } catch (error) {
                  console.error("Backup Error:", error);
                  alert("Unable to create database backup.");
                }
              }}
              disabled={restoringDatabase}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition disabled:opacity-50"
            >
              Create Backup
            </button>

            <label
              className={`cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition ${
                restoringDatabase ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              Select Backup File
              <input
                type="file"
                accept=".sql"
                className="hidden"
                disabled={restoringDatabase}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) {
                    return;
                  }

                  const extension = file.name
                    .split(".")
                    .pop()
                    ?.toLowerCase();

                  if (extension !== "sql") {
                    alert("Please select a valid .sql backup file.");
                    e.target.value = "";
                    setSelectedBackupFile(null);
                    return;
                  }

                  setSelectedBackupFile(file);
                }}
              />
            </label>

            <button
              type="button"
              onClick={restoreDatabase}
              disabled={!selectedBackupFile || restoringDatabase}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {restoringDatabase ? "Restoring..." : "Restore Database"}
            </button>
          </div>

          {selectedBackupFile && (
            <div className="mt-5 bg-white border border-gray-200 rounded-2xl p-4">
              <p className="text-sm font-semibold text-gray-800">
                Selected Backup
              </p>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  File:{" "}
                  <span className="font-medium">{selectedBackupFile.name}</span>
                </p>
                <p className="mt-1">
                  Size: {(selectedBackupFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}

          <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <p className="text-sm font-semibold text-yellow-800">Important</p>
            <p className="text-sm text-yellow-700 mt-1">
              Restoring a database backup can change existing school data.
              Always create a fresh backup before restoring an older backup.
            </p>
          </div>

          {/* BACKUP HISTORY */}

<div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5">

  <div className="flex items-center justify-between">

    <div>
      <h3 className="text-lg font-bold text-gray-800">
        Backup History
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Previously created database backups
      </p>
    </div>

    <span className="text-sm font-medium text-gray-600">
      {backupList.length} Backup
      {backupList.length !== 1 ? "s" : ""}
    </span>

  </div>


  {/* LOADING */}

  {loadingBackups ? (

    <div className="flex items-center justify-center py-10">

      <div className="text-center">

        <div className="w-7 h-7 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto" />

        <p className="text-sm text-gray-500 mt-3">
          Loading backup history...
        </p>

      </div>

    </div>

  ) : backupList.length === 0 ? (

    /* NO BACKUPS */

    <div className="text-center py-10">

      <Database
        size={35}
        className="mx-auto text-gray-300"
      />

      <p className="text-sm text-gray-500 mt-3">
        No database backups found.
      </p>

    </div>

  ) : (

    /* BACKUP LIST */

    <div className="mt-5 space-y-3">

      {backupList.map((backup) => (

        <div
          key={backup.file_name}
          className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:bg-gray-50 transition"
        >

          {/* FILE INFORMATION */}

          <div className="flex items-start gap-3">

            <div className="bg-green-50 text-green-600 p-3 rounded-xl">
              <Database size={20} />
            </div>

            <div>

              <p className="font-semibold text-gray-800 break-all">
                {backup.file_name}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {backup.file_size_kb} KB
                {" • "}
                {backup.created_at}
              </p>

            </div>

          </div>


          {/* DOWNLOAD BUTTON */}

          <button
            type="button"
            onClick={() => {
              window.open(
                `${API}/downloadbackup.php?file=${encodeURIComponent(
                  backup.file_name
                )}`,
                "_blank"
              );
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
          >
            Download
          </button>

        </div>

      ))}

    </div>

  )}

</div>

        </div>
      );
    }

    return null;
  };


  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">School Settings</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage your school configuration.
          </p>
        </div>
        <button
          type="button"
          onClick={saveSettings}
          disabled={savingSettings || loadingSettings}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={18} />
          {savingSettings ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        {/* SIDEBAR */}
        <div className="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 h-fit">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition ${
                  active
                    ? "bg-green-50 text-green-600"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </div>

        {/* SETTINGS CONTENT */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 min-h-[300px]">
          {loadingSettings ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto" />
                <p className="text-sm text-gray-500 mt-4">
                  Loading settings...
                </p>
              </div>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </div>
  );
}