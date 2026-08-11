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
  Download,
  Trash2,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  Mail,
  MessageSquare,
  Smartphone,
  Globe,
  UserRound,
  MapPin,
  Phone,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

const API =
  "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin";

const SettingsInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  icon: Icon,
  min,
  max,
}) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      {Icon && <Icon size={15} className="text-gray-400" />}
      {label}
    </label>

    <input
      type={type}
      value={value ?? ""}
      min={min}
      max={max}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
    />
  </div>
);

const SettingsSelect = ({
  label,
  value,
  options,
  onChange,
  icon: Icon,
}) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      {Icon && <Icon size={15} className="text-gray-400" />}
      {label}
    </label>

    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-800 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
    >
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

const SectionHeader = ({ icon: Icon, title, description }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
        <Icon size={20} />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  </div>
);

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("school");
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [restoringDatabase, setRestoringDatabase] = useState(false);
  const [creatingBackup, setCreatingBackup] = useState(false);
  const [selectedBackupFile, setSelectedBackupFile] = useState(null);
  const [backupList, setBackupList] = useState([]);
  const [loadingBackups, setLoadingBackups] = useState(false);

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

  const menuItems = [
    { id: "school", name: "School", icon: School, description: "Basic information" },
    { id: "academic", name: "Academic", icon: GraduationCap, description: "Session & classes" },
    { id: "finance", name: "Finance", icon: IndianRupee, description: "Fees & payments" },
    { id: "attendance", name: "Attendance", icon: CalendarDays, description: "Attendance rules" },
    { id: "exam", name: "Exams", icon: FileCheck, description: "Results & grading" },
    { id: "notifications", name: "Notifications", icon: Bell, description: "Alerts & messages" },
    { id: "security", name: "Security", icon: Shield, description: "Password & 2FA" },
    { id: "appearance", name: "Appearance", icon: Palette, description: "Theme settings" },
    { id: "backup", name: "Backup", icon: Database, description: "Database management" },
  ];

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
          parent_app_notification: Boolean(
            Number(system.parent_app_notification ?? 1)
          ),
          password_length: Number(system.password_length ?? 8),
          two_factor_authentication:
            system.two_factor_authentication || "Disabled",
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

  const handleSchoolChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      school: {
        ...prev.school,
        [field]: value,
      },
    }));
  };

  const handleSystemChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      system: {
        ...prev.system,
        [field]: value,
      },
    }));
  };

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

      const response = await fetch(`${API}/listbackups.php`);
      const data = await response.json();

      if (!data.status) {
        alert(data.message || "Failed to load backup list.");
        return;
      }

      setBackupList(data.data?.backups || []);
    } catch (error) {
      console.error("Fetch Backups Error:", error);
      alert("Unable to load backup history.");
    } finally {
      setLoadingBackups(false);
    }
  };

  const createBackup = async () => {
    try {
      setCreatingBackup(true);

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

      await fetchBackups();
    } catch (error) {
      console.error("Backup Error:", error);
      alert("Unable to create database backup.");
    } finally {
      setCreatingBackup(false);
    }
  };

  const restoreDatabase = async () => {
    if (!selectedBackupFile) {
      alert("Please select a database backup file first.");
      return;
    }

    const confirmed = window.confirm(
      "WARNING!\n\nRestoring this backup may replace the current database data.\n\nAre you sure you want to continue?"
    );

    if (!confirmed) return;

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
        `Database restored successfully!\n\nFile: ${
          data.data?.file_name || selectedBackupFile.name
        }`
      );

      setSelectedBackupFile(null);
      await fetchSettings();
      await fetchBackups();
    } catch (error) {
      console.error("Restore Database Error:", error);
      alert("Unable to restore database.");
    } finally {
      setRestoringDatabase(false);
    }
  };

  const deleteBackup = async (backup) => {
    if (!backup?.file_name) {
      alert("Invalid backup file.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete this backup?\n\n${backup.file_name}`
    );

    if (!confirmed) return;

    try {
      const formData = new URLSearchParams();
      formData.append("file_name", backup.file_name);

      const response = await fetch(`${API}/deletebackup.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.status) {
        alert(data.message || "Unable to delete backup.");
        return;
      }

      alert("Backup deleted successfully.");
      await fetchBackups();
    } catch (error) {
      console.error("Delete Backup Error:", error);
      alert("Unable to delete backup.");
    }
  };

  const selectBackupFile = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension !== "sql") {
      alert("Please select a valid .sql backup file.");
      event.target.value = "";
      setSelectedBackupFile(null);
      return;
    }

    setSelectedBackupFile(file);
  };

  const renderSchool = () => (
    <div>
      <SectionHeader
        icon={School}
        title="School Information"
        description="Manage your school's basic profile and contact details."
      />

      <div className="grid md:grid-cols-2 gap-5">
        <SettingsInput
          label="School Name"
          value={settings.school.school_name}
          placeholder="Enter school name"
          icon={School}
          onChange={(value) => handleSchoolChange("school_name", value)}
        />

        <SettingsInput
          label="Principal Name"
          value={settings.school.principal_name}
          placeholder="Enter principal name"
          icon={UserRound}
          onChange={(value) => handleSchoolChange("principal_name", value)}
        />

        <SettingsInput
          label="School Phone"
          type="tel"
          value={settings.school.school_phone}
          placeholder="Enter phone number"
          icon={Phone}
          onChange={(value) => handleSchoolChange("school_phone", value)}
        />

        <SettingsInput
          label="School Email"
          type="email"
          value={settings.school.school_email}
          placeholder="school@example.com"
          icon={Mail}
          onChange={(value) => handleSchoolChange("school_email", value)}
        />

        <SettingsInput
          label="School Website"
          value={settings.school.school_website}
          placeholder="https://example.com"
          icon={Globe}
          onChange={(value) => handleSchoolChange("school_website", value)}
        />

        <SettingsInput
          label="Logo URL"
          value={settings.school.logo}
          placeholder="Enter logo URL"
          icon={Sparkles}
          onChange={(value) => handleSchoolChange("logo", value)}
        />

        <div className="md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <MapPin size={15} className="text-gray-400" />
            School Address
          </label>

          <textarea
            value={settings.school.school_address || ""}
            onChange={(e) =>
              handleSchoolChange("school_address", e.target.value)
            }
            rows={4}
            placeholder="Enter complete school address"
            className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-800 placeholder:text-gray-400 outline-none resize-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
          />
        </div>
      </div>
    </div>
  );

  const renderAcademic = () => (
    <div>
      <SectionHeader
        icon={GraduationCap}
        title="Academic Settings"
        description="Configure academic session, medium, classes and sections."
      />

      <div className="grid md:grid-cols-2 gap-5">
        <SettingsSelect
          label="Academic Session"
          value={settings.system.academic_session}
          options={["2026-27", "2025-26", "2024-25"]}
          icon={CalendarDays}
          onChange={(value) =>
            handleSystemChange("academic_session", value)
          }
        />

        <SettingsSelect
          label="Medium"
          value={settings.system.medium}
          options={["English", "Hindi"]}
          icon={GraduationCap}
          onChange={(value) => handleSystemChange("medium", value)}
        />

        <SettingsInput
          label="Total Classes"
          type="number"
          value={settings.system.total_classes}
          min="1"
          max="100"
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
          placeholder="A, B, C"
          onChange={(value) => handleSystemChange("sections", value)}
        />
      </div>
    </div>
  );

  const renderFinance = () => (
    <div>
      <SectionHeader
        icon={IndianRupee}
        title="Finance Settings"
        description="Manage late fees and payment gateway configuration."
      />

      <div className="grid md:grid-cols-2 gap-5">
        <SettingsInput
          label="Late Fee"
          type="number"
          value={settings.system.late_fee}
          min="0"
          icon={IndianRupee}
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
          icon={IndianRupee}
          onChange={(value) =>
            handleSystemChange("payment_gateway", value)
          }
        />
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div>
      <SectionHeader
        icon={CalendarDays}
        title="Attendance Settings"
        description="Set school timing and minimum attendance requirements."
      />

      <div className="grid md:grid-cols-2 gap-5">
        <SettingsInput
          label="School Start Time"
          type="time"
          value={settings.system.school_start_time}
          icon={Clock3}
          onChange={(value) =>
            handleSystemChange("school_start_time", value)
          }
        />

        <SettingsInput
          label="Minimum Attendance %"
          type="number"
          value={settings.system.minimum_attendance}
          min="0"
          max="100"
          onChange={(value) =>
            handleSystemChange(
              "minimum_attendance",
              value === "" ? "" : Number(value)
            )
          }
        />
      </div>
    </div>
  );

  const renderExam = () => (
    <div>
      <SectionHeader
        icon={FileCheck}
        title="Exam Settings"
        description="Configure passing percentage and grading system."
      />

      <div className="grid md:grid-cols-2 gap-5">
        <SettingsInput
          label="Passing Percentage"
          type="number"
          value={settings.system.passing_percentage}
          min="0"
          max="100"
          icon={FileCheck}
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
          icon={GraduationCap}
          onChange={(value) =>
            handleSystemChange("grade_system", value)
          }
        />
      </div>
    </div>
  );

  const renderNotifications = () => {
    const notificationItems = [
      {
        key: "email_notification",
        name: "Email Notifications",
        description: "Send important school updates through email.",
        icon: Mail,
      },
      {
        key: "sms_notification",
        name: "SMS Notifications",
        description: "Send attendance and important alerts through SMS.",
        icon: MessageSquare,
      },
      {
        key: "parent_app_notification",
        name: "Parent App Notifications",
        description: "Send notifications to parents through the app.",
        icon: Smartphone,
      },
    ];

    return (
      <div>
        <SectionHeader
          icon={Bell}
          title="Notification Settings"
          description="Choose how the school communicates with users."
        />

        <div className="space-y-3">
          {notificationItems.map((item) => {
            const Icon = item.icon;
            const enabled = Boolean(settings.system[item.key]);

            return (
              <div
                key={item.key}
                className={`border rounded-2xl p-5 flex items-center justify-between gap-4 transition ${
                  enabled
                    ? "border-green-200 bg-green-50/40"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      enabled
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleSystemChange(item.key, !enabled)
                  }
                  className={`relative w-12 h-7 rounded-full transition shrink-0 ${
                    enabled ? "bg-green-600" : "bg-gray-300"
                  }`}
                  aria-label={`Toggle ${item.name}`}
                >
                  <span
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition ${
                      enabled ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSecurity = () => (
    <div>
      <SectionHeader
        icon={Shield}
        title="Security Settings"
        description="Manage password requirements and two-factor authentication."
      />

      <div className="grid md:grid-cols-2 gap-5">
        <SettingsInput
          label="Minimum Password Length"
          type="number"
          value={settings.system.password_length}
          min="4"
          max="32"
          icon={LockKeyhole}
          onChange={(value) =>
            handleSystemChange(
              "password_length",
              value === "" ? "" : Number(value)
            )
          }
        />

        <SettingsSelect
          label="Two-Factor Authentication"
          value={settings.system.two_factor_authentication}
          options={["Enabled", "Disabled"]}
          icon={Shield}
          onChange={(value) =>
            handleSystemChange("two_factor_authentication", value)
          }
        />
      </div>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 flex gap-3">
        <Shield className="text-blue-600 shrink-0" size={20} />
        <div>
          <p className="font-semibold text-blue-800">Security tip</p>
          <p className="text-sm text-blue-700 mt-1">
            Use a strong password policy and enable 2FA when the backend
            authentication flow supports it.
          </p>
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => {
    const colors = [
      {
        name: "Blue",
        preview: "bg-blue-500",
        soft: "bg-blue-50",
        text: "text-blue-600",
      },
      {
        name: "Green",
        preview: "bg-green-500",
        soft: "bg-green-50",
        text: "text-green-600",
      },
      {
        name: "Purple",
        preview: "bg-purple-500",
        soft: "bg-purple-50",
        text: "text-purple-600",
      },
    ];

    return (
      <div>
        <SectionHeader
          icon={Palette}
          title="Appearance"
          description="Choose the preferred theme color for the school system."
        />

        <div className="grid sm:grid-cols-3 gap-4">
          {colors.map((color) => {
            const selected =
              settings.system.theme_color === color.name;

            return (
              <button
                key={color.name}
                type="button"
                onClick={() =>
                  handleSystemChange("theme_color", color.name)
                }
                className={`text-left border rounded-2xl p-5 transition ${
                  selected
                    ? "border-green-500 ring-4 ring-green-500/10 bg-green-50/30"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div
                  className={`w-full h-16 rounded-xl ${color.soft} flex items-center px-4`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg ${color.preview}`}
                  />
                  <div
                    className={`ml-3 h-3 w-24 rounded-full ${color.preview} opacity-30`}
                  />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="font-semibold text-gray-800">
                    {color.name}
                  </span>

                  {selected && (
                    <CheckCircle2
                      size={19}
                      className={color.text}
                    />
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {selected ? "Currently selected" : "Select theme"}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderBackup = () => (
    <div className="space-y-6">
      <SectionHeader
        icon={Database}
        title="Database Backup & Restore"
        description="Create, download, restore and manage your school database backups."
      />

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
              <Database size={22} />
            </div>

            <div>
              <h3 className="font-bold text-gray-800">
                Create Backup
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Create a fresh copy of your current school database.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={createBackup}
            disabled={creatingBackup || restoringDatabase}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Database size={18} />
            {creatingBackup ? "Creating Backup..." : "Create Backup"}
          </button>
        </div>

        <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Upload size={22} />
            </div>

            <div>
              <h3 className="font-bold text-gray-800">
                Restore Database
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Restore your database from a previous .sql backup.
              </p>
            </div>
          </div>

          <label
            className={`mt-6 block cursor-pointer border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-2xl p-5 text-center transition ${
              restoringDatabase
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
          >
            <Upload
              size={24}
              className="mx-auto text-gray-400"
            />

            <p className="text-sm font-semibold text-gray-700 mt-2">
              Select SQL Backup File
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Only .sql files are allowed
            </p>

            <input
              type="file"
              accept=".sql"
              className="hidden"
              disabled={restoringDatabase}
              onChange={selectBackupFile}
            />
          </label>

          {selectedBackupFile && (
            <div className="mt-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-gray-500">
                Selected File
              </p>

              <p className="text-sm font-semibold text-gray-800 mt-1 break-all">
                {selectedBackupFile.name}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {(selectedBackupFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={restoreDatabase}
            disabled={!selectedBackupFile || restoringDatabase}
            className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {restoringDatabase
              ? "Restoring Database..."
              : "Restore Database"}
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-start gap-3">
        <AlertTriangle
          size={21}
          className="text-yellow-600 shrink-0 mt-0.5"
        />

        <div>
          <p className="font-semibold text-yellow-800">
            Important
          </p>
          <p className="text-sm text-yellow-700 mt-1">
            Restoring a database backup may replace existing school
            data. Always create a fresh backup before restoring an
            older backup.
          </p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Backup History
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Previously created database backups.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-semibold">
              {backupList.length} Backup
              {backupList.length !== 1 ? "s" : ""}
            </span>

            <button
              type="button"
              onClick={fetchBackups}
              disabled={loadingBackups}
              className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-500 transition disabled:opacity-50"
              title="Refresh backups"
            >
              <RefreshCw
                size={16}
                className={loadingBackups ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        {loadingBackups ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto" />
              <p className="text-sm text-gray-500 mt-4">
                Loading backup history...
              </p>
            </div>
          </div>
        ) : backupList.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto">
              <Database
                size={28}
                className="text-gray-300"
              />
            </div>

            <p className="font-semibold text-gray-700 mt-4">
              No backups found
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Create your first database backup above.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {backupList.map((backup) => (
              <div
                key={backup.file_name}
                className="border border-gray-200 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 hover:border-green-200 hover:bg-gray-50 transition"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-11 h-11 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                    <Database size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 break-all">
                      {backup.file_name}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {backup.file_size_kb} KB
                      <span className="mx-2">•</span>
                      {backup.created_at}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        `${API}/downloadbackup.php?file=${encodeURIComponent(
                          backup.file_name
                        )}`,
                        "_blank"
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition"
                  >
                    <Download size={16} />
                    Download
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteBackup(backup)}
                    className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "school":
        return renderSchool();
      case "academic":
        return renderAcademic();
      case "finance":
        return renderFinance();
      case "attendance":
        return renderAttendance();
      case "exam":
        return renderExam();
      case "notifications":
        return renderNotifications();
      case "security":
        return renderSecurity();
      case "appearance":
        return renderAppearance();
      case "backup":
        return renderBackup();
      default:
        return renderSchool();
    }
  };

  const activeMenu = menuItems.find(
    (item) => item.id === activeTab
  );

  return (
    <div className="min-h-full space-y-6">
      {/* PAGE HEADER */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <span>Admin</span>
            <span>/</span>
            <span className="text-gray-600">Settings</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            School Settings
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Manage your school configuration, security and database.
          </p>
        </div>

        {activeTab !== "backup" && (
          <button
            type="button"
            onClick={saveSettings}
            disabled={savingSettings || loadingSettings}
            className="w-full lg:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {savingSettings ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>

      {/* MAIN SETTINGS LAYOUT */}
      <div className="grid lg:grid-cols-[270px_minmax(0,1fr)] gap-6 items-start">
        {/* SIDEBAR */}
        <aside className="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 lg:sticky lg:top-4">
          <div className="px-3 pt-2 pb-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Configuration
            </p>
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition ${
                    active
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      active
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-50 text-gray-500"
                    }`}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold">
                      {item.name}
                    </p>
                    <p
                      className={`text-[11px] mt-0.5 truncate ${
                        active
                          ? "text-green-600/70"
                          : "text-gray-400"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* CONTENT */}
        <main className="bg-white rounded-3xl p-5 md:p-7 shadow-sm border border-gray-100 min-h-[500px]">
          {/* CONTENT TOP BAR */}
          <div className="flex items-center justify-between gap-3 pb-5 mb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {activeMenu && (
                <>
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                    <activeMenu.icon size={20} />
                  </div>

                  <div>
                    <p className="font-bold text-gray-800">
                      {activeMenu.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {activeMenu.description}
                    </p>
                  </div>
                </>
              )}
            </div>

            {activeTab !== "backup" && !loadingSettings && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-full">
                <CheckCircle2 size={14} />
                Ready to edit
              </div>
            )}
          </div>

          {loadingSettings ? (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="w-9 h-9 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto" />
                <p className="text-sm text-gray-500 mt-4">
                  Loading settings...
                </p>
              </div>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>
    </div>
  );
}