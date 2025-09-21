import React from 'react';
import { Button } from './ui/button';
import { AppView, UserRole } from '../App';
import { 
  Home, 
  Map, 
  TrendingUp, 
  Sprout, 
  Factory,
  Users
} from 'lucide-react';

interface NavigationProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  userRole: UserRole;
}

export function Navigation({ currentView, onViewChange, userRole }: NavigationProps) {
  const getNavigationItems = () => {
    const commonItems = [
      { id: 'dashboard' as AppView, label: 'Dashboard', icon: Home },
      { id: 'map' as AppView, label: 'Map', icon: Map },
      { id: 'trends' as AppView, label: 'Trends', icon: TrendingUp }
    ];

    switch (userRole) {
      case 'farmer':
        return [
          { id: 'farmer' as AppView, label: 'Farm', icon: Sprout },
          ...commonItems
        ];
      case 'industry':
        return [
          { id: 'industry' as AppView, label: 'Industry', icon: Factory },
          ...commonItems
        ];
      case 'citizen':
      default:
        return [
          { id: 'dashboard' as AppView, label: 'Home', icon: Users },
          ...commonItems.slice(1) // Remove duplicate dashboard
        ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}