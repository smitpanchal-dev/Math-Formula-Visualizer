import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import AuthModal from "./AuthModal";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "#explore" },
  { label: "Visualizer", href: "#visualizer" },
  { label: "Formulas", href: "#formulas" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Determine user display name (custom metadata username -> email prefix)
  const usernameDisplay =
    user?.user_metadata?.username || user?.email?.split("@")[0];

  return (
    <>
      <nav
        aria-label="Primary"
        className="sticky top-0 z-50 w-full bg-[#F5EDE0] flex justify-between items-center px-4 sm:px-8 py-2.5 sm:py-4 shadow-sm transition-colors duration-300"
      >
        {/* Logo - Scaled for Mobile & Desktop */}
        <a href="/" className="flex items-center leading-none z-50 group gap-1">
          <span className="text-[#0B0F19] text-3xl sm:text-4xl md:text-[3.5rem] transition-transform duration-300 group-hover:scale-105">
            &#955;
          </span>
          <span className="text-[#0B0F19] text-xl sm:text-2xl md:text-[2.25rem] font-['Space_Grotesk'] font-semibold tracking-tight">
            Mathviz
          </span>
        </a>

        {/* Action Buttons & Profile Controls */}
        <div className="flex items-center gap-2 sm:gap-4 z-50">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-semibold text-[#0B0F19] hidden sm:inline font-['Space_Grotesk'] max-w-30 md:max-w-50 truncate">
                {usernameDisplay}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs font-medium bg-[#0B0F19] text-white px-2.5 sm:px-3.5 py-1.5 rounded-lg hover:bg-black transition-all cursor-pointer shadow-sm active:scale-95"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="flex items-center justify-center p-1.5 rounded-full hover:bg-black/5 transition-all cursor-pointer active:scale-95"
              title="Sign In / Sign Up"
            >
              <img
                src="/src/assets/icons/user3.png"
                alt="User profile"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              />
            </button>
          )}

          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="fullscreen-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative w-9 sm:w-10 h-8 flex flex-col justify-center items-end cursor-pointer p-1 group"
          >
            <span
              className={`h-0.5 w-8 sm:w-10 bg-[#0B0F19] rounded-full transition-all duration-500 ease-in-out ${
                open ? "rotate-45 translate-y-0.75" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`h-0.5 bg-[#0B0F19] rounded-full transition-all duration-500 ease-in-out ${
                open
                  ? "-rotate-45 -translate-y-0.75 w-8 sm:w-10"
                  : "translate-y-1.5 w-6 sm:w-7 group-hover:w-8 sm:group-hover:w-10"
              }`}
            />
          </button>
        </div>

        {/* Fullscreen Overlay Menu */}
        <div
          id="fullscreen-menu"
          className={`fixed inset-0 z-40 bg-[#0B0F19]/85 backdrop-blur-2xl flex items-center justify-center overflow-y-auto py-12 px-6 transition-all duration-500 ease-in-out ${
            open
              ? "opacity-100 visible pointer-events-auto"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <nav
            aria-label="Fullscreen"
            aria-hidden={!open}
            className="flex flex-col items-center gap-6 sm:gap-8 my-auto"
          >
            {LINKS.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: open ? `${150 + idx * 75}ms` : "0ms",
                }}
                className={`text-white text-3xl sm:text-5xl font-['Space_Grotesk'] uppercase tracking-widest transition-all duration-500 ease-out hover:text-orange-400 hover:scale-105 active:scale-95 ${
                  open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </nav>

      {/* Auth Modal Render */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Navbar;
