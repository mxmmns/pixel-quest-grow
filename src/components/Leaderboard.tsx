
interface LeaderboardEntry {
  rank: number;
  name: string;
  level: number;
  xp: number;
  badge: string;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "PixelMaster", level: 15, xp: 2840, badge: "👑" },
  { rank: 2, name: "QuestSeeker", level: 12, xp: 2156, badge: "🥈" },
  { rank: 3, name: "XPHunter", level: 11, xp: 1987, badge: "🥉" },
  { rank: 4, name: "You", level: 1, xp: 120, badge: "⚡" },
  { rank: 5, name: "NoviceWarrior", level: 8, xp: 1654, badge: "🛡️" },
  { rank: 6, name: "TaskMaster", level: 7, xp: 1432, badge: "⭐" },
];

const Leaderboard = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-lg">🏆</span>
        <h2 className="text-lg font-bold text-green-100">Bronze League</h2>
      </div>

      <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
        <h3 className="text-sm font-bold text-green-400 mb-3">Current Season</h3>
        <div className="text-xs text-gray-400 mb-4">
          7 days remaining • Top 3 advance to Silver League!
        </div>
        
        <div className="space-y-3">
          {mockLeaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                entry.name === "You"
                  ? 'bg-green-900/30 border border-green-700'
                  : 'bg-gray-800 border border-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center text-sm font-bold">
                  {entry.rank}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-green-100">{entry.name}</span>
                    <span>{entry.badge}</span>
                  </div>
                  <div className="text-xs text-gray-400">Level {entry.level}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-bold text-green-400">{entry.xp}</div>
                <div className="text-xs text-gray-400">XP</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
        <h3 className="text-sm font-bold text-green-400 mb-2">League Rewards</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex justify-between">
            <span>🥇 1st Place</span>
            <span className="text-yellow-400">+200 💎 + Special Badge</span>
          </div>
          <div className="flex justify-between">
            <span>🥈 2nd Place</span>
            <span className="text-blue-400">+100 💎</span>
          </div>
          <div className="flex justify-between">
            <span>🥉 3rd Place</span>
            <span className="text-orange-400">+50 💎</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
