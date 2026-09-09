const FEATURES = [
  {
    symbol: "∫",
    title: "Interactive Exploration",
    description:
      "Adjust variables in real-time and observe how mathematical functions transform instantly on screen without complex setups.",
    accent: "bg-[#0B0F19]",
  },
  {
    symbol: "∑",
    title: "Curated Collections",
    description:
      "Explore essential formulas across Algebra, Calculus, Geometry, and Trigonometry pre-configured for instant visual experiments.",
    accent: "bg-[#ff4b1f]",
  },
  {
    symbol: "λ",
    title: "Designed for Curiosity",
    description:
      "A distraction-free, elegant workspace crafted specifically for students, educators, and curious mathematical minds.",
    accent: "bg-[#0B0F19]",
  },
];

const STATS = [
  { value: "100%", label: "Interactive" },
  { value: "4+", label: "Core Categories" },
  { value: "Real-time", label: "Graph Rendering" },
  { value: "Free", label: "To Explore" },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-[#f7efe3] px-4 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-24 flex flex-col justify-center"
    >
      {/* Background Decorative Accents - Scaled down for mobile */}
      <div className="pointer-events-none absolute -left-10 sm:-left-20 top-1/4 text-[120px] sm:text-[180px] md:text-[220px] font-bold leading-none text-black/3 select-none font-['Space_Grotesk']">
        λ
      </div>
      <div className="pointer-events-none absolute -right-10 sm:-right-20 bottom-10 text-[140px] sm:text-[200px] md:text-[260px] font-bold leading-none text-black/3 select-none font-['Space_Grotesk']">
        ∫
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-black/10 bg-white/40 px-3.5 sm:px-4 py-1.5 font-['Inter'] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8b7355] backdrop-blur-sm">
            About Mathviz
          </span>
          <h2 className="mt-4 sm:mt-6 font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B0F19]">
            Bridging the gap between equations & intuition.
          </h2>
          <p className="mt-4 sm:mt-6 font-['Inter'] text-sm sm:text-base md:text-lg leading-relaxed text-[#8b7355]">
            Mathviz was created with a simple vision: mathematics shouldn’t just be written on paper—it should be felt, manipulated, and visually understood. We transform static equations into living visualizations.
          </p>
        </div>

        {/* Feature Cards Grid: 1 col on mobile, 3 on tablet/desktop */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl sm:rounded-3xl border border-black/10 bg-white/60 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-black/30 hover:bg-white/80 hover:shadow-xl"
            >
              <div
                className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${feature.accent} text-xl sm:text-2xl font-bold text-white shadow-sm font-['Space_Grotesk'] transition-transform duration-300 group-hover:scale-110`}
              >
                {feature.symbol}
              </div>
              <h3 className="mt-5 sm:mt-6 font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-[#0B0F19]">
                {feature.title}
              </h3>
              <p className="mt-2.5 sm:mt-3 font-['Inter'] text-xs sm:text-sm leading-relaxed text-[#8b7355]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats & Call-To-Action Banner */}
        <div className="mt-12 sm:mt-16 overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0B0F19] p-6 sm:p-10 md:p-12 text-white shadow-2xl relative">
          {/* Stats: 2x2 grid on mobile, 4 columns on large screens */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 border-b border-white/10 pb-6 sm:pb-8 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#ff4b1f]">
                  {stat.value}
                </p>
                <p className="mt-1 font-['Inter'] text-[10px] sm:text-xs uppercase tracking-widest text-white/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Footer */}
          <div className="mt-6 sm:mt-8 flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="font-['Inter'] text-xs sm:text-sm text-white/80 text-center sm:text-left">
              Ready to explore? Turn your formulas into interactive visual experiments.
            </p>
            <a
              href="#visualizer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#ff4b1f] px-6 py-3 font-['Inter'] text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#e03d15] hover:shadow-lg active:scale-95"
            >
              <span>Launch Visualizer</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;