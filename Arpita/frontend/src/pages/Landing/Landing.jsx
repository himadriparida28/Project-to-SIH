/**
 * @file Landing.jsx
 * @description Stunning landing page for the Government Complaint & Schemes Platform.
 *              Features hero section with animated background, feature cards, how-it-works
 *              flow, AI capabilities showcase, animated stats counters, and CTA section.
 *              Built for Smart India Hackathon — designed to impress.
 */

import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  HiShieldCheck,
  HiLightBulb,
  HiChartBar,
  HiCpuChip,
  HiDocumentText,
  HiArrowTrendingUp,
  HiCheckBadge,
  HiBuildingOffice2,
  HiUserGroup,
  HiArrowRight,
  HiSparkles,
  HiGlobeAlt,
  HiEye,
  HiChatBubbleLeftRight,
  HiArrowDown,
} from 'react-icons/hi2';

/* ────────────────────────────────────────────
   Animation Variants
   ──────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ────────────────────────────────────────────
   Animated Counter Hook
   ──────────────────────────────────────────── */
function useCounter(target, duration = 2000, startWhenInView = false, inView = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView && startWhenInView) return;

    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, inView, startWhenInView]);

  return count;
}

/* ────────────────────────────────────────────
   Stat Card Component
   ──────────────────────────────────────────── */
function StatCard({ icon: Icon, value, suffix = '+', label, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const animatedValue = useCounter(value, 2200, true, isInView);

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="text-center p-6"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 mb-4">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-1 tabular-nums">
        {animatedValue.toLocaleString()}{suffix}
      </div>
      <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Feature Card Component
   ──────────────────────────────────────────── */
function FeatureCard({ icon: Icon, title, description, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="card card-hover p-8 group cursor-default"
    >
      <div className="w-14 h-14 rounded-2xl bg-gov-50 flex items-center justify-center mb-5 group-hover:bg-gov-100 transition-colors duration-300">
        <Icon className="w-7 h-7 text-gov-600" />
      </div>
      <h3 className="text-lg font-bold text-gov-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Step Card Component (How It Works)
   ──────────────────────────────────────────── */
function StepCard({ step, title, description, icon: Icon, index, isLast }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Connector line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-10 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5 bg-gradient-to-r from-gov-300 to-gov-100" />
      )}

      {/* Step number circle */}
      <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-gov-600 to-gov-800 flex items-center justify-center shadow-lg shadow-gov-600/25 mb-5">
        <span className="text-2xl font-extrabold text-white">{step}</span>
      </div>

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-gov-50 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-gov-600" />
      </div>

      <h3 className="text-lg font-bold text-gov-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">{description}</p>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   LANDING PAGE COMPONENT
   ════════════════════════════════════════════ */
export default function Landing() {
  const featuresRef = useRef(null);

  /** Smooth-scroll to the Features section */
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── Feature data ── */
  const features = [
    {
      icon: HiCpuChip,
      title: 'AI-Powered Analysis',
      description:
        'Our intelligent system uses advanced NLP to automatically categorize, prioritize, and route complaints to the right department.',
    },
    {
      icon: HiChartBar,
      title: 'Real-time Tracking',
      description:
        'Track every complaint from submission to resolution with a transparent, real-time status dashboard you can trust.',
    },
    {
      icon: HiLightBulb,
      title: 'Smart Scheme Matching',
      description:
        'AI analyzes your profile and complaint to recommend relevant government schemes and benefits you may be eligible for.',
    },
    {
      icon: HiShieldCheck,
      title: 'Secure & Anonymous',
      description:
        'End-to-end encryption and optional anonymous filing ensure your data and identity remain protected at all times.',
    },
  ];

  /* ── How It Works steps ── */
  const steps = [
    {
      icon: HiDocumentText,
      title: 'Submit Complaint',
      description:
        'Describe your issue in your own words — our platform supports multiple languages and voice input.',
    },
    {
      icon: HiSparkles,
      title: 'AI Analysis',
      description:
        'Our AI instantly categorizes, assigns priority, and matches your complaint with relevant government schemes.',
    },
    {
      icon: HiArrowTrendingUp,
      title: 'Track Resolution',
      description:
        'Receive real-time updates, interact with officials, and monitor your complaint until it is fully resolved.',
    },
  ];

  /* ── Stats data ── */
  const stats = [
    { icon: HiCheckBadge, value: 50000, label: 'Complaints Resolved' },
    { icon: HiGlobeAlt, value: 1200, label: 'Schemes Listed' },
    { icon: HiUserGroup, value: 200000, suffix: '+', label: 'Citizens Served' },
    { icon: HiBuildingOffice2, value: 350, label: 'Departments Connected' },
  ];

  /* ── AI Capabilities ── */
  const aiCapabilities = [
    {
      icon: HiChatBubbleLeftRight,
      title: 'Natural Language Understanding',
      description: 'File complaints in your own words — our AI understands context, sentiment, and urgency automatically.',
    },
    {
      icon: HiEye,
      title: 'Intelligent Categorization',
      description: 'Complaints are auto-classified into 50+ categories and routed to the exact department with zero manual effort.',
    },
    {
      icon: HiLightBulb,
      title: 'Proactive Scheme Suggestions',
      description: 'Based on your complaint profile, the AI surfaces matching government welfare schemes you may not know about.',
    },
    {
      icon: HiArrowTrendingUp,
      title: 'Predictive Analytics',
      description: 'Trend detection and anomaly analysis help officials identify systemic issues before they escalate.',
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ─────────────────── HERO SECTION ─────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gov-900 via-gov-800 to-gov-700" />

        {/* Animated geometric shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 -right-20 w-96 h-96 rounded-full border border-white/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full border border-white/5"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[10%] w-3 h-3 rounded-full bg-blue-400/30"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-[15%] w-4 h-4 rounded-full bg-cyan-400/20"
        />
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 left-[20%] w-2 h-2 rounded-full bg-blue-300/25"
        />

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gov-600/20 rounded-full blur-[120px]" />

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-8"
          >
            <HiSparkles className="w-4 h-4 text-cyan-300" />
            <span className="text-sm font-medium text-blue-100">AI-Powered Governance Platform</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
          >
            Empowering Citizens,{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Transforming Governance
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-blue-100/80 mb-10 leading-relaxed"
          >
            An AI-powered platform that bridges the gap between citizens and government.
            File complaints seamlessly, discover welfare schemes, and track resolutions — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/register"
              className="btn btn-primary px-8 py-3.5 text-base shadow-xl shadow-blue-900/30 hover:shadow-2xl hover:shadow-blue-900/40"
            >
              Get Started
              <HiArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={scrollToFeatures}
              className="btn btn-ghost text-white border border-white/20 hover:bg-white/10 px-8 py-3.5 text-base"
            >
              Learn More
              <HiArrowDown className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-blue-200/50 text-xs uppercase tracking-widest font-medium"
          >
            <span className="flex items-center gap-2">
              <HiShieldCheck className="w-4 h-4" /> Govt. Verified
            </span>
            <span className="flex items-center gap-2">
              <HiCpuChip className="w-4 h-4" /> AI-Powered
            </span>
            <span className="flex items-center gap-2">
              <HiGlobeAlt className="w-4 h-4" /> Pan-India
            </span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ─────────────────── FEATURES SECTION ─────────────────── */}
      <section ref={featuresRef} className="py-24 md:py-32 bg-gray-50/70">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-semibold text-gov-600 bg-gov-50 px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gov-900 mb-4">
              Built for Modern Governance
            </h2>
            <p className="max-w-xl mx-auto text-gray-500">
              Every feature is designed to make government services more accessible, transparent, and efficient for every citizen.
            </p>
          </motion.div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── HOW IT WORKS SECTION ─────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block text-sm font-semibold text-gov-600 bg-gov-50 px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gov-900 mb-4">
              How It Works
            </h2>
            <p className="max-w-xl mx-auto text-gray-500">
              Three simple steps to get your voice heard and your issues resolved.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, i) => (
              <StepCard
                key={step.title}
                step={i + 1}
                {...step}
                index={i}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── AI FEATURES SECTION ─────────────────── */}
      <section className="py-24 md:py-32 bg-gray-50/70">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left – text */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="inline-block text-sm font-semibold text-gov-600 bg-gov-50 px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                AI Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gov-900 mb-5 leading-tight">
                Powered by{' '}
                <span className="gradient-text">Artificial Intelligence</span>
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Our platform leverages cutting-edge AI and NLP models to automate complaint triage,
                sentiment analysis, scheme matching, and predictive analytics — reducing resolution
                time by up to 60%.
              </p>

              <Link
                to="/register"
                className="btn btn-primary px-6 py-3"
              >
                Experience AI-Powered Governance
                <HiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Right – AI capability cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {aiCapabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  custom={i}
                  variants={fadeUp}
                  className="glass-card p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gov-100 flex items-center justify-center mb-4">
                    <cap.icon className="w-5 h-5 text-gov-700" />
                  </div>
                  <h4 className="text-sm font-bold text-gov-900 mb-1.5">{cap.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{cap.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────── STATS SECTION ─────────────────── */}
      <section className="py-20 bg-gradient-to-br from-gov-800 via-gov-900 to-gov-800 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gov-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Impact That Matters
            </h2>
            <p className="text-blue-200/70 max-w-lg mx-auto">
              Numbers that reflect our commitment to transforming citizen-government interaction across India.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── CTA SECTION ─────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gov-50 mb-6">
            <HiSparkles className="w-8 h-8 text-gov-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gov-900 mb-5">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of citizens already using our AI-powered platform to file complaints,
            discover government schemes, and drive real change in their communities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="btn btn-primary px-8 py-3.5 text-base shadow-lg shadow-gov-600/20"
            >
              Create Free Account
              <HiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="btn btn-secondary px-8 py-3.5 text-base"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─────────────────── FOOTER ─────────────────── */}
      <footer className="py-8 bg-gov-900 text-center">
        <p className="text-blue-200/40 text-sm">
          © {new Date().getFullYear()} Government Complaint & Schemes Platform. Built for Smart India Hackathon.
        </p>
      </footer>
    </div>
  );
}
