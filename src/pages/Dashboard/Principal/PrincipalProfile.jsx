import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  Droplets,
  Shield,
  Camera,
  Pencil,
  X,
  Save,
  Loader2,
} from "lucide-react";

import toast from "react-hot-toast";

const API =
  "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/principal";

const emptyForm = {
  full_name: "",
  email: "",
  phone: "",
  qualification: "",
  experience: "",
  joining_date: "",
  dob: "",
  emergency_contact: "",
  blood_group: "",
  address: "",
};

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function PrincipalProfile() {
  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState(null);

  const [form, setForm] =
    useState(emptyForm);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [editing, setEditing] =
    useState(false);

  const [selectedPhoto, setSelectedPhoto] =
    useState(null);

  const [photoPreview, setPhotoPreview] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Get Logged-in User
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    try {
      const storedUser =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!storedUser?.id) {
        toast.error(
          "Principal login information not found."
        );

        setLoading(false);
        return;
      }

      setUser(storedUser);

    } catch (error) {
      console.error(
        "Principal user error:",
        error
      );

      toast.error(
        "Unable to load principal information."
      );

      setLoading(false);
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Fetch Profile
  |--------------------------------------------------------------------------
  */

  const loadProfile = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${API}/profile.php?user_id=${user.id}`,
        {
          cache: "no-store",
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.status
      ) {
        throw new Error(
          result.message ||
            "Unable to load profile."
        );
      }

      setProfile(result.data);

      setForm({
        full_name:
          result.data.full_name || "",

        email:
          result.data.email || "",

        phone:
          result.data.phone || "",

        qualification:
          result.data.qualification || "",

        experience:
          result.data.experience || "",

        joining_date:
          result.data.joining_date || "",

        dob:
          result.data.dob || "",

        emergency_contact:
          result.data.emergency_contact || "",

        blood_group:
          result.data.blood_group || "",

        address:
          result.data.address || "",
      });

      if (
        result.data.profile_photo_url
      ) {
        setPhotoPreview(
          result.data.profile_photo_url
        );
      } else {
        setPhotoPreview("");
      }

    } catch (error) {
      console.error(
        "Principal profile error:",
        error
      );

      toast.error(
        error.message ||
          "Unable to load profile."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user]);

  /*
  |--------------------------------------------------------------------------
  | Input Change
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Photo Select
  |--------------------------------------------------------------------------
  */

  const handlePhotoChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      toast.error(
        "Only JPG, PNG and WEBP images are allowed."
      );

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      toast.error(
        "Profile photo must be less than 5 MB."
      );

      return;
    }

    setSelectedPhoto(file);

    const preview =
      URL.createObjectURL(file);

    setPhotoPreview(preview);
  };

  /*
  |--------------------------------------------------------------------------
  | Save Profile
  |--------------------------------------------------------------------------
  */

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error(
        "Principal user not found."
      );

      return;
    }

    if (!form.full_name.trim()) {
      toast.error(
        "Full name is required."
      );

      return;
    }

    if (!form.email.trim()) {
      toast.error(
        "Email is required."
      );

      return;
    }

    try {
      setSaving(true);

      const formData =
        new FormData();

      formData.append(
        "user_id",
        user.id
      );

      formData.append(
        "full_name",
        form.full_name.trim()
      );

      formData.append(
        "email",
        form.email.trim()
      );

      formData.append(
        "phone",
        form.phone.trim()
      );

      formData.append(
        "qualification",
        form.qualification.trim()
      );

      formData.append(
        "experience",
        form.experience.trim()
      );

      formData.append(
        "joining_date",
        form.joining_date
      );

      formData.append(
        "dob",
        form.dob
      );

      formData.append(
        "emergency_contact",
        form.emergency_contact.trim()
      );

      formData.append(
        "blood_group",
        form.blood_group.trim()
      );

      formData.append(
        "address",
        form.address.trim()
      );

      if (selectedPhoto) {
        formData.append(
          "profile_photo",
          selectedPhoto
        );
      }

      const response =
        await fetch(
          `${API}/updateProfile.php`,
          {
            method: "POST",
            body: formData,
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.status
      ) {
        throw new Error(
          result.message ||
            "Profile update failed."
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Update Screen
      |--------------------------------------------------------------------------
      */

      setProfile(result.data);

      /*
      |--------------------------------------------------------------------------
      | Update localStorage user
      |--------------------------------------------------------------------------
      */

      const updatedUser = {
        ...user,
        full_name:
          result.data.full_name,
        email:
          result.data.email,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(
          updatedUser
        )
      );

      setUser(updatedUser);

      setSelectedPhoto(null);

      if (
        result.data.profile_photo_url
      ) {
        setPhotoPreview(
          result.data.profile_photo_url +
            `?t=${Date.now()}`
        );
      }

      setEditing(false);

      toast.success(
        "Profile updated successfully."
      );

    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      toast.error(
        error.message ||
          "Unable to update profile."
      );

    } finally {
      setSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Cancel Editing
  |--------------------------------------------------------------------------
  */

  const handleCancel = () => {
    if (!profile) return;

    setForm({
      full_name:
        profile.full_name || "",

      email:
        profile.email || "",

      phone:
        profile.phone || "",

      qualification:
        profile.qualification || "",

      experience:
        profile.experience || "",

      joining_date:
        profile.joining_date || "",

      dob:
        profile.dob || "",

      emergency_contact:
        profile.emergency_contact || "",

      blood_group:
        profile.blood_group || "",

      address:
        profile.address || "",
    });

    setSelectedPhoto(null);

    if (
      profile.profile_photo_url
    ) {
      setPhotoPreview(
        profile.profile_photo_url
      );
    } else {
      setPhotoPreview("");
    }

    setEditing(false);
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-50">
            <Loader2
              size={25}
              className="animate-spin text-purple-600"
            />
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Loading Principal Profile...
          </p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Profile Not Found
  |--------------------------------------------------------------------------
  */

  if (!profile) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
        <User
          size={40}
          className="mx-auto text-gray-300"
        />

        <h3 className="mt-4 text-lg font-semibold text-gray-800">
          Principal profile not found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Please contact the administrator.
        </p>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Information Cards
  |--------------------------------------------------------------------------
  */

  const information = [
    {
      label: "Email",
      value: profile.email || "-",
      icon: Mail,
      color: "text-blue-600",
    },
    {
      label: "Contact Number",
      value: profile.phone || "-",
      icon: Phone,
      color: "text-green-600",
    },
    {
      label: "Qualification",
      value:
        profile.qualification || "-",
      icon: GraduationCap,
      color: "text-purple-600",
    },
    {
      label: "Experience",
      value:
        profile.experience || "-",
      icon: Briefcase,
      color: "text-orange-600",
    },
    {
      label: "Joining Date",
      value:
        formatDate(
          profile.joining_date
        ),
      icon: Calendar,
      color: "text-cyan-600",
    },
    {
      label: "Date of Birth",
      value:
        formatDate(profile.dob),
      icon: Calendar,
      color: "text-pink-600",
    },
    {
      label: "Blood Group",
      value:
        profile.blood_group || "-",
      icon: Droplets,
      color: "text-red-600",
    },
    {
      label: "Emergency Contact",
      value:
        profile.emergency_contact ||
        "-",
      icon: Shield,
      color: "text-yellow-600",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Principal Profile
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View and manage your official school profile.
          </p>
        </div>

        {!editing && (
          <button
            type="button"
            onClick={() =>
              setEditing(true)
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            <Pencil size={17} />
            Edit Profile
          </button>
        )}

      </div>

      {/* MAIN CARD */}

      <div className="rounded-3xl bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-8 lg:flex-row">

          {/* LEFT PROFILE */}

          <div className="lg:w-72 lg:border-r lg:border-gray-100 lg:pr-8">

            <div className="flex flex-col items-center">

              {/* PHOTO */}

              <label
                className={`relative ${
                  editing
                    ? "cursor-pointer"
                    : ""
                } group`}
              >

                {editing && (
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={
                      handlePhotoChange
                    }
                  />
                )}

                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-purple-100">

                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Principal"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User
                      size={55}
                      className="text-purple-600"
                    />
                  )}

                </div>

                {editing && (
                  <div className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition group-hover:bg-purple-50">
                    <Camera
                      size={18}
                      className="text-gray-600"
                    />
                  </div>
                )}

              </label>

              <h3 className="mt-5 text-center text-xl font-bold text-gray-800">
                {profile.full_name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {profile.designation ||
                  "Principal"}
              </p>

              <div className="mt-5 w-full space-y-3">

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Employee ID
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {profile.employee_id ||
                      "-"}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Department
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    Administration
                  </p>
                </div>

              </div>

              {editing && (
                <p className="mt-3 text-center text-[11px] text-gray-400">
                  JPG, PNG or WEBP • Max 5 MB
                </p>
              )}

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex-1">

            {!editing ? (

              <>
                <div className="grid gap-5 md:grid-cols-2">

                  {information.map(
                    (item) => {
                      const Icon =
                        item.icon;

                      return (
                        <div
                          key={
                            item.label
                          }
                          className="rounded-2xl border border-gray-100 p-5"
                        >

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                              <Icon
                                size={18}
                                className={
                                  item.color
                                }
                              />
                            </div>

                            <div className="min-w-0">

                              <p className="text-sm text-gray-500">
                                {item.label}
                              </p>

                              <h3 className="mt-1 break-words font-semibold text-gray-800">
                                {item.value}
                              </h3>

                            </div>

                          </div>

                        </div>
                      );
                    }
                  )}

                  {/* ADDRESS */}

                  <div className="rounded-2xl border border-gray-100 p-5 md:col-span-2">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                        <MapPin
                          size={18}
                          className="text-red-600"
                        />
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Address
                        </p>

                        <h3 className="mt-1 font-semibold text-gray-800">
                          {profile.address ||
                            "-"}
                        </h3>
                      </div>

                    </div>

                  </div>

                  {/* DESIGNATION */}

                  <div className="rounded-2xl border border-gray-100 p-5 md:col-span-2">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                        <Building2
                          size={18}
                          className="text-indigo-600"
                        />
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Designation
                        </p>

                        <h3 className="mt-1 font-semibold text-gray-800">
                          {profile.designation ||
                            "Principal"}
                        </h3>
                      </div>

                    </div>

                  </div>

                </div>
              </>

            ) : (

              /* EDIT FORM */

              <form
                onSubmit={handleSave}
                className="space-y-5"
              >

                <div className="grid gap-5 md:grid-cols-2">

                  {/* NAME */}

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>

                    <input
                      name="full_name"
                      value={
                        form.full_name
                      }
                      onChange={
                        handleChange
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={
                        form.email
                      }
                      onChange={
                        handleChange
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                      placeholder="Enter email"
                    />
                  </div>

                  {/* PHONE */}

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Contact Number
                    </label>

                    <input
                      name="phone"
                      value={
                        form.phone
                      }
                      onChange={
                        handleChange
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                      placeholder="Enter phone number"
                    />
                  </div>

                  {/* QUALIFICATION */}

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Qualification
                    </label>

                    <input
                      name="qualification"
                      value={
                        form.qualification
                      }
                      onChange={
                        handleChange
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                      placeholder="e.g. Ph.D, M.Ed"
                    />
                  </div>

                  {/* EXPERIENCE */}

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Experience
                    </label>

                    <input
                      name="experience"
                      value={
                        form.experience
                      }
                      onChange={
                        handleChange
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                      placeholder="e.g. 18 Years"
                    />
                  </div>

                  {/* JOINING DATE */}

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Joining Date
                    </label>

                    <input
                      type="date"
                      name="joining_date"
                      value={
                        form.joining_date
                      }
                      onChange={
                        handleChange
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>

                  {/* DOB */}

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>

                    <input
                      type="date"
                      name="dob"
                      value={
                        form.dob
                      }
                      onChange={
                        handleChange
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>

                  {/* BLOOD */}

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Blood Group
                    </label>

                    <select
                      name="blood_group"
                      value={
                        form.blood_group
                      }
                      onChange={
                        handleChange
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    >
                      <option value="">
                        Select Blood Group
                      </option>

                      <option value="A+">
                        A+
                      </option>

                      <option value="A-">
                        A-
                      </option>

                      <option value="B+">
                        B+
                      </option>

                      <option value="B-">
                        B-
                      </option>

                      <option value="AB+">
                        AB+
                      </option>

                      <option value="AB-">
                        AB-
                      </option>

                      <option value="O+">
                        O+
                      </option>

                      <option value="O-">
                        O-
                      </option>
                    </select>
                  </div>

                  {/* EMERGENCY */}

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Emergency Contact
                    </label>

                    <input
                      name="emergency_contact"
                      value={
                        form.emergency_contact
                      }
                      onChange={
                        handleChange
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                      placeholder="Emergency phone number"
                    />
                  </div>

                  {/* ADDRESS */}

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                      Address
                    </label>

                    <textarea
                      name="address"
                      value={
                        form.address
                      }
                      onChange={
                        handleChange
                      }
                      rows={4}
                      className="mt-2 w-full resize-none rounded-xl border border-gray-200 p-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                      placeholder="Enter complete address"
                    />
                  </div>

                </div>

                {/* BUTTONS */}

                <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={
                      handleCancel
                    }
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                  >
                    <X size={17} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {saving ? (
                      <>
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={17} />

                        Save Changes
                      </>
                    )}

                  </button>

                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}