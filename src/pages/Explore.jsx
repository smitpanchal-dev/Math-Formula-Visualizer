import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const topics = [
  {
    index: "01",
    icon: "∑",
    title: "Algebra",
    tag: "Foundations",
    description: "Explore equations and mathematical relationships.",
    accent: "#f7b6b6",
  },
  {
    index: "02",
    icon: "∫",
    title: "Calculus",
    tag: "Change & motion",
    description: "Understand derivatives and integrals visually.",
    accent: "#b6d7f7",
  },
  {
    index: "03",
    icon: "△",
    title: "Geometry",
    tag: "Shape & space",
    description: "Visualize shapes, angles and mathematical space.",
    accent: "#c3f7b6",
  },
  {
    index: "04",
    icon: "∠",
    title: "Trigonometry",
    tag: "Angles & waves",
    description: "Discover the relationships between angles and sides.",
    accent: "#f7e2b6",
  },
  {
    index: "05",
    icon: "𝑝",
    title: "Probability",
    tag: "Chance & risk",
    description: "Measure uncertainty and predict likely outcomes.",
    accent: "#d9b6f7",
  },
  {
    index: "06",
    icon: "𝑥̄",
    title: "Statistics",
    tag: "Data & insight",
    description: "Analyze data and uncover patterns within it.",
    accent: "#b6f7e2",
  },
  {
    index: "07",
    icon: "∞",
    title: "Number Theory",
    tag: "Pure math",
    description: "Uncover the hidden structure behind numbers.",
    accent: "#f7c9b6",
  },
  {
    index: "08",
    icon: "𝑓(𝑥)",
    title: "Functions",
    tag: "Mappings",
    description: "See how inputs transform into outputs, visually.",
    accent: "#b6c9f7",
  },
  {
    index: "09",
    icon: "⊕",
    title: "Set Theory",
    tag: "Logic & structure",
    description: "Understand collections, logic and mathematical structure.",
    accent: "#e2f7b6",
  },
];

const TopicCard = ({ index, icon, title, tag, description, accent }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      {/* Faint giant index number in the background */}
      <span className="pointer-events-none absolute -right-2 -top-6 font-['Space_Grotesk'] text-6xl sm:text-8xl font-bold text-black/5 transition-colors duration-500 group-hover:text-black/10 select-none">
        {index}
      </span>

      <div className="relative flex items-center justify-between">
        <div
          className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl text-2xl sm:text-3xl shadow-sm transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
          style={{ backgroundColor: accent }}
        >
          {icon}
        </div>
        <span className="font-['Inter'] text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-black/40 font-semibold">
          {index}
        </span>
      </div>

      <span
        className="relative mt-4 sm:mt-6 inline-block rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 font-['Inter'] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-black/60"
        style={{ backgroundColor: `${accent}88` }}
      >
        {tag}
      </span>

      <h3 className="relative mt-3 sm:mt-4 font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#0B0F19]">
        {title}
      </h3>

      <p className="relative mt-2 sm:mt-3 font-['Inter'] text-xs sm:text-sm text-black/60 leading-relaxed">
        {description}
      </p>

      <div className="relative mt-4 sm:mt-6 flex items-center gap-2 font-['Inter'] text-xs sm:text-sm font-medium text-[#0B0F19] opacity-100 sm:opacity-0 transition-all duration-300 sm:group-hover:opacity-100">
        <span>Explore</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: accent }}
      />
    </div>
  );
};

const Explore = () => {
  const lineRef = useRef(null);
  const headingRef = useRef(null);
  const exploreRef = useRef(null);
  const emojiRef = useRef(null);

  useGSAP(() => {
    // Create a timeline for all animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: exploreRef.current,
        start: "top 75%",
        end: "top 25%",
        scrub: 1.5,
      },
    });

    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { x: -150, opacity: 1 },
        { x: 0, opacity: 0, duration: 2.5 },
        0
      );
    }

    tl.fromTo(
      exploreRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5 },
      0
    )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5 },
        0
      )
      .fromTo(
        emojiRef.current,
        { scale: 0, opacity: 0, rotate: -180 },
        { scale: 1, opacity: 0.8, rotate: 0, duration: 2.5 },
        0
      );
  }, []);

  return (
    <main>
      <section
        id="explore"
        className="relative min-h-screen overflow-hidden bg-[#f7efe3] px-4 sm:px-8 md:px-12 py-16 sm:py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            {/* Animated line (Hidden on mobile to avoid overflow) */}
            <div
              ref={lineRef}
              className="hidden sm:block absolute left-1/2 h-40 sm:h-50 top-20 sm:top-30 bottom-0 w-0.5 bg-black/20 pointer-events-none"
              style={{ transform: "translateX(-50%)" }}
            />

            <p
              ref={exploreRef}
              className="font-['Inter'] text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#8b7355]"
            >
              Explore
            </p>

            <h2
              ref={headingRef}
              className="mt-3 sm:mt-4 font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-7xl font-semibold leading-tight text-[#0B0F19]"
            >
              Mathematics
              <br />
              made visual.
            </h2>
          </div>

          {/* Scaled Division Sign */}
          <div
            ref={emojiRef}
            className="absolute right-[5%] sm:left-[65%] top-[8%] sm:top-[10%] z-10 text-[70px] sm:text-[150px] leading-none text-[#f7b6b6] select-none pointer-events-none"
          >
            ➗
          </div>

          {/* Cards Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
          <div className="mt-12 sm:mt-20 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <TopicCard key={topic.title} {...topic} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Explore;