import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AuthModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let authError;

    if (isSignUp) {
      // Store custom username in Supabase user_metadata
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username.trim(),
          },
        },
      });
      authError = error;
    } else {
      // Sign in
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      authError = error;
    }

    if (authError) {
      setError(authError.message);
    } else {
      onClose();
    }
    setLoading(false);
  };

  // --- Display Name Fallback Logic ---
  // 1. Uses the typed username if provided.
  // 2. Otherwise extracts the prefix before '@' from the email.
  const emailPrefix = email.includes("@") ? email.split("@")[0] : email;
  const displayName = username.trim() || emailPrefix.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-[#F5EDE0] rounded-2xl p-8 shadow-2xl border border-black/10 relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-black/60 hover:text-black font-bold text-xl cursor-pointer"
        >
          ✕
        </button>

        {/* Tab Switcher */}
        <div className="flex bg-black/5 p-1 rounded-xl mb-6 font-['Space_Grotesk']">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              setError(null);
            }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              !isSignUp ? "bg-[#0B0F19] text-white shadow-sm" : "text-[#8b7355] hover:text-black"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              setError(null);
            }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              isSignUp ? "bg-[#0B0F19] text-white shadow-sm" : "text-[#8b7355] hover:text-black"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Dynamic Title with Welcome Back Fallback */}
        <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-[#0B0F19] mb-1">
          {isSignUp 
            ? "Create Mathviz Account" 
            : displayName 
              ? `Welcome Back, ${displayName}` 
              : "Welcome Back"
          }
        </h2>
        <p className="text-sm text-[#8b7355] mb-6 font-['Inter']">
          {isSignUp 
            ? "Sign up to save your formulas & graphs" 
            : "Sign in to access your saved visualizer data"
          }
        </p>

        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-xs font-['Inter']">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuth} className="flex flex-col gap-3.5 font-['Inter']">
          
          {/* USERNAME (Sign Up mode only) */}
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-[#5a4a3a] mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[#0B0F19] outline-none focus:border-black"
              />
            </div>
          )}

          {/* EMAIL */}
          <div>
            <label className="block text-xs font-semibold text-[#5a4a3a] mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[#0B0F19] outline-none focus:border-black"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-xs font-semibold text-[#5a4a3a] mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[#0B0F19] outline-none focus:border-black"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full rounded-xl bg-[#0B0F19] py-3.5 text-sm font-semibold text-white transition-all hover:bg-black disabled:opacity-50 cursor-pointer shadow-md"
          >
            {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
} 