import React from 'react';
import { Badge } from './ui/badge';
import { 
  Home, 
  Map, 
  Bell, 
  User, 
  BarChart3,
  Briefcase
} from 'lucide-react';

interface BottomNavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
  userType: 'researcher' | 'policymaker' | 'general';
  notificationCount: number;
}

export function BottomNavigation({ activeScreen, onScreenChange, userType, notificationCount }: BottomNavigationProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'map', icon: Map, label: 'Map' },
    ...(userType === 'researcher' ? [{ id: 'research', icon: BarChart3, label: 'Research' }] : []),
    ...(userType === 'policymaker' ? [{ id: 'policy', icon: Briefcase, label: 'Policy' }] : []),
    { id: 'notifications', icon: Bell, label: 'Alerts' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              activeScreen === item.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <div className="relative">
              <item.icon className="w-5 h-5" />
              {item.id === 'notifications' && notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 w-4 h-4 p-0 flex items-center justify-center text-xs"
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Badge>
              )}
            </div>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}