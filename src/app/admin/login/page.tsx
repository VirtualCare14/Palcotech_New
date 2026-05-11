"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: false,
    });

    setLoading(false);

    if (!res || res.error) {
      setError(res?.error || "Invalid email or password.");
      return;
    }

    window.location.href = res.url || "/admin";
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-4 py-16">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-sky-100 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Admin Login</h1>
        <p className="mt-1 text-sm text-slate-600">
          Sign in to manage Palcotech Engineering.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none ring-sky-200 focus:ring"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="palcotech@gmail.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none ring-sky-200 focus:ring"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-xs text-slate-500">
            Tip: You can change admin credentials via env variables.
          </p>
        </form>
      </div>
    </div>
  );
}

