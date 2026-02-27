import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  BuildingStorefrontIcon,
  IdentificationIcon,
  KeyIcon,
  BriefcaseIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import ThemeToggle from "../components/ThemeToggle.jsx";
import LanguageSwitcher from "../components/LanguageSwitcher.jsx";
import authBg from "../assets/auth-bg.png";

const InputField = ({ label, icon: Icon, type = "text", value, onChange, placeholder, required = true, focused, onFocus, onBlur, ...props }) => (
  <div className="relative group mt-6">
    <label className={`absolute left-0 -top-6 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${focused || value ? 'text-cyan-600 dark:text-cyan-400 opacity-100' : 'text-slate-400 opacity-0 translate-y-2'}`}>
      {label}
    </label>
    <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-200 dark:border-slate-800 relative">
      {Icon && <Icon className={`w-6 h-6 transition-colors duration-300 ${focused ? 'text-cyan-500' : 'text-slate-400 dark:text-slate-500'}`} />}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        className="w-full bg-transparent text-lg text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none font-medium"
        placeholder={focused ? '' : placeholder}
        {...props}
      />
      <div className={`absolute bottom-[-2px] left-0 h-[2px] bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500 ease-out ${focused ? 'w-full' : 'w-0'}`} />
    </div>
  </div>
);

export default function Register() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const { t } = useTranslation();
  const [activeRole, setActiveRole] = useState("VENDOR");
  const [focusedField, setFocusedField] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "VENDOR",
    businessName: "",
    category: "",
    licenseNumber: "",
    ownerName: "",
    contactInfo: "",
    adminCode: ""
  });

  const updateField = (field, value) =>
    setForm(prev => ({
      ...prev,
      [field]: value
    }));

  const handleRoleChange = (role) => {
    setActiveRole(role);
    updateField("role", role);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const user = await register(form);
      if (user.role === "VENDOR") navigate("/vendor");
      else if (user.role === "OWNER") navigate("/owner");
      else if (user.role === "ADMIN") navigate("/admin");
      else navigate("/public");
    } catch (err) {
      // context handles error state
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-[#0B1120] overflow-hidden transition-colors duration-500 font-sans">

      {/* Left Side: Branding & Image (Desktop only or top on mobile) */}
      <div className="relative w-full md:w-[50%] lg:w-[60%] h-[35vh] md:h-screen flex text-center md:text-left items-center justify-center md:justify-start overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-[1.05]"
          style={{ backgroundImage: `url(${authBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-cyan-900/60 to-slate-900/80 z-10" />

        {/* Branding Content */}
        <div className="relative z-20 px-8 py-12 md:p-16 text-white space-y-6 md:space-y-8 max-w-2xl w-full hidden md:block">
          <Link to="/" className="inline-flex md:flex items-center gap-3 mb-6 md:mb-12 group hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <BuildingStorefrontIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">{t("app_name")}</span>
          </Link>

          <div className="space-y-4 md:space-y-6 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter select-none">
              {t("join")} <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"> {t("future") || "Smart Street"}</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-200 font-light tracking-wide max-w-lg leading-relaxed mx-auto md:mx-0">
              {t("landing_tagline") || "Empowering urban spaces with intelligent management."}
            </p>
            <div className="pt-4 md:pt-8 hidden sm:block">
              <Link
                to="/public"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all shadow-xl"
              >
                {t("explore_map") || "Explore Public Map"}
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Wrapper */}
      <div className="relative w-full md:w-[50%] lg:w-[40%] min-h-[65vh] md:h-screen flex flex-col bg-slate-50 dark:bg-[#0B1120] z-40 shadow-[-20px_0_40px_-5px_rgba(0,0,0,0.1)] dark:shadow-[-20px_0_40px_-5px_rgba(0,0,0,0.3)]">

        {/* Wavy S-Curve SVG overlaying the left image (Desktop Only) */}
        <div className="hidden md:block absolute top-0 left-0 h-full w-24 xl:w-32 -translate-x-[99%] text-slate-50 dark:text-[#0B1120] overflow-hidden pointer-events-none z-30">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full fill-current">
            <path d="M 100 0 C 20 25, 80 75, 0 100 L 100 100 Z" />
          </svg>
        </div>

        {/* Toggles */}
        <div className="absolute top-6 right-6 flex items-center gap-3 z-50">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 w-full overflow-y-auto flex items-center justify-center px-6 sm:px-12 py-10 md:py-16 mt-12 md:mt-0">
          {/* Register Form Container */}
          <div className="relative w-full max-w-md space-y-8 py-8 animate-fade-in-up z-40">

            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{t("sign_up")}</h2>
              <div className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-light">
                {t("have_account") || "Already have an account?"}{" "}
                <Link to="/login" className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline tracking-tight transition-colors">{t("sign_in")}</Link>
              </div>
            </div>

            {/* Role Selection Tabs */}
            <div className="flex bg-slate-200/50 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-300/50 dark:border-slate-800 backdrop-blur-sm">
              {[
                { id: "VENDOR", label: t("vendor_role"), icon: BuildingStorefrontIcon },
                { id: "OWNER", label: t("space_owner_role"), icon: KeyIcon },
                { id: "ADMIN", label: t("admin_role"), icon: LockClosedIcon }
              ].map((role) => (
                <button
                  type="button"
                  key={role.id}
                  onClick={() => handleRoleChange(role.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${activeRole === role.id
                    ? "bg-slate-50 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm border border-slate-200 dark:border-slate-700"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                >
                  <role.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{role.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <InputField
                  label={t("full_name")} icon={UserIcon} value={form.name}
                  onChange={e => updateField("name", e.target.value)}
                  onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                  focused={focusedField === "name"} placeholder="John Doe"
                />
                <InputField
                  label={t("phone_number")} icon={PhoneIcon} value={form.phone}
                  onChange={e => updateField("phone", e.target.value)}
                  onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)}
                  focused={focusedField === "phone"} placeholder="+1 234 567 890" type="tel"
                />
                <InputField
                  label={t("email_address")} icon={EnvelopeIcon} value={form.email}
                  onChange={e => updateField("email", e.target.value)}
                  onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                  focused={focusedField === "email"} placeholder="john@example.com" type="email"
                />
                <InputField
                  label={t("password")} icon={LockClosedIcon} value={form.password}
                  onChange={e => updateField("password", e.target.value)}
                  onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)}
                  focused={focusedField === "password"} placeholder="••••••••" type="password" minLength={8}
                />

                {/* Dynamic Fields */}
                {activeRole === "VENDOR" && (
                  <>
                    <InputField
                      label={t("business_name")} icon={BriefcaseIcon} value={form.businessName}
                      onChange={e => updateField("businessName", e.target.value)}
                      onFocus={() => setFocusedField("businessName")} onBlur={() => setFocusedField(null)}
                      focused={focusedField === "businessName"} placeholder="Business Name"
                    />
                    <InputField
                      label={t("category")} icon={BriefcaseIcon} value={form.category}
                      onChange={e => updateField("category", e.target.value)}
                      onFocus={() => setFocusedField("category")} onBlur={() => setFocusedField(null)}
                      focused={focusedField === "category"} placeholder="Category"
                    />
                    <div className="sm:col-span-2">
                      <InputField
                        label={t("license_number")} icon={IdentificationIcon} value={form.licenseNumber}
                        onChange={e => updateField("licenseNumber", e.target.value)}
                        onFocus={() => setFocusedField("licenseNumber")} onBlur={() => setFocusedField(null)}
                        focused={focusedField === "licenseNumber"} placeholder="License Number"
                      />
                    </div>
                  </>
                )}

                {activeRole === "OWNER" && (
                  <>
                    <InputField
                      label={t("owner_entity_name")} icon={UserIcon} value={form.ownerName}
                      onChange={e => updateField("ownerName", e.target.value)}
                      onFocus={() => setFocusedField("ownerName")} onBlur={() => setFocusedField(null)}
                      focused={focusedField === "ownerName"} placeholder="Entity Name"
                    />
                    <InputField
                      label={t("contact_info_public")} icon={PhoneIcon} value={form.contactInfo}
                      onChange={e => updateField("contactInfo", e.target.value)}
                      onFocus={() => setFocusedField("contactInfo")} onBlur={() => setFocusedField(null)}
                      focused={focusedField === "contactInfo"} placeholder="Public Help Line"
                    />
                  </>
                )}

                {activeRole === "ADMIN" && (
                  <div className="sm:col-span-2">
                    <InputField
                      label={t("admin_access_code")} icon={KeyIcon} value={form.adminCode}
                      onChange={e => updateField("adminCode", e.target.value)}
                      onFocus={() => setFocusedField("adminCode")} onBlur={() => setFocusedField(null)}
                      focused={focusedField === "adminCode"} placeholder="Access Code"
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm font-medium text-red-600 dark:text-red-400 flex items-center gap-3 shadow-sm animate-fade-in-up mt-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-lg shadow-xl shadow-cyan-600/20 hover:shadow-cyan-600/40 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("creating_profile")}
                  </div>
                ) : t("complete_registration")}
              </button>
            </form>

            <p className="text-center text-sm text-slate-400 dark:text-slate-500 font-light mt-8">
              {t("footer_secure")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
