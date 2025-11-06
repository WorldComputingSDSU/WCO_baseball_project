import { mockPlayers, mockPitches } from "@/data/mockTrackManData";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  const hitters = mockPlayers.filter((p) => p.position === "Hitter");
  return hitters.map((player) => ({
    id: player.playerId,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HitterProfilePage({ params }: PageProps) {
  const { id } = await params;
  const player = mockPlayers.find((p) => p.playerId === id);
  
  if (!player || player.position !== "Hitter") {
    return (
      <div className="page-container">
        <div className="content-section pt-20 bg-black min-h-screen">
          <div className="content-container">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold text-white mb-4">Player Not Found</h1>
              <Link href="/hitters/" className="text-red-600 hover:text-red-500">
                Return to Hitters
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get all pitches for this hitter
  const hitterPitches = mockPitches.filter((p) => p.batterId === player.playerId);
  
  // Calculate additional stats
  const obp = player.atBats + player.walks > 0 
    ? ((player.hits + player.walks) / (player.atBats + player.walks)).toFixed(3)
    : "0.000";
  
  const slugging = player.atBats > 0 
    ? ((player.hits / player.atBats) * 2).toFixed(3) // Simplified SLG (assumes singles)
    : "0.000";
  
  const ops = (parseFloat(obp) + parseFloat(slugging)).toFixed(3);

  return (
    <div className="page-container">
      <div className="content-section pt-20 bg-black min-h-screen">
        <div className="content-container">
          {/* Back Button */}
          <Link 
            href="/hitters/" 
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Hitters
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
                <p className="text-sm text-gray-400 mb-1">Batting Average</p>
                <p className="text-3xl font-bold text-white">{player.battingAverage.toFixed(3)}</p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <p className="text-sm text-gray-400 mb-1">On-Base %</p>
                <p className="text-3xl font-bold text-white">{obp}</p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <p className="text-sm text-gray-400 mb-1">Slugging %</p>
                <p className="text-3xl font-bold text-white">{slugging}</p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <p className="text-sm text-gray-400 mb-1">OPS</p>
                <p className="text-3xl font-bold text-white">{ops}</p>
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
              <p className="text-3xl font-bold text-white">{player.atBats}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">At Bats</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <p className="text-3xl font-bold text-white">{player.hits}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">Hits</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <p className="text-3xl font-bold text-white">{player.homeRuns}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">Home Runs</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <p className="text-3xl font-bold text-white">{player.rbi}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">RBI</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <p className="text-3xl font-bold text-white">{player.strikeouts}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">Strikeouts</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <p className="text-3xl font-bold text-white">{player.walks}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide mt-2">Walks</p>
            </div>
          </div>

          {/* Pitch Data Section */}
          {hitterPitches.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Recent At-Bats</h2>
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900 border-b border-gray-700">
                      <tr>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pitcher</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Inning</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vel</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Spin</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vert Break</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Horz Break</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Exit Vel</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Angle</th>
                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {hitterPitches.map((pitch, idx) => (
                        <tr key={idx} className="hover:bg-gray-750">
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{pitch.date}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{pitch.pitcher}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{pitch.inning}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{pitch.taggedPitchType}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{pitch.relSpeed} mph</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{pitch.spinRate}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{pitch.vertBreak}&quot;</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{pitch.horzBreak}&quot;</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{pitch.exitSpeed ? `${pitch.exitSpeed} mph` : '—'}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{pitch.angle ? `${pitch.angle.toFixed(1)}°` : '—'}</td>
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
