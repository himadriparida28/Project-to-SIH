/**
 * @file Login.jsx
 * @description Modern login page for the Government Complaint & Schemes Platform.
 *              Supports both Password Login (Email or Phone Number + Password)
 *              and OTP Login (Phone Number + 6-digit OTP verification).
 *              Features glass-effect tabbed login card, cooldown timer for OTP resend,
 *              React Hook Form validation, and auto-redirect.
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  HiShieldCheck,
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiArrowRight,
  HiPhone,
  HiChatBubbleLeftRight,
} from 'react-icons/hi2';

import { useAuth } from '../../context/AuthContext';
import * as authService from '../../services/authService';

/* ── Animation Variants ── */
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── Regex Constants ── */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^(?:\+91)?[6-9]\d{9}$/;

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithOTP, isAuthenticated, loading: authLoading } = useAuth();

  /* ── Page States ── */
  const [loginType, setLoginType] = useState('password'); // 'password' or 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ── OTP States ── */
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: '',
      password: '',
      phone: '',
      otp: '',
      rememberMe: false,
    },
  });

  const phoneValue = watch('phone');

  /* ── Cooldown timer ── */
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  /* ── Redirect if already authenticated ── */
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  /* ── Trigger OTP sending ── */
  const sendVerificationOTP = async () => {
    const isPhoneValid = await trigger('phone');
    if (!isPhoneValid) return;

    setOtpSending(true);
    try {
      const res = await authService.sendOTP({ phone: phoneValue });
      setOtpSent(true);
      setCooldown(60);
      toast.success(res.message || 'OTP sent successfully! (Check development logs)');
    } catch (error) {
      const message =
        error?.response?.data?.phone?.[0] ||
        error?.response?.data?.message ||
        'Failed to send OTP. Ensure phone number is registered.';
      toast.error(message);
    } finally {
      setOtpSending(false);
    }
  };

  /* ── Form submission ── */
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (loginType === 'password') {
        // Send email or phone as "identifier"
        await login({
          identifier: data.identifier.trim(),
          password: data.password,
        });
      } else {
        // Login via phone and OTP
        await loginWithOTP({
          phone: data.phone.trim(),
          otp: data.otp.trim(),
        });
      }
      toast.success('Welcome back! Redirecting to dashboard…');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.non_field_errors?.[0] ||
        error?.response?.data?.message ||
        'Authentication failed. Please check details.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Auth loading state ── */
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gov-900 via-gov-800 to-gov-700">
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">
      {/* ── Gradient Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-gov-900 via-gov-800 to-gov-700" />

      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-gov-600/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />

      {/* ── Login Card ── */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card p-8 md:p-10 bg-white/90 backdrop-blur-xl">
          {/* Logo / Brand */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gov-600 to-gov-800 flex items-center justify-center shadow-lg shadow-gov-600/25 mb-4">
              <HiShieldCheck className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-gov-900">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to your account to continue</p>
          </div>

          {/* ── Login Tabs ── */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => {
                setLoginType('password');
                setShowPassword(false);
              }}
              className={`flex-1 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                loginType === 'password'
                  ? 'bg-white text-gov-800 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Password Login
            </button>
            <button
              type="button"
              onClick={() => setLoginType('otp')}
              className={`flex-1 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                loginType === 'otp'
                  ? 'bg-white text-gov-800 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              OTP Login
            </button>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {loginType === 'password' ? (
              <>
                {/* Identifier (Email/Phone) */}
                <div>
                  <label htmlFor="identifier" className="form-label">
                    Email Address or Phone Number
                  </label>
                  <div className="relative">
                    <HiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="identifier"
                      type="text"
                      placeholder="you@example.com or 9876543210"
                      className={`form-input pl-10 ${errors.identifier ? 'form-input-error' : ''}`}
                      {...register('identifier', {
                        required: 'Email address or Phone number is required',
                        validate: (value) => {
                          const trimmed = value.trim();
                          if (!EMAIL_REGEX.test(trimmed) && !PHONE_REGEX.test(trimmed)) {
                            return 'Enter a valid email address or 10-digit Indian phone number';
                          }
                          return true;
                        },
                      })}
                    />
                  </div>
                  {errors.identifier && <p className="form-error">{errors.identifier.message}</p>}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className={`form-input pl-10 pr-11 ${errors.password ? 'form-input-error' : ''}`}
                      {...register('password', { required: 'Password is required' })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <HiEyeSlash className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="form-error">{errors.password.message}</p>}
                </div>

                {/* Remember Me + Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-gov-600 focus:ring-gov-500 cursor-pointer"
                      {...register('rememberMe')}
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-gov-600 hover:text-gov-700 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Phone number */}
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <HiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="9876543210"
                        className={`form-input pl-10 ${errors.phone ? 'form-input-error' : ''}`}
                        disabled={otpSent}
                        {...register('phone', {
                          required: 'Phone number is required for OTP login',
                          pattern: {
                            value: PHONE_REGEX,
                            message: 'Please enter a valid 10-digit Indian phone number',
                          },
                        })}
                      />
                    </div>
                    {!otpSent && (
                      <button
                        type="button"
                        onClick={sendVerificationOTP}
                        disabled={otpSending || cooldown > 0}
                        className="btn btn-secondary py-2 text-xs md:text-sm whitespace-nowrap cursor-pointer"
                      >
                        {otpSending ? 'Sending…' : cooldown > 0 ? `Resend (${cooldown}s)` : 'Send OTP'}
                      </button>
                    )}
                  </div>
                  {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                </div>

                {/* OTP code */}
                {otpSent && (
                  <div className="animate-fade-in">
                    <label htmlFor="otp" className="form-label">
                      Verification Code (OTP)
                    </label>
                    <div className="relative">
                      <HiChatBubbleLeftRight className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className={`form-input pl-10 ${errors.otp ? 'form-input-error' : ''}`}
                        {...register('otp', {
                          required: 'OTP is required',
                          pattern: {
                            value: /^\d{6}$/,
                            message: 'OTP must be a 6-digit number',
                          },
                        })}
                      />
                    </div>
                    {errors.otp && <p className="form-error">{errors.otp.message}</p>}

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">OTP Sent successfully</span>
                      <button
                        type="button"
                        onClick={sendVerificationOTP}
                        disabled={otpSending || cooldown > 0}
                        className="text-xs font-semibold text-gov-600 hover:text-gov-700 disabled:opacity-50 cursor-pointer"
                      >
                        {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || (loginType === 'otp' && !otpSent)}
              className="btn btn-primary w-full py-3 text-base cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  {loginType === 'password' ? 'Sign In' : 'Verify & Login'}
                  <HiArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-gov-600 hover:text-gov-700 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-blue-200/70 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
