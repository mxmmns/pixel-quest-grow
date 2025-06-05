
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { User } from '../pages/Index';

interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  category: string;
  description: string;
}

interface ShopProps {
  user: User;
  setUser: (user: User) => void;
}

const shopItems: ShopItem[] = [
  { id: '1', name: "Retro Theme", price: 50, icon: "🎮", category: "Themes", description: "Classic 8-bit style" },
  { id: '2', name: "Forest Background", price: 30, icon: "🌲", category: "Backgrounds", description: "Peaceful forest scene" },
  { id: '3', name: "Golden Border", price: 75, icon: "✨", category: "UI", description: "Luxury gold accents" },
  { id: '4', name: "Robot Avatar", price: 40, icon: "🤖", category: "Avatars", description: "Futuristic companion" },
  { id: '5', name: "Lightning Effect", price: 60, icon: "⚡", category: "Effects", description: "Task completion spark" },
  { id: '6', name: "Space Theme", price: 80, icon: "🚀", category: "Themes", description: "Cosmic adventure style" },
];

const Shop = ({ user, setUser }: ShopProps) => {
  const { toast } = useToast();

  const handlePurchase = (item: ShopItem) => {
    if (user.gems >= item.price) {
      setUser({
        ...user,
        gems: user.gems - item.price
      });
      
      toast({
        title: "Purchase successful! 🎉",
        description: `You bought ${item.name} for ${item.price} gems`,
      });
    } else {
      toast({
        title: "Not enough gems! 💎",
        description: `You need ${item.price - user.gems} more gems`,
        variant: "destructive"
      });
    }
  };

  const categories = [...new Set(shopItems.map(item => item.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-lg">🛍️</span>
          <h2 className="text-lg font-bold text-green-100">Pixel Shop</h2>
        </div>
        <div className="flex items-center space-x-1 bg-gray-700 px-3 py-1 rounded-lg border border-gray-600">
          <span className="text-lg">💎</span>
          <span className="font-bold text-green-400">{user.gems}</span>
        </div>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-3">
          <h3 className="text-sm font-bold text-green-400 border-b border-gray-700 pb-1">
            {category}
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            {shopItems
              .filter(item => item.category === category)
              .map(item => (
                <div
                  key={item.id}
                  className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-green-500 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className="font-medium text-green-100">{item.name}</h4>
                        <p className="text-xs text-gray-400">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <span className="text-lg">💎</span>
                          <span className="font-bold text-green-400">{item.price}</span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handlePurchase(item)}
                        size="sm"
                        className={`font-bold ${
                          user.gems >= item.price
                            ? 'bg-green-600 hover:bg-green-700 text-gray-900'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={user.gems < item.price}
                      >
                        Buy
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
