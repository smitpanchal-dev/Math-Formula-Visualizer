import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import * as math from "mathjs";

const PRESETS = [
  { label: "Sine Wave", fn: "sin(a * x)", a: 1, b: 0, c: 0 },
  { label: "Cosine Wave", fn: "cos(a * x)", a: 1, b: 0, c: 0 },
  { label: "Quadratic", fn: "a * x^2 + b * x + c", a: 1, b: 0, c: -4 },
  { label: "Cubic", fn: "a * x^3 - 3 * x", a: 1, b: 0, c: 0 },
  { label: "Damped Wave", fn: "exp(-0.2 * x) * sin(a * x)", a: 2, b: 0, c: 0 },
  { label: "Gaussian", fn: "exp(-a * x^2)", a: 0.5, b: 0, c: 0 },
];

const Visualizer = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [expression, setExpression] = useState("sin(a * x)");
  const [paramA, setParamA] = useState(1);
  const [paramB, setParamB] = useState(0);
  const [paramC, setParamC] = useState(0);
  const [scale, setScale] = useState(40);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Compile expression & derive error state with useMemo
  const { compiledFn, error } = useMemo(() => {
    try {
      const fn = math.compile(expression);
      return { compiledFn: fn, error: null };
    } catch {
      return { compiledFn: null, error: "Invalid syntax or unsupported formula" };
    }
  }, [expression]);

  // Core Canvas Drawing Engine
  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const originX = width / 2 + offset.x;
    const originY = height / 2 + offset.y;

    ctx.clearRect(0, 0, width, height);

    // 1. Grid Lines & Axis Labels
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
    ctx.fillStyle = "#8b7355";
    ctx.font = "11px 'Inter', sans-serif";

    const gridSize = scale;

    // Vertical grid ticks
    const startX = Math.floor(-originX / gridSize) * gridSize;
    for (let x = startX; x < width - originX; x += gridSize) {
      const screenX = originX + x;
      ctx.beginPath();
      ctx.moveTo(screenX, 0);
      ctx.lineTo(screenX, height);
      ctx.stroke();

      const unitValue = Math.round(x / scale);
      if (unitValue !== 0) {
        ctx.fillText(
          unitValue.toString(),
          screenX - 6,
          Math.min(Math.max(originY + 16, 20), height - 10)
        );
      }
    }

    // Horizontal grid ticks
    const startY = Math.floor(-originY / gridSize) * gridSize;
    for (let y = startY; y < height - originY; y += gridSize) {
      const screenY = originY + y;
      ctx.beginPath();
      ctx.moveTo(0, screenY);
      ctx.lineTo(width, screenY);
      ctx.stroke();

      const unitValue = Math.round(-y / scale);
      if (unitValue !== 0) {
        ctx.fillText(
          unitValue.toString(),
          Math.min(Math.max(originX + 8, 8), width - 30),
          screenY + 4
        );
      }
    }

    // 2. Primary Axes
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(11, 15, 25, 0.35)";

    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // 3. Evaluate and Plot Function
    if (compiledFn) {
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#ff4b1f";
      ctx.beginPath();

      let isDrawing = false;
      const step = 1;

      for (let px = 0; px <= width; px += step) {
        const mathX = (px - originX) / scale;
        let mathY;

        try {
          mathY = compiledFn.evaluate({
            x: mathX,
            a: paramA,
            b: paramB,
            c: paramC,
            pi: Math.PI,
            e: Math.E,
          });
        } catch {
          mathY = NaN;
        }

        if (typeof mathY === "number" && !isNaN(mathY) && isFinite(mathY)) {
          const py = originY - mathY * scale;

          if (!isDrawing) {
            ctx.moveTo(px, py);
            isDrawing = true;
          } else {
            ctx.lineTo(px, py);
          }
        } else {
          isDrawing = false;
        }
      }

      ctx.stroke();
    }
  }, [compiledFn, paramA, paramB, paramC, scale, offset]);

  // High-DPI & Responsive Resize Handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      drawGraph();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawGraph]);

  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  // Mouse Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch Handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setOffset({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Zoom Handler
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setScale((prev) => Math.min(Math.max(prev * zoomFactor, 10), 200));
  };

  const selectPreset = (preset) => {
    setExpression(preset.fn);
    setParamA(preset.a);
    setParamB(preset.b);
    setParamC(preset.c);
    setOffset({ x: 0, y: 0 });
    setScale(40);
  };

  return (
    <section
      id="visualizer"
      className="relative min-h-screen bg-[#f7efe3] px-4 sm:px-8 md:px-12 py-16 sm:py-24 overflow-hidden font-['Inter']"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="font-['Inter'] text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#8b7355]">
            Interactive Visualizer
          </p>
          <h2 className="mt-3 sm:mt-4 font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B0F19]">
            Plot, tweak & explore math functions.
          </h2>
          <p className="mt-3 sm:mt-4 font-['Inter'] text-sm sm:text-base text-black/60 leading-relaxed">
            Enter a custom formula or pick a preset. Drag to pan and zoom to examine coordinates.
          </p>
        </div>

        {/* Responsive Workspace Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start">
          {/* Controls Sidebar */}
          <div className="order-2 lg:order-1 rounded-2xl sm:rounded-3xl border border-black/10 bg-white/70 backdrop-blur-md p-4 sm:p-6 shadow-sm flex flex-col gap-4 sm:gap-5">
            {/* Expression Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5a4a3a] mb-1.5 font-['Inter']">
                Function $f(x)$
              </label>
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="e.g. sin(a * x) + b"
                className="w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-mono text-[#0B0F19] outline-none transition-colors focus:border-black shadow-inner"
              />
              {error && (
                <p className="mt-1.5 text-xs text-red-600 font-['Inter']">
                  {error}
                </p>
              )}
            </div>

            {/* Presets List */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5a4a3a] mb-1.5 font-['Inter']">
                Presets
              </label>
              <div className="flex flex-nowrap sm:flex-wrap gap-1.5 overflow-x-auto pb-1.5 sm:pb-0 touch-pan-x no-scrollbar -mx-1 px-1 sm:mx-0 sm:px-0">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => selectPreset(p)}
                    className="shrink-0 rounded-lg border border-black/10 bg-white/80 px-2.5 py-1.5 font-['Inter'] text-xs font-medium text-[#0B0F19] transition-all hover:bg-[#0B0F19] hover:text-white cursor-pointer active:scale-95 shadow-2xs"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Parametric Sliders */}
            <div className="flex flex-col gap-3 pt-2.5 border-t border-black/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5a4a3a] font-['Inter']">
                Parameters
              </span>

              {/* Slider A */}
              <div>
                <div className="flex justify-between font-['Space_Grotesk'] text-xs font-semibold text-[#0B0F19] mb-1">
                  <span>Parameter a</span>
                  <span className="font-mono">{paramA.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.05"
                  value={paramA}
                  onChange={(e) => setParamA(parseFloat(e.target.value))}
                  className="w-full accent-[#ff4b1f] cursor-pointer"
                />
              </div>

              {/* Slider B */}
              <div>
                <div className="flex justify-between font-['Space_Grotesk'] text-xs font-semibold text-[#0B0F19] mb-1">
                  <span>Parameter b</span>
                  <span className="font-mono">{paramB.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="0.1"
                  value={paramB}
                  onChange={(e) => setParamB(parseFloat(e.target.value))}
                  className="w-full accent-[#ff4b1f] cursor-pointer"
                />
              </div>

              {/* Slider C */}
              <div>
                <div className="flex justify-between font-['Space_Grotesk'] text-xs font-semibold text-[#0B0F19] mb-1">
                  <span>Parameter c</span>
                  <span className="font-mono">{paramC.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="0.1"
                  value={paramC}
                  onChange={(e) => setParamC(parseFloat(e.target.value))}
                  className="w-full accent-[#ff4b1f] cursor-pointer"
                />
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-2 border-t border-black/10">
              <button
                onClick={() => {
                  setOffset({ x: 0, y: 0 });
                  setScale(40);
                }}
                className="w-full rounded-xl bg-black/5 hover:bg-black/10 font-['Inter'] text-xs font-semibold py-2.5 text-[#0B0F19] transition-all cursor-pointer active:scale-98"
              >
                Reset Canvas View
              </button>
            </div>
          </div>

          {/* Graph Canvas Card */}
          <div
            ref={containerRef}
            className="order-1 lg:order-2 relative rounded-2xl sm:rounded-3xl border border-black/10 bg-white shadow-lg overflow-hidden h-70 sm:h-85 md:h-100 lg:h-115 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
          >
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
              className="w-full h-full block"
            />

            {/* Zoom Controls & Percentage Indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <div className="bg-white/90 backdrop-blur-md border border-black/10 px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-['Inter'] text-black/60 pointer-events-none select-none">
                {Math.round((scale / 40) * 100)}%
              </div>
              <button
                onClick={() => setScale((prev) => Math.min(prev * 1.2, 200))}
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-black/10 bg-white/90 font-['Space_Grotesk'] font-bold text-xs text-[#0B0F19] shadow-xs active:scale-95 cursor-pointer"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={() => setScale((prev) => Math.max(prev * 0.8, 10))}
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-black/10 bg-white/90 font-['Space_Grotesk'] font-bold text-xs text-[#0B0F19] shadow-xs active:scale-95 cursor-pointer"
                title="Zoom Out"
              >
                −
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visualizer;