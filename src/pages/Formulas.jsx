import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CATEGORY_META = {
  Algebra: { icon: "∑", accent: "#f7b6b6" },
  Calculus: { icon: "∫", accent: "#b6d7f7" },
  Geometry: { icon: "△", accent: "#c3f7b6" },
  Trigonometry: { icon: "∠", accent: "#f7e2b6" },
};

const FORMULAS_DATA = [
  {
    category: "Algebra",
    title: "Quadratic Formula",
    formula: "x = (-b ± √(b² - 4ac)) / 2a",
    desc: "Solve quadratic equations",
  },
  {
    category: "Algebra",
    title: "Difference of Squares",
    formula: "a² - b² = (a + b)(a - b)",
    desc: "Factor quadratic expressions",
  },
  {
    category: "Calculus",
    title: "Power Rule",
    formula: "d/dx(xⁿ) = n·xⁿ⁻¹",
    desc: "Derivative of power functions",
  },
  {
    category: "Calculus",
    title: "Product Rule",
    formula: "d/dx(f·g) = f'g + fg'",
    desc: "Derivative of products",
  },
  {
    category: "Geometry",
    title: "Pythagorean Theorem",
    formula: "a² + b² = c²",
    desc: "Relationship in right triangles",
  },
  {
    category: "Geometry",
    title: "Circle Area",
    formula: "A = πr²",
    desc: "Area of a circle",
  },
  {
    category: "Trigonometry",
    title: "Sine",
    formula: "sin(θ) = opposite/hypotenuse",
    desc: "Sine ratio",
  },
  {
    category: "Trigonometry",
    title: "Cosine",
    formula: "cos(θ) = adjacent/hypotenuse",
    desc: "Cosine ratio",
  },
  {
    category: "Algebra",
    title: "Arithmetic Sequence",
    formula: "aₙ = a₁ + (n-1)d",
    desc: "nth term of sequence",
  },
  {
    category: "Calculus",
    title: "Chain Rule",
    formula: "d/dx(f(g(x))) = f'(g(x))·g'(x)",
    desc: "Derivative of composite functions",
  },
  {
    category: "Geometry",
    title: "Sphere Volume",
    formula: "V = (4/3)πr³",
    desc: "Volume of a sphere",
  },
  {
    category: "Trigonometry",
    title: "Tangent",
    formula: "tan(θ) = opposite/adjacent",
    desc: "Tangent ratio",
  },
];

const Formulas = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const categories = ["all", "Algebra", "Calculus", "Geometry", "Trigonometry"];
  const filtered =
    activeCategory === "all"
      ? FORMULAS_DATA
      : FORMULAS_DATA.filter((f) => f.category === activeCategory);

  useGSAP(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );
    }

    // Animate cards on scroll
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.04,
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 70%",
              scrub: 1,
            },
          }
        );
      }
    });
  }, [activeCategory]);

  return (
    <section id="formulas">
      <div className="relative min-h-screen overflow-hidden bg-[#f7efe3] px-4 sm:px-8 md:px-12 py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div>
            <p className="font-['Inter'] text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#8b7355]">
              Formulas
            </p>
            <h2
              ref={headingRef}
              className="mt-3 sm:mt-4 font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-7xl font-semibold leading-tight text-[#0B0F19]"
            >
              Essential math
              <br className="hidden sm:block" /> formulas.
            </h2>
            <p className="mt-4 sm:mt-6 max-w-xl font-['Inter'] text-sm sm:text-base md:text-lg text-black/60 leading-relaxed">
              A quick-reference library of the formulas that matter most —
              filter by topic and keep the ones you need close at hand.
            </p>
          </div>

          {/* Category Filter - Scrollable horizontally on mobile */}
          <div className="mt-8 sm:mt-12 flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 pt-1 touch-pan-x no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const meta = CATEGORY_META[cat];
              return (
                <button
                  key={cat}
                  onClick={() => {
                    cardsRef.current = [];
                    setActiveCategory(cat);
                  }}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 font-['Inter'] text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#0B0F19] text-white shadow-lg shadow-black/10 scale-105"
                      : "bg-black/5 text-black/60 hover:bg-black/10 hover:text-black"
                  }`}
                >
                  {meta && (
                    <span className="text-sm sm:text-base leading-none">
                      {meta.icon}
                    </span>
                  )}
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              );
            })}
          </div>

          {/* Formulas Grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
          <div className="mt-8 sm:mt-16 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((formula, index) => {
              const meta = CATEGORY_META[formula.category] ?? {
                icon: "∑",
                accent: "#e5e5e5",
              };
              return (
                <div
                  key={`${formula.title}-${index}`}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span
                        className="inline-block rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 font-['Inter'] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-black/70"
                        style={{ backgroundColor: `${meta.accent}88` }}
                      >
                        {formula.category}
                      </span>
                      <h3 className="mt-2.5 sm:mt-3 font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-[#0B0F19]">
                        {formula.title}
                      </h3>
                    </div>
                    <div
                      className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl text-lg sm:text-xl shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                      style={{ backgroundColor: meta.accent }}
                    >
                      {meta.icon}
                    </div>
                  </div>

                  {/* Formula Display Box */}
                  <div className="mt-4 sm:mt-5 rounded-xl border border-black/10 bg-black/5 p-3.5 sm:p-4 transition-colors duration-300 group-hover:bg-black/10">
                    <p className="wrap-break-word text-center font-mono text-xs sm:text-sm font-semibold text-[#0B0F19]">
                      {formula.formula}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-3 sm:mt-4 font-['Inter'] text-xs sm:text-sm text-black/60 leading-relaxed">
                    {formula.desc}
                  </p>

                  {/* Bottom accent bar */}
                  <div
                    className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: meta.accent }}
                  />
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="mt-16 py-12 text-center">
              <p className="font-['Inter'] text-base text-black/60">
                No formulas found in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Formulas;