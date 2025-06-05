
import { Progress } from '@/components/ui/progress';
import { User } from '../pages/Index';

interface XpTrackerProps {
  user: User;
}

const XpTracker = ({ user }: XpTrackerProps) => {
  const progressPercentage = (user.currentXp / user.xpToNext) * 100;

  return (
    <div className="p-4 bg-gray-850 border-b border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-green-400">⚡ XP Progress</span>
        <span className="text-sm text-gray-400">
          {user.currentXp} / {user.xpToNext}
        </span>
      </div>
      
      <div className="relative">
        <Progress 
          value={progressPercentage} 
          className="h-3 bg-gray-700 border border-gray-600"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-900 drop-shadow-sm">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>Level {user.level}</span>
        <span>{user.xpToNext - user.currentXp} XP to next level</span>
      </div>
    </div>
  );
};

export default XpTracker;
