"use client";

import { useState } from "react";
import { mockPlayers } from "@/data/mockTrackManData";

export default function CatchersPage() {
  const catchers = mockPlayers.filter((player) => player.position === "Catcher");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCatchers = catchers.filter((player) =>
    player.playerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="content-section pt-20 bg-black min-h-screen">
        <div className="content-container">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Catchers</h1>
            <p className="text-gray-400 text-lg font-light">
              View and analyze catcher performance statistics and metrics.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search catchers by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Catchers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatchers.map((player) => (
              <div
                key={player.playerId}
                className="group bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  {/* Header with avatar and name */}
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-xl mr-3">
                      {player.playerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {player.playerName}
                      </h3>
                      <p className="text-sm text-gray-400">#{player.playerId}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-4">
                    {/* Primary stat */}
                    <div className="border-l-4 border-red-600 pl-4">
                      <p className="text-sm text-gray-400 mb-1">Games</p>
                      <p className="text-3xl font-bold text-white">
                        {player.games}
                      </p>
                    </div>

                    {/* Secondary stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center py-3 bg-gray-900 rounded-lg border border-gray-700">
                        <p className="text-2xl font-bold text-white">{player.atBats}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">AB</p>
                      </div>
                      <div className="text-center py-3 bg-gray-900 rounded-lg border border-gray-700">
                        <p className="text-2xl font-bold text-white">{player.hits}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Hits</p>
                      </div>
                      <div className="text-center py-3 bg-gray-900 rounded-lg border border-gray-700">
                        <p className="text-2xl font-bold text-white">{player.homeRuns}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">HR</p>
                      </div>
                      <div className="text-center py-3 bg-gray-900 rounded-lg border border-gray-700">
                        <p className="text-2xl font-bold text-white">{player.rbi}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">RBI</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCatchers.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 mb-4 border border-gray-800">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">
                No catchers found matching &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
