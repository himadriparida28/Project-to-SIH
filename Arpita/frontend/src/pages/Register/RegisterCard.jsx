import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Mail, Phone, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  emailRules,
  phoneRules,
  passwordRules,
  nameRules,
} from "../../utils/validators";

export default function RegisterCard() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const hasMinLength = passwordValue ? passwordValue.length >= 8 : false;
  const hasUppercase = passwordValue ? /[A-Z]/.test(passwordValue) : false;
  const hasLowercase = passwordValue ? /[a-z]/.test(passwordValue) : false;
  const hasNumber = passwordValue ? /\d/.test(passwordValue) : false;
  const strengthScore = [hasMinLength, hasUppercase, hasLowercase, hasNumber].filter(Boolean).length;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await registerUser({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      toast.success("Account created successfully! Welcome aboard.");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[430px] h-[90vh] ml-12">
      <div
        className="
          h-full
          overflow-y-auto
          rounded-[28px]
          bg-white/75
          backdrop-blur-3xl
          border
          border-white/80
          shadow-[0_20px_60px_rgba(93,63,211,0.18)]
          px-6
          py-6
        "
      >
        {/* Heading */}
        <h1 className="text-[42px] font-bold text-[#081A4B] leading-none">
          Welcome!
        </h1>
        <p className="text-slate-600 text-[18px] mt-2">
          Create your Aavedan-Setu account
        </p>

        {/* Tabs */}
        <div className="flex mt-6 border-b border-gray-200">
          <button className="flex-1 pb-3 border-b-[3px] border-violet-600 text-violet-700 font-semibold text-lg">
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex-1 pb-3 text-gray-500 text-lg hover:text-violet-700 transition"
          >
            Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
          {/* Full Name */}
          <div>
            <label className="block mb-2 font-semibold text-[#1F2A44] text-[15px]">
              Full Name
            </label>
            <div className="relative">
              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                className={`
                  w-full
                  h-11
                  rounded-xl
                  border
                  bg-white/90
                  pl-11
                  pr-4
                  text-[15px]
                  placeholder:text-gray-400
                  outline-none
                  focus:ring-4
                  focus:ring-purple-200
                  focus:border-purple-500
                  transition
                  ${errors.fullName ? "border-red-400 focus:ring-red-100 focus:border-red-500" : "border-gray-200"}
                `}
                {...register("fullName", nameRules)}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1 pl-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-[#1F2A44] text-[15px]">
              Email
            </label>
            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="email"
                type="email"
                placeholder="example@abc.com"
                autoComplete="email"
                className={`
                  w-full
                  h-11
                  rounded-xl
                  border
                  bg-white/90
                  pl-11
                  pr-4
                  text-[15px]
                  placeholder:text-gray-400
                  outline-none
                  focus:ring-4
                  focus:ring-purple-200
                  focus:border-purple-500
                  transition
                  ${errors.email ? "border-red-400 focus:ring-red-100 focus:border-red-500" : "border-gray-200"}
                `}
                {...register("email", emailRules)}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-semibold text-[#1F2A44] text-[15px]">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="phone"
                type="tel"
                placeholder="Enter your 10 digit phone number"
                autoComplete="tel"
                className={`
                  w-full
                  h-11
                  rounded-xl
                  border
                  bg-white/90
                  pl-11
                  pr-4
                  text-[15px]
                  placeholder:text-gray-400
                  outline-none
                  focus:ring-4
                  focus:ring-purple-200
                  focus:border-purple-500
                  transition
                  ${errors.phone ? "border-red-400 focus:ring-red-100 focus:border-red-500" : "border-gray-200"}
                `}
                {...register("phone", phoneRules)}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 pl-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-semibold text-[#1F2A44] text-[15px]">
              Password
            </label>
            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="create a strong password"
                autoComplete="new-password"
                className={`
                  w-full
                  h-11
                  rounded-xl
                  border
                  bg-white/90
                  pl-11
                  pr-10
                  text-[15px]
                  placeholder:text-gray-400
                  outline-none
                  focus:ring-4
                  focus:ring-purple-200
                  focus:border-purple-500
                  transition
                  ${errors.password ? "border-red-400 focus:ring-red-100 focus:border-red-500" : "border-gray-200"}
                `}
                {...register("password", passwordRules)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 pl-1">
                {errors.password.message}
              </p>
            )}
            
            {passwordValue && (
              <div className="mt-2 p-3 bg-white/50 rounded-xl border border-gray-100 text-[12px] space-y-2">
                <p className="font-semibold text-slate-700">Password Requirements:</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className={hasMinLength ? "text-emerald-500 font-bold" : "text-slate-300"}>
                      {hasMinLength ? "✓" : "○"}
                    </span>
                    <span className={hasMinLength ? "text-emerald-700 font-medium" : "text-slate-400"}>
                      Min 8 chars
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={hasUppercase ? "text-emerald-500 font-bold" : "text-slate-300"}>
                      {hasUppercase ? "✓" : "○"}
                    </span>
                    <span className={hasUppercase ? "text-emerald-700 font-medium" : "text-slate-400"}>
                      One uppercase
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={hasLowercase ? "text-emerald-500 font-bold" : "text-slate-300"}>
                      {hasLowercase ? "✓" : "○"}
                    </span>
                    <span className={hasLowercase ? "text-emerald-700 font-medium" : "text-slate-400"}>
                      One lowercase
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={hasNumber ? "text-emerald-500 font-bold" : "text-slate-300"}>
                      {hasNumber ? "✓" : "○"}
                    </span>
                    <span className={hasNumber ? "text-emerald-700 font-medium" : "text-slate-400"}>
                      One number
                    </span>
                  </div>
                </div>

                {/* Strength Meter Bar */}
                <div className="mt-2 pt-1 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-500 font-medium">Strength:</span>
                    <span className={`font-semibold ${
                      strengthScore <= 1 ? "text-red-500" : strengthScore <= 3 ? "text-amber-500" : "text-emerald-600"
                    }`}>
                      {strengthScore <= 1 ? "Weak" : strengthScore <= 3 ? "Medium" : "Strong"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        strengthScore <= 1 ? "bg-red-500 w-[25%]" : strengthScore === 2 ? "bg-amber-400 w-[50%]" : strengthScore === 3 ? "bg-amber-500 w-[75%]" : "bg-emerald-500 w-[100%]"
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 font-semibold text-[#1F2A44] text-[15px]">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                autoComplete="new-password"
                className={`
                  w-full
                  h-11
                  rounded-xl
                  border
                  bg-white/90
                  pl-11
                  pr-10
                  text-[15px]
                  placeholder:text-gray-400
                  outline-none
                  focus:ring-4
                  focus:ring-purple-200
                  focus:border-purple-500
                  transition
                  ${errors.confirmPassword ? "border-red-400 focus:ring-red-100 focus:border-red-500" : "border-gray-200"}
                `}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 pl-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
              h-11
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              via-purple-600
              to-fuchsia-600
              text-white
              text-[17px]
              font-semibold
              shadow-lg
              hover:shadow-purple-300
              hover:scale-[1.02]
              transition-all
              duration-300
              flex
              items-center
              justify-center
              gap-2
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Back to Home Link */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-500 hover:text-purple-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
