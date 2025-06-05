
import { User } from '../pages/Index';

interface HeaderProps {
  user: User;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <div className="bg-gray-900 p-4 border-b border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-900 border-2 border-green-300 shadow-lg">
            {user.level}
          </div>
          <div>
            <h1 className="text-lg font-bold text-green-100">Pixel Quest</h1>
            <p className="text-sm text-gray-400">Level {user.level} Warrior</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center justify-end space-x-1 mb-1">
            <span className="text-2xl">💎</span>
            <span className="text-lg font-bold text-green-400">{user.gems}</span>
          </div>
          <div className="text-xs text-gray-400">
            {user.completedToday} tasks today
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
