"use client";

import { useState } from "react";
import { mockPlayers } from "@/data/mockTrackManData";

export default function RosterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState<string>("All");

  const positions = ["All", "Pitcher", "Hitter", "Catcher"];
  const filteredPlayers = mockPlayers.filter((player) => {
    const matchesSearch = player.playerName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPosition =
      positionFilter === "All" || player.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  return (
    <div className="page-container">
      <div className="content-section bg-black min-h-screen">
        <div className="content-container">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Roster</h1>
            <p className="text-gray-400 text-lg font-light">
              View the complete team roster and player information.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search players by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all"
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
            <div className="flex gap-2 flex-wrap">
              {positions.map((position) => (
                <button
                  key={position}
                  onClick={() => setPositionFilter(position)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    positionFilter === position
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                  }`}
                >
                  {position}
                </button>
              ))}
            </div>
          </div>

          {/* Players Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlayers.map((player) => (
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
                      <p className="text-sm text-gray-400">#{player.playerId} • {player.position}</p>
                    </div>
                  </div>

                  {/* Player Stats */}
                  <div className="space-y-4">
                    {player.position === "Pitcher" ? (
                      <>
                        {/* Pitcher stats */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border-l-4 border-red-600 pl-4">
                            <p className="text-xs text-gray-400 uppercase mb-1">Avg Velocity</p>
                            <p className="text-2xl font-bold text-white">
                              {player.avgVelocity?.toFixed(1)}<span className="text-sm"> mph</span>
                            </p>
                          </div>
                          <div className="border-l-4 border-red-600 pl-4">
                            <p className="text-xs text-gray-400 uppercase mb-1">Max Velocity</p>
                            <p className="text-2xl font-bold text-white">
                              {player.maxVelocity?.toFixed(1)}<span className="text-sm"> mph</span>
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center py-3 bg-gray-900 rounded-lg border border-gray-700">
                            <p className="text-2xl font-bold text-white">{player.spinRate}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Spin Rate</p>
                          </div>
                          <div className="text-center py-3 bg-gray-900 rounded-lg border border-gray-700">
                            <p className="text-2xl font-bold text-white">{player.era?.toFixed(2)}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">ERA</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Hitter/Catcher stats */}
                        <div className="border-l-4 border-red-600 pl-4">
                          <p className="text-sm text-gray-400 mb-1">Batting Average</p>
                          <p className="text-3xl font-bold text-white">
                            {player.battingAverage.toFixed(3)}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center py-3 bg-gray-900 rounded-lg border border-gray-700">
                            <p className="text-2xl font-bold text-white">{player.hits}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Hits</p>
                          </div>
                          <div className="text-center py-3 bg-gray-900 rounded-lg border border-gray-700">
                            <p className="text-2xl font-bold text-white">{player.homeRuns}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">HR</p>
                          </div>
                          <div className="text-center py-3 bg-gray-900 rounded-lg border border-gray-700">
                            <p className="text-2xl font-bold text-white">{player.rbi}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">RBI</p>
                          </div>
                          <div className="text-center py-3 bg-gray-900 rounded-lg border border-gray-700">
                            <p className="text-2xl font-bold text-white">{player.strikeouts}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">SO</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 mb-4 border border-gray-800">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">
                No players found{" "}
                {searchQuery ? `matching "${searchQuery}"` : ""}
                {positionFilter !== "All" ? `in position "${positionFilter}"` : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
