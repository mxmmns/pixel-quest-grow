
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '../pages/Index';

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onAddTask: (text: string) => void;
}

const TaskList = ({ tasks, onTaskComplete, onAddTask }: TaskListProps) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask.trim());
      setNewTask('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-lg">📋</span>
        <h2 className="text-lg font-bold text-green-100">Daily Tasks</h2>
      </div>

      {/* Add new task */}
      <div className="flex space-x-2 mb-4">
        <Input
          placeholder="Add a custom task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          className="bg-gray-700 border-gray-600 text-green-100 placeholder-gray-400 focus:border-green-400"
        />
        <Button 
          onClick={handleAddTask}
          className="bg-green-600 hover:bg-green-700 text-gray-900 font-bold px-4"
        >
          +
        </Button>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-3 rounded-lg border-2 transition-all ${
              task.completed
                ? 'bg-green-900/30 border-green-700 opacity-75'
                : 'bg-gray-700 border-gray-600 hover:border-green-500'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => !task.completed && onTaskComplete(task.id)}
                className="border-green-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              
              <div className="flex-1">
                <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-green-100'}`}>
                  {task.text}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-yellow-400">⚡{task.xp}</span>
                <span className="text-blue-400">💎{task.gems}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>🎯 No tasks yet!</p>
          <p className="text-sm mt-1">Add some tasks to start earning XP</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
