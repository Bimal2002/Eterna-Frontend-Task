"use client";

import React from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setSearchQuery } from "@/store/tokens";

export default function Header() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.tokens.searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/95 backdrop-blur-xl">
      <div className="mx-auto px-8 md:px-12 lg:px-16 xl:px-24 py-6 md:py-7">
        <div className="flex items-center gap-5 max-w-[2000px] mx-auto min-h-[72px] md:min-h-[80px]">
          {/* Left: logo + nav */}
          <div className="flex items-center gap-6 md:gap-10 lg:gap-12">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 rounded-full bg-linear-to-br from-blue-500 to-purple-600 shrink-0" />
              <span className="text-[1.25rem] md:text-[1.4rem] lg:text-[1.5rem] font-bold text-white tracking-tight">
                AXIOM
              </span>
            </div>
            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="#"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                Discover
              </a>
              <a
                href="#"
                className="text-sm text-white font-semibold relative after:absolute after:-bottom-5 after:left-0 after:right-0 after:h-0.5 after:bg-white"
              >
                Pulse
              </a>
              <a
                href="#"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                Trackers
              </a>
              <a
                href="#"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                Perpetuals
              </a>
              <a
                href="#"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                Yield
              </a>
              <a
                href="#"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                Vision
              </a>
            </nav>
          </div>

          {/* Center: search (fills red-marked area) */}
          <div className="flex-1 flex items-center">
            <div className="relative w-full max-w-[720px] mx-auto">
              <input
                type="text"
                placeholder="Search tokens by name, symbol, or address..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg pl-3 pr-28 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
              <div className="absolute inset-y-0 right-1 flex items-center gap-1">
                <div className="hidden sm:flex items-center justify-center h-8 w-8 rounded-md bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
                  <Search className="h-4 w-4" />
                </div>
                <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900/80 border border-zinc-800 rounded-md text-[11px] text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
                  <Filter className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
                <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900/80 border border-zinc-800 rounded-md text-[11px] text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Advanced</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: SOL + Live */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-zinc-900/80 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer">
              <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-purple-500 shrink-0" />
              <span className="text-sm md:text-base text-white font-semibold">
                SOL
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/40">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-zinc-400 font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
