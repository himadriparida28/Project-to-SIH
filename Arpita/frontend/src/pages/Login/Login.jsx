/**
 * @file Login.jsx
 * @description Redesigned premium login page matching the custom AAVEDAN-SETU layout.
 *              Features a split-screen layout overlaying a custom high-res background,
 *              floating animated ID cards (Aadhaar, Ayushman, Ration) positioned with mathematically uniform spacing,
 *              an interactive Latest Schemes slider (zoomed-in for readability), a dedicated compact Login form card,
 *              Aavedan Setu brand logo integration, a language switching dropdown (English, Hindi, Odia),
 *              a smooth scroll anchor from Help Center to the contact footer, and a yellow contact footer.
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiHome,
  HiDocumentText,
  HiChartBar,
  HiUserGroup,
  HiCpuChip,
  HiPhone,
  HiGlobeAlt,
  HiChevronDown,
  HiArrowRight,
} from 'react-icons/hi2';

import { useAuth } from '../../context/AuthContext';

// Import newly uploaded image assets
import cleanBg from '../../assets/clean_bg.jpg';
import aadhaarImg from '../../assets/aadhaar.jpg';
import rationImg from '../../assets/ration.jpg';
import ayushmanImg from '../../assets/ayushman.jpg';

/* ── Animation Variants ── */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── Mock Data for Latest Schemes Slider ── */
const SCHEME_ITEMS = [
  {
    title: 'PM Kisan Yojana',
    date: 'Updated: May 20, 2024',
    desc: 'Financial support of ₹6,000 per year provided to eligible farmer families across India.',
    iconColor: 'bg-emerald-500',
    svgIcon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
  },
  {
    title: 'Ayushman Bharat',
    date: 'Updated: May 18, 2024',
    desc: 'Free health insurance cover of up to ₹5 Lakh per family for secondary hospitalizations.',
    iconColor: 'bg-indigo-500',
    svgIcon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Digital Scholarship',
    date: 'Updated: May 15, 2024',
    desc: 'Direct scholarships for students pursuing engineering, technical, and medical courses.',
    iconColor: 'bg-amber-500',
    svgIcon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [schemeIndex, setSchemeIndex] = useState(0);

  // Language Dropdown states
  const [selectedLang, setSelectedLang] = useState('English');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  /* ── Redirect if already authenticated ── */
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  /* ── Login Form submission ── */
  const onLoginSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await login({
        identifier: data.identifier.trim(),
        password: data.password,
      });
      toast.success('Welcome back! Redirecting to dashboard…');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Google Sign In Handler ── */
  const handleGoogleSignIn = () => {
    toast.info('Google authentication integration coming soon!');
  };

  /* ── Scheme slider handlers ── */
  const handlePrevScheme = () => {
    setSchemeIndex((prev) => (prev === 0 ? SCHEME_ITEMS.length - 1 : prev - 1));
  };

  const handleNextScheme = () => {
    setSchemeIndex((prev) => (prev === SCHEME_ITEMS.length - 1 ? 0 : prev + 1));
  };

  /* ── Smooth Scroll to Footer Contacts ── */
  const handleHelpCenterClick = () => {
    const contactFooter = document.getElementById('contact-footer');
    if (contactFooter) {
      contactFooter.scrollIntoView({ behavior: 'smooth' });
      toast.info('Scrolling to support contact information…');
    }
  };

  /* ── Auth loading state ── */
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-300 to-orange-400">
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FFD166] font-sans overflow-y-auto">
      
      {/* ── Dropdown outside click catcher backdrop ── */}
      {isLangDropdownOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent cursor-default"
          onClick={() => setIsLangDropdownOpen(false)}
        />
      )}

      {/* ── SCROLLABLE HERO MAIN WRAPPER ── */}
      <div
        className="relative w-full flex-1 flex flex-col justify-between pb-10"
        style={{
          backgroundImage: `url(${cleanBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* ── CHANGE 2: Animated Glow ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-white/30 blur-[170px] left-[-200px] top-[-150px]" />
          <div className="absolute w-[450px] h-[450px] rounded-full bg-yellow-200/40 blur-[130px] right-[-100px] bottom-[-100px]" />
          <div className="absolute w-[350px] h-[350px] rounded-full bg-orange-200/30 blur-[120px] top-[35%] left-[45%]" />
        </div>

        {/* ── CHANGE 3: Header ── */}
        <header className="relative z-50 px-10 py-5 bg-gradient-to-r from-[#2d1b0d] via-[#1c0f05] to-[#2d1b0d] border-b border-amber-950/20 shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                className="w-14 h-14 object-contain bg-white p-1.5 rounded-xl shadow-md border border-white/20"
                alt="Aavedan Setu Brand Logo"
              />
              <div>
                <h1 className="text-3xl font-black text-white tracking-wider">
                  AAVEDAN-SETU
                </h1>
                <p className="text-sm text-amber-200/70 font-bold">
                  Your Gateway to Smart Governance
                </p>
              </div>
            </div>
            <div className="flex gap-8 items-center text-sm">
              
              {/* Language Selector Dropdown (English, Hindi, Odia) */}
              <div className="relative z-50">
                <button
                  type="button"
                  onClick={() => setIsLangDropdownOpen((prev) => !prev)}
                  className="font-bold hover:text-white cursor-pointer flex items-center gap-1.5 text-amber-200/80 focus:outline-none"
                >
                  🌐 {selectedLang} <HiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2.5 w-32 bg-white/90 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-xl overflow-hidden z-50 py-1"
                    >
                      {['English', 'Hindi', 'Odia'].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => {
                            setSelectedLang(lang);
                            setIsLangDropdownOpen(false);
                            toast.success(`Language switched to ${lang}!`);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition-colors ${selectedLang === lang ? 'bg-violet-50/50 text-violet-600' : ''}`}
                        >
                          {lang}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Help Center Smooth Scroll Anchor */}
              <button
                type="button"
                onClick={handleHelpCenterClick}
                className="font-bold hover:text-white cursor-pointer flex items-center gap-1.5 text-amber-200/80 focus:outline-none"
              >
                🎧 Help Center
              </button>
            </div>
          </div>
        </header>

        {/* ── MAIN CONTENT GRID ── */}
        <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 pl-6 pr-6 md:pl-12 md:pr-6 lg:pr-0 items-center max-w-[1440px] mx-auto w-full">
          
          {/* COLUMN 1: Titles & Actions (Left 5 Columns) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-6 items-start relative h-auto">
            
            {/* Titles & Paragraph (Enlarged Fonts) */}
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#E11D48] tracking-wide select-none">
                Smart Services.
              </span>
              <h1 className="text-7xl font-black tracking-tight leading-[1.05] text-slate-900 mt-1 select-none">
                <span className="text-[#991B1B]">Strong India.</span>
                <br />
                <span className="text-[#0F172A]">AI-Powered</span>
                <br />
                <span className="text-[#0F172A]">Citizen Services</span>
              </h1>
              <p className="text-sm text-slate-500 font-semibold leading-relaxed mt-4 max-w-sm select-none">
                Empowering every citizen with AI-driven governance.
                <br /><br />
                Submit complaints, track applications,
                discover schemes and receive instant
                government assistance — all from one
                secure platform.
              </p>
            </div>

            {/* 4 Feature Circular Cards Row */}
            <div className="grid grid-cols-4 gap-4 max-w-[390px] select-none mt-2">
              
              <div className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#EEF2FF] border border-indigo-100 flex items-center justify-center shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                  <HiDocumentText className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-[11px] font-extrabold text-slate-700 leading-none">Submit</span>
                  <span className="text-[10px] font-bold text-slate-500 mt-0.5">Complaint</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#ECFDF5] border border-emerald-100 flex items-center justify-center shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                  <HiChartBar className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-[11px] font-extrabold text-slate-700 leading-none">Track</span>
                  <span className="text-[10px] font-bold text-slate-500 mt-0.5">Status</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#FFFBEB] border border-amber-100 flex items-center justify-center shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-[11px] font-extrabold text-slate-700 leading-none">Find</span>
                  <span className="text-[10px] font-bold text-slate-500 mt-0.5">Schemes</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#FDF4FF] border border-fuchsia-100 flex items-center justify-center shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                  <svg className="w-6 h-6 text-fuchsia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-[11px] font-extrabold text-slate-700 leading-none">AI</span>
                  <span className="text-[10px] font-bold text-slate-500 mt-0.5">Assistant</span>
                </div>
              </div>

            </div>

            {/* Latest Schemes Section (Renamed & Zoomed-In) */}
            <div className="flex flex-col gap-3.5 max-w-[440px] w-full select-none mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-800 tracking-wide">Latest Schemes</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevScheme}
                    className="w-7 h-7 rounded-full bg-white/60 border border-white/20 text-slate-700 flex items-center justify-center shadow-sm cursor-pointer hover:bg-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextScheme}
                    className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm cursor-pointer hover:bg-indigo-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Slide list wrapper (Zoomed min-height) */}
              <div className="w-full min-h-[110px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={schemeIndex}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-3 gap-3 w-full"
                  >
                    {SCHEME_ITEMS.map((item, idx) => {
                      const actualIdx = (schemeIndex + idx) % SCHEME_ITEMS.length;
                      const displayItem = SCHEME_ITEMS[actualIdx];

                      return (
                        <div
                          key={actualIdx}
                          className="bg-white/85 rounded-2xl border border-white/60 p-3.5 flex flex-col justify-between shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                        >
                          <div className="flex gap-2 items-center">
                            {/* Circular thumbnail representation */}
                            <div className={`w-9 h-9 rounded-full ${displayItem.iconColor} flex items-center justify-center shrink-0 shadow-sm border border-white`}>
                              {displayItem.svgIcon}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[11px] font-black text-slate-800 truncate leading-tight">
                                {displayItem.title}
                              </span>
                              <span className="text-[9px] font-bold text-slate-400 mt-0.5 leading-none">
                                {displayItem.date}
                              </span>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-500 font-semibold leading-normal mt-2 line-clamp-2">
                            {displayItem.desc}
                          </p>
                          <div className="flex justify-end mt-2">
                            <Link
                              to="/schemes"
                              className="text-[9.5px] font-extrabold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-0.5"
                            >
                              Read More <HiArrowRight className="w-2.5 h-2.5" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* COLUMN 2: Center Map Overlay Area (Middle 3 Columns) - Mathematically Uniform Centering */}
          <div className="hidden lg:block lg:col-span-3 relative h-[380px] select-none pointer-events-none">
            
            {/* Glow behind map */}
            <div className="absolute w-[450px] h-[450px] rounded-full bg-yellow-300/20 blur-[130px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* Aadhaar Card (Top Left) */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 2, -2, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[-135px] left-[-80px] w-[160px] shadow-2xl pointer-events-none z-10"
            >
              <img src={aadhaarImg} className="w-full h-auto rounded-xl border border-white/50" alt="Aadhaar Card" />
            </motion.div>

            {/* Ration Card (Middle Right) */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 2, -2, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[5px] right-[45px] w-[150px] shadow-2xl pointer-events-none z-10"
            >
              <img src={rationImg} className="w-full h-auto rounded-xl border border-white/50" alt="Ration Card" />
            </motion.div>

            {/* Ayushman Card (Bottom Left) */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 2, -2, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[115px] left-[-105px] w-[160px] shadow-2xl pointer-events-none z-10"
            >
              <img src={ayushmanImg} className="w-full h-auto rounded-xl border border-white/50" alt="Ayushman Card" />
            </motion.div>

          </div>

          {/* COLUMN 3: The Zoomed-In Login Form Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:col-span-4 flex justify-center lg:justify-end py-2 relative z-10 h-full items-start mt-8 lg:mr-[-80px]"
          >
            <div className="bg-white/70 backdrop-blur-3xl rounded-[34px] border border-white/70 shadow-[0_40px_80px_rgba(0,0,0,.12)] p-8 md:py-8 md:px-10 w-full max-w-[430px] flex flex-col gap-6">
              
              {/* Form Headers */}
              <div className="flex flex-col select-none">
                <h2 className="text-3xl font-black text-slate-800 flex items-center gap-2">
                  Welcome Back! 👋
                </h2>
                <p className="text-xs text-slate-400 font-bold mt-1.5">
                  Securely access all government services using your account.
                </p>
              </div>

              {/* Simple Tab Header for visual consistency */}
              <div className="flex border-b border-slate-100 text-sm font-extrabold select-none">
                <span className="pb-2.5 px-4 text-violet-600 border-b-2 border-violet-600 cursor-default text-[15px]">
                  Login
                </span>
              </div>

              {/* LOGIN FORM */}
              <form
                onSubmit={handleLoginSubmit(onLoginSubmit)}
                className="flex flex-col gap-5"
                noValidate
              >
                {/* Email / Phone Field */}
                <div className="flex flex-col">
                  <label htmlFor="identifier" className="text-xs font-bold text-slate-600 mb-1.5">
                    Email / Phone Number
                  </label>
                  <div className="relative">
                    <HiEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                    <input
                      id="identifier"
                      type="text"
                      placeholder="Enter your email or phone number"
                      className={`w-full py-4 pl-10 pr-4 text-[15px] bg-white border ${loginErrors.identifier ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} rounded-2xl outline-none focus:ring-4 transition-all text-slate-800 font-medium`}
                      {...loginRegister('identifier', {
                        required: 'Email address or Phone number is required',
                        validate: (value) => {
                          const trimmed = value.trim();
                          const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                          const PHONE_REGEX = /^(?:\+91)?[6-9]\d{9}$/;
                          if (!EMAIL_REGEX.test(trimmed) && !PHONE_REGEX.test(trimmed)) {
                            return 'Enter a valid email address or 10-digit Indian phone number';
                          }
                          return true;
                        },
                      })}
                    />
                  </div>
                  {loginErrors.identifier && (
                    <p className="text-[10px] text-red-500 font-bold mt-1 pl-1">
                      {loginErrors.identifier.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="flex flex-col">
                  <label htmlFor="password" className="text-xs font-bold text-slate-600 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className={`w-full py-4 pl-10 pr-10 text-[15px] bg-white border ${loginErrors.password ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'} rounded-2xl outline-none focus:ring-4 transition-all text-slate-800 font-medium`}
                      {...loginRegister('password', { required: 'Password is required' })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <HiEyeSlash className="w-4.5 h-4.5" /> : <HiEye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-[10px] text-red-500 font-bold mt-1 pl-1">
                      {loginErrors.password.message}
                    </p>
                  )}

                  {/* Forgot Password Link */}
                  <div className="flex justify-end mt-2">
                    <Link
                      to="/forgot-password"
                      className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: "linear-gradient(135deg,#6D28D9,#9333EA,#7C3AED)"
                  }}
                  className="w-full py-3.5 disabled:opacity-50 text-white font-extrabold rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 active:translate-y-0 text-[15px] select-none mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying…</span>
                    </>
                  ) : (
                    <span>Login</span>
                  )}
                </button>
              </form>

              {/* Divider lines */}
              <div className="relative flex py-1.5 items-center select-none">
                <div className="flex-grow border-t border-slate-200/80"></div>
                <span className="flex-shrink mx-4 text-xs font-black text-slate-400">OR</span>
                <div className="flex-grow border-t border-slate-200/80"></div>
              </div>

              {/* Google OAuth button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 border border-slate-200 bg-white/70 backdrop-blur-md hover:bg-slate-50 text-slate-700 font-extrabold rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-3 text-sm select-none"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.9h6.69c-.29 1.5-.1.13-1.15 2.19l3.22 2.5c1.88-1.73 2.98-4.28 2.98-6.52z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.22-2.5c-.9.6-2.05.96-3.48.96-3.24 0-5.97-2.18-6.95-5.11H1.02v2.58C3 21.09 7.21 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.05 14.44c-.25-.7-.39-1.46-.39-2.24s.14-1.54.39-2.24V7.38H1.02c-.85 1.7-1.34 3.59-1.34 5.62s.49 3.92 1.34 5.62l4.03-3.18z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.21 0 3 2.91 1.02 6.38l4.03 3.18c.98-2.93 3.71-5.11 6.95-5.11z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Registration link footer */}
              <div className="text-center select-none">
                <span className="text-xs font-bold text-slate-500">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-extrabold text-[#7C3AED] hover:text-[#6D28D9] transition-colors"
                  >
                    Register Now
                  </Link>
                </span>
              </div>

            </div>
          </motion.div>
        </main>
      </div>

      {/* ── CLEAN SCROLLABLE GOVERNMENT FOOTER PANEL (Revealed when scrolling down) ── */}
      <footer id="contact-footer" className="w-full bg-[#FFE68A] text-[#1E293B] px-12 py-10 border-t border-amber-300/40 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Block */}
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3 select-none">
              <img src="/logo.png" className="w-8" alt="Aavedan Setu Logo" />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-wider text-slate-800 leading-none">
                  AAVEDAN-SETU
                </span>
                <span className="text-[9px] font-bold text-slate-500 mt-0.5">
                  Your Gateway to Smart Governance
                </span>
              </div>
            </div>
            <p className="text-xs font-semibold leading-relaxed text-slate-600 max-w-md">
              A unified government complaint management and scheme discovery platform.
              Empowering citizens to engage with public services efficiently and transparently.
            </p>
          </div>

          {/* Right Block */}
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black tracking-widest text-slate-800 uppercase">
                CONTACT
              </span>
              <div className="flex flex-col gap-1.5 text-xs font-semibold text-slate-600">
                <a href="mailto:support@govconnect.gov.in" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  📧 support@govconnect.gov.in
                </a>
                <span className="flex items-center gap-1.5">
                  📞 1800-111-555 (Toll Free)
                </span>
                <span className="flex items-center gap-1.5">
                  🏢 Ministry of Electronics & IT, New Delhi, India
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto border-t border-slate-950/5 mt-8 pt-4 text-center text-[10px] font-bold text-slate-500">
          © 2026 Aavedan-Setu. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
