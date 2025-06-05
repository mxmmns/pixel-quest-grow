
import { Button } from '@/components/ui/button';

interface PresetTask {
  text: string;
  xp: number;
  gems: number;
  icon: string;
  category: string;
}

interface PresetTasksProps {
  onAddTask: (task: { text: string; xp: number; gems: number }) => void;
}

const presetTasks: PresetTask[] = [
  { text: "30min workout", xp: 25, gems: 5, icon: "💪", category: "Fitness" },
  { text: "Read for 20 minutes", xp: 20, gems: 4, icon: "📚", category: "Learning" },
  { text: "10min meditation", xp: 15, gems: 3, icon: "🧘", category: "Mindfulness" },
  { text: "Get sunlight (15min)", xp: 15, gems: 3, icon: "☀️", category: "Health" },
  { text: "Practice language", xp: 20, gems: 4, icon: "🌍", category: "Learning" },
  { text: "Play instrument", xp: 20, gems: 4, icon: "🎵", category: "Creative" },
  { text: "Drink 8 glasses water", xp: 10, gems: 2, icon: "💧", category: "Health" },
  { text: "7+ hours sleep", xp: 20, gems: 4, icon: "😴", category: "Health" },
];

const PresetTasks = ({ onAddTask }: PresetTasksProps) => {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center space-x-2">
        <span className="text-lg">⭐</span>
        <h3 className="text-lg font-bold text-green-100">Quick Add</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {presetTasks.map((preset, index) => (
          <Button
            key={index}
            onClick={() => onAddTask(preset)}
            variant="outline"
            className="h-auto p-3 bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-green-500 text-left flex flex-col items-start space-y-1 transition-all"
          >
            <div className="flex items-center space-x-1 w-full">
              <span className="text-lg">{preset.icon}</span>
              <span className="text-xs text-gray-400 ml-auto">{preset.category}</span>
            </div>
            <span className="text-sm font-medium text-green-100 leading-tight">
              {preset.text}
            </span>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-yellow-400">⚡{preset.xp}</span>
              <span className="text-blue-400">💎{preset.gems}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PresetTasks;
