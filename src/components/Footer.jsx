import { useState } from "react";

const CATEGORIES = [
  { label: "Algebra", symbol: "∑", hash: "Algebra" },
  { label: "Calculus", symbol: "∫", hash: "Calculus" },
  { label: "Geometry", symbol: "△", hash: "Geometry" },
  { label: "Trigonometry", symbol: "∠", hash: "Trigonometry" },
];

const SOCIAL_LINKS = [
  { label: "GH", href: "https://github.com", name: "GitHub" },
  { label: "IG", href: "https://instagram.com", name: "Instagram" },
  { label: "IN", href: "https://linkedin.com", name: "LinkedIn" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="border-t border-black/10 bg-[#f7efe3] text-[#5a4a3a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-10 lg:px-12 py-12 sm:py-16">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[2fr_1fr_1fr_1.4fr]">
          
          {/* 1. BRAND & MISSION */}
          <div className="max-w-md">
            <a
              href="#home"
              onClick={(e) => handleScroll(e, "home")}
              className="group inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg"
              aria-label="Mathviz Home"
            >
              <span className="text-[#0B0F19] text-3xl sm:text-4xl md:text-[4rem] leading-none transition-transform duration-300 group-hover:scale-105">
                &#955;
              </span>
              <span className="text-[#0B0F19] text-xl sm:text-2xl md:text-[2.25rem] font-['Space_Grotesk'] font-semibold leading-none tracking-tight">
                Mathviz
              </span>
            </a>

            <p className="mt-4 sm:mt-5 font-['Inter'] text-xs sm:text-sm leading-relaxed text-[#8b7355]">
              Explore mathematics through interactive graphs, formulas, and
              visual experiments. Turn equations into something you can see,
              understand, and explore.
            </p>

            <a
              href="#visualizer"
              onClick={(e) => handleScroll(e, "visualizer")}
              className="group mt-5 sm:mt-6 inline-flex items-center gap-2 rounded-full bg-[#0B0F19] px-5 sm:px-6 py-2.5 sm:py-3 font-['Inter'] text-xs sm:text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-md active:translate-y-0"
            >
              <span>Start visualizing</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* 2. SECTION NAVIGATION */}
          <div>
            <h3 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#3a2e23]">
              Navigation
            </h3>

            <ul className="mt-4 sm:mt-5 flex flex-col gap-2.5 sm:gap-3">
              {[
                { label: "Home", id: "home" },
                { label: "Visualizer", id: "visualizer" },
                { label: "Formulas", id: "formulas" },
                { label: "About", id: "about" },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScroll(e, item.id)}
                    className="group inline-flex items-center font-['Inter'] text-xs sm:text-sm text-[#8b7355] transition-colors duration-200 hover:text-[#0B0F19]"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. MATH CATEGORIES */}
          <div>
            <h3 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#3a2e23]">
              Categories
            </h3>

            <ul className="mt-4 sm:mt-5 flex flex-col gap-2.5 sm:gap-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.label}>
                  <a
                    href="#formulas"
                    onClick={(e) => handleScroll(e, "formulas")}
                    className="group flex w-fit items-center gap-2 font-['Inter'] text-xs sm:text-sm text-[#8b7355] transition-colors duration-200 hover:text-[#0B0F19]"
                  >
                    <span className="text-xs text-[#b8a287] transition-colors duration-200 group-hover:text-[#0B0F19]">
                      {cat.symbol}
                    </span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {cat.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. NEWSLETTER & STAY CONNECTED */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#3a2e23]">
              Stay Updated
            </h3>

            <p className="mt-4 sm:mt-5 max-w-xs font-['Inter'] text-xs sm:text-sm leading-relaxed text-[#8b7355]">
              Get new interactive formulas and visual experiments delivered to your inbox.
            </p>

            {/* Inline Subscribe Form */}
            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2 max-w-sm">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-black/15 bg-white/70 px-3.5 sm:px-4 py-2 sm:py-2.5 font-['Inter'] text-xs sm:text-sm text-[#0B0F19] placeholder-[#a08d78] shadow-inner outline-none transition-all duration-200 focus:border-black focus:bg-white"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 rounded-lg bg-[#0B0F19] px-3 py-1.5 font-['Inter'] text-xs font-medium text-white transition-all hover:bg-black cursor-pointer"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="font-['Inter'] text-xs font-medium text-emerald-700">
                  ✓ Thanks for subscribing!
                </p>
              )}
            </form>

            {/* Social Links */}
            <div className="mt-5 sm:mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-black/10 bg-white/60 font-['Inter'] text-xs font-semibold text-[#5a4a3a] shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-black hover:bg-[#0B0F19] hover:text-white hover:shadow-md"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-8 sm:my-10 h-px bg-black/10" />

        {/* BOTTOM FOOTER */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <p className="font-['Inter'] text-[11px] sm:text-xs text-black/50">
            © {new Date().getFullYear()} Mathviz. Built for curious minds.
          </p>

          <button
            onClick={(e) => handleScroll(e, "home")}
            className="group flex w-fit items-center gap-1.5 font-['Inter'] text-xs font-medium text-black/60 transition-colors hover:text-black cursor-pointer mx-auto sm:mx-0"
          >
            <span>Back to top</span>
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;