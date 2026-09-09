import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Explore from "./Explore";
import Formulas from "./Formulas";
import Visualizer from "./Visualizer";
import About from "./About";
import { supabase } from "../supabaseClient";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("Current session:", data.session);
    });
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background moves slowly
      gsap.to(".parallax-bg", {
        y: 180,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Large shapes
      gsap.to(".parallax-slow", {
        y: -180,
        rotate: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Medium shapes
      gsap.to(".parallax-medium", {
        y: -300,
        rotate: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Fast shapes
      gsap.to(".parallax-fast", {
        y: -450,
        rotate: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Hero text moves away
      gsap.to(".hero-content", {
        y: -250,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "80% top",
          scrub: 1,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef}>
      <section className="hero relative min-h-screen h-screen overflow-hidden bg-[#f7efe3] flex flex-col justify-between">
        {/* Background Parallax Layer */}
        <div
          className="parallax-bg absolute inset-[-10%] z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/math-bg.png')" }}
        />

        {/* Decorative Floating Shapes - Scaled for Mobile/Desktop */}
        <div className="parallax-medium absolute left-[5%] sm:left-[12%] top-[12%] sm:top-[20%] z-10 text-[80px] sm:text-[150px] leading-none text-[#f7b6b6] select-none pointer-events-none">
          ×
        </div>

        <div className="parallax-fast absolute -right-6 sm:-right-7.5 top-[10%] sm:top-[15%] z-10 h-20 w-20 sm:h-36 sm:w-36 rounded-full bg-[#ff4b1f]" />

        <div className="parallax-fast absolute left-[4%] sm:left-[6%] top-[65%] sm:top-[50%] z-10 h-5 w-5 sm:h-8 sm:w-8 rounded-full bg-[#333]" />

        <div className="parallax-medium absolute -bottom-10 sm:-bottom-15 right-[5%] sm:right-[10%] z-10 text-[100px] sm:text-[170px] leading-none text-[#f7b6b6] select-none pointer-events-none">
          ×
        </div>

        {/* Hero Content Area */}
        <div className="hero-content relative z-30 flex h-full items-center justify-center px-6 sm:px-12 pt-16 pb-20">
          <div className="w-full max-w-5xl text-left">
            <p className="mb-3 sm:mb-4 font-['Inter'] text-xs sm:text-base md:text-lg uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#8b7355] font-semibold">
              Interactive Mathematics
            </p>

            <h1 className="font-['Space_Grotesk'] text-4xl sm:text-6xl md:text-7xl font-semibold leading-tight text-[#0B0F19]">
              See the formula.
            </h1>

            <h2 className="font-['Inter'] text-2xl sm:text-4xl md:text-6xl leading-tight text-[#0B0F19]/90 mt-1">
              Understand the formula.
            </h2>

            <p className="mt-4 sm:mt-6 max-w-xl font-['Inter'] text-sm sm:text-base md:text-lg text-black/70 leading-relaxed">
              Explore mathematical formulas through interactive visualizations,
              graphs and animations.
            </p>

            {/* Action Buttons: Stacks on mobile, inline on sm+ */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <a href="#visualizer" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto rounded-full bg-[#ff4b1f] px-7 py-3.5 sm:py-3 text-sm sm:text-base font-medium text-white transition hover:-translate-y-1 cursor-pointer shadow-md">
                  Start Visualizing
                </button>
              </a>

              <a href="#formulas" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto rounded-full border border-black/30 px-7 py-3.5 sm:py-3 text-sm sm:text-base font-medium text-[#0B0F19] transition hover:-translate-y-1 hover:border-black cursor-pointer bg-white/30 backdrop-blur-xs">
                  Explore Formulas
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 font-['Inter'] text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] text-black/60 pointer-events-none">
          Scroll ↓
        </div>
      </section>

      {/* Page Sections */}
      <Explore />
      <About />
      <Formulas />
      <Visualizer />
    </main>
  );
};

export default Home;