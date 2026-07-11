import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import RegisterNavbar from "./RegisterNavbar";

import RegisterHero from "./RegisterHero";
import RegisterFloatingCards from "./RegisterFloatingCards";
import RegisterQuickActions from "./RegisterQuickActions";
import RegisterLatestNews from "./RegisterLatestNews";
import RegisterCard from "./RegisterCard";
import RegisterAIChat from "./RegisterAIChat";
import RegisterFooter from "./RegisterFooter";

import background from "../../assets/background.png";

export default function Register() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6c548]">
        <div className="w-10 h-10 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f6c548] flex flex-col justify-between overflow-y-auto">
      {/* Curved Portal Section */}
      <div className="p-3 w-full flex-1">
        <div className="relative w-full h-[90vh] min-h-[840px] rounded-[28px] overflow-hidden shadow-xl bg-[#f6c548]">
          <img
            src={background}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />

          <RegisterNavbar />
       
          <RegisterFloatingCards />
          <RegisterQuickActions onAIChatToggle={() => setIsAIChatOpen(true)} />
          <RegisterLatestNews />

          <div className="relative z-20 h-full grid grid-cols-12 pointer-events-none">
            <div className="col-span-7 flex items-center pl-40 pointer-events-auto">
              <RegisterHero />
            </div>
            <div className="col-span-5 flex justify-end items-center pr-8 pointer-events-auto">
              <RegisterCard />
            </div>
          </div>
        </div>
      </div>

      {/* Government Footer */}
      <RegisterFooter />

      {/* Slide-in AI Assistant Chat Drawer */}
      <RegisterAIChat
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />
    </div>
  );
}
