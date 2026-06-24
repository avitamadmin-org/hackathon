"use client";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-4">
      <div className="max-w-md w-full text-center">
        {/* Decorative element */}
        <div className="relative inline-block">
          <div className="absolute inset-0 blur-3xl bg-indigo-200/50 rounded-full -z-10 animate-pulse" />
          <h1 className="text-8xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-slate-800">
          Page not found
        </h2>

        <p className="mt-2 text-slate-500 text-base leading-relaxed">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          {/* <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            Go Back
          </Link> */}

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Optional: Helpful links */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-400">
            Need help?{" "}
            <Link href="/contact" className="text-indigo-600 hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
