import { mockPlayers, mockPitches } from "@/data/mockTrackManData";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  const pitchers = mockPlayers.filter((p) => p.position === "Pitcher");
  return pitchers.map((player) => ({
    id: player.playerId,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PitcherProfilePage({ params }: PageProps) {
  const { id } = await params;
  const player = mockPlayers.find((p) => p.playerId === id);
  
  if (!player || player.position !== "Pitcher") {
    return (
      <div className="page-container">
        <div className="content-section pt-20 bg-black min-h-screen">
          <div className="content-container">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold text-white mb-4">Player Not Found</h1>
              <Link href="/pitchers/" className="text-red-600 hover:text-red-500">
                Return to Pitchers
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get all pitches for this pitcher
  const pitcherPitches = mockPitches.filter((p) => p.pitcherId === player.playerId);
  
  // Calculate additional stats (mock calculations until we have IP data)
  const inningsPitched = player.games * 3; // Mock: 3 IP per game
  const whip = inningsPitched > 0 ? ((player.walks + player.hits) / inningsPitched).toFixed(3) : "0.000";
  const kPer9 = inningsPitched > 0 ? ((player.strikeouts / inningsPitched) * 9).toFixed(1) : "0.0";
  const bbPer9 = inningsPitched > 0 ? ((player.walks / inningsPitched) * 9).toFixed(1) : "0.0";

  return (
    <div className="page-container">
      <div className="content-section pt-20 bg-black min-h-screen">
        <div className="content-container">
          {/* Back Button */}
          <Link 
            href="/pitchers/" 
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Pitchers
          </Link>

          {/* Player Header */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-3xl mr-6">
                {player.playerName.charAt(0)}
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{player.playerName}</h1>
                <p className="text-gray-400 text-lg">#{player.playerId} • {player.position}</p>
              </div>
            </div>

            {/* Primary Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border-l-4 border-red-600 pl-4">
                <p className="text-sm text-gray-400 mb-1">Avg Velocity</p>
                <p className="text-3xl font-bold text-white">
                  {player.avgVelocity?.toFixed(1)}<span className="text-lg"> mph</span>
                </p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <p className="text-sm text-gray-400 mb-1">Max Velocity</p>
                <p className="text-3xl font-bold text-white">
                  {player.maxVelocity?.toFixed(1)}<span className="text-lg"> mph</span>
                </p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <p className="text-sm text-gray-400 mb-1">ERA</p>
                <p className="text-3xl font-bold text-white">{player.era?.toFixed(2)}</p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <p className="text-sm text-gray-400 mb-1">WHIP</p>
                <p className="text-3xl font-bold text-white">{whip}</p>
              </div>
            </div>
          </div>

          {/* Secondary Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <p className="text-3xl font-bold text-white">{player.games}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">Games</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <p className="text-3xl font-bold text-white">{inningsPitched.toFixed(1)}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">IP</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <p className="text-3xl font-bold text-white">{player.strikeouts}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">Strikeouts</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <p className="text-3xl font-bold text-white">{kPer9}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">K/9</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <p className="text-3xl font-bold text-white">{player.walks}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">Walks</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <p className="text-3xl font-bold text-white">{bbPer9}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">BB/9</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <p className="text-3xl font-bold text-white">{player.spinRate?.toLocaleString()}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">Spin Rate</p>
            </div>
          </div>

          {/* Pitch Data Section */}
          {pitcherPitches.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Pitches</h2>
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900 border-b border-gray-700">
                      <tr>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Batter</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Inning</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vel</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Spin</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vert Break</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Horz Break</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {pitcherPitches.map((pitch, idx) => (
                        <tr key={idx} className="hover:bg-gray-750">
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{pitch.date}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{pitch.batter}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{pitch.inning}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{pitch.taggedPitchType}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{pitch.relSpeed} mph</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{pitch.spinRate}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{pitch.vertBreak}&quot;</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{pitch.horzBreak}&quot;</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                            {pitch.korBB || pitch.pitchCall}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
