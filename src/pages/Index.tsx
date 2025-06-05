
import { useState } from 'react';
import Header from '../components/Header';
import XpTracker from '../components/XpTracker';
import TaskList from '../components/TaskList';
import PresetTasks from '../components/PresetTasks';
import Leaderboard from '../components/Leaderboard';
import Shop from '../components/Shop';
import { useToast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  xp: number;
  gems: number;
}

export interface User {
  level: number;
  currentXp: number;
  xpToNext: number;
  gems: number;
  completedToday: number;
}

const Index = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<User>({
    level: 1,
    currentXp: 120,
    xpToNext: 200,
    gems: 47,
    completedToday: 0
  });

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      text: 'Morning meditation',
      completed: false,
      xp: 15,
      gems: 3
    },
    {
      id: '2', 
      text: 'Read for 30 minutes',
      completed: true,
      xp: 20,
      gems: 4
    }
  ]);

  const [activeTab, setActiveTab] = useState<'tasks' | 'leaderboard' | 'shop'>('tasks');

  const handleTaskComplete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    const newXp = user.currentXp + task.xp;
    const newGems = user.gems + task.gems;
    let newLevel = user.level;
    let xpAfterLevel = newXp;

    // Check for level up
    if (newXp >= user.xpToNext) {
      newLevel++;
      xpAfterLevel = newXp - user.xpToNext;
      toast({
        title: "🎉 Level Up!",
        description: `Congratulations! You reached level ${newLevel}!`,
      });
    }

    setUser({
      ...user,
      level: newLevel,
      currentXp: xpAfterLevel,
      xpToNext: newLevel > user.level ? 200 + (newLevel - 1) * 50 : user.xpToNext,
      gems: newGems,
      completedToday: user.completedToday + 1
    });

    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, completed: true } : t
    ));

    toast({
      title: "Task completed! 🌟",
      description: `+${task.xp} XP, +${task.gems} gems`,
    });
  };

  const addCustomTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      xp: 10,
      gems: 2
    };
    setTasks([...tasks, newTask]);
  };

  const addPresetTask = (preset: { text: string; xp: number; gems: number }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text: preset.text,
      completed: false,
      xp: preset.xp,
      gems: preset.gems
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-100 font-mono">
      <div className="max-w-md mx-auto bg-gray-800 min-h-screen shadow-2xl border-x border-gray-700">
        <Header user={user} />
        <XpTracker user={user} />
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700 bg-gray-850">
          {[
            { key: 'tasks', label: 'Tasks', icon: '📋' },
            { key: 'leaderboard', label: 'League', icon: '🏆' },
            { key: 'shop', label: 'Shop', icon: '🛍️' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-3 px-2 text-sm font-bold transition-colors border-b-2 ${
                activeTab === tab.key
                  ? 'text-green-400 border-green-400 bg-gray-800'
                  : 'text-gray-400 border-transparent hover:text-green-300'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 pb-20">
          {activeTab === 'tasks' && (
            <>
              <TaskList 
                tasks={tasks} 
                onTaskComplete={handleTaskComplete}
                onAddTask={addCustomTask}
              />
              <PresetTasks onAddTask={addPresetTask} />
            </>
          )}
          {activeTab === 'leaderboard' && <Leaderboard />}
          {activeTab === 'shop' && <Shop user={user} setUser={setUser} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
