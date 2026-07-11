import { Link } from "react-router-dom";
import { HiShieldCheck } from "react-icons/hi2";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";



export default function RegisterFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full px-3 pb-3">
      {/* Glassmorphic Container with Sky Blue Contrast */}
      <div
  className="
    rounded-[28px]
    overflow-hidden
    bg-gradient-to-br
    from-orange-100/30
    via-amber-50/20
    to-orange-50/30
    backdrop-blur-2xl
    border
    border-orange-100/50
    shadow-[0_8px_32px_rgba(251,146,60,0.12)]
    text-slate-800
  "
>
        {/* Main grid */}
        <div className="mx-auto max-w-7xl px-8 py-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <HiShieldCheck className="h-7 w-7 text-sky-600" />
              <span className="text-lg font-bold text-[#0B1D48]">AAVEDAN-SETU</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-700 font-medium">
              A unified government complaint management and scheme discovery
              platform. Empowering citizens to engage with public services
              efficiently and transparently.
            </p>
          </div>

         

          {/* Contact */}
          <div className="ml-28">
            <h4 className=" mb-4 text-sm   font-bold uppercase tracking-wider text-[#0B1D48]">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FiMail className="h-4 w-4 text-sky-600" />
                <a 
                  href="mailto:support@govconnect.gov.in" 
                  className="hover:text-purple-700 font-semibold text-slate-700 transition-colors"
                >
                  support@govconnect.gov.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="h-4 w-4 text-sky-600" />
                <a 
                  href="tel:1800-111-555" 
                  className="hover:text-purple-700 font-semibold text-slate-700 transition-colors"
                >
                  1800-111-555 (Toll Free)
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-0.5 h-4 w-4 text-sky-600" />
                <span className="font-semibold text-slate-700">
                  Ministry of Electronics &amp; IT, New Delhi, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/40 py-4 bg-sky-600/5">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-8">
            <p className="text-xs font-semibold text-slate-600">
              &copy; {year} Aavedan-Setu. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
