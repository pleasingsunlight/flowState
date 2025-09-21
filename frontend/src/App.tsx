import React, { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { MapView } from './components/MapView';
import { TrendsView } from './components/TrendsView';
import { FarmerDashboard } from './components/FarmerDashboard';
import { IndustryDashboard } from './components/IndustryDashboard';
import { AlertSystem } from './components/AlertSystem';
import { Navigation } from './components/Navigation';
import { Button } from './components/ui/button';
import { LogOut } from 'lucide-react';
import Predictor from "./Predictor";   // ✅ Predictor component

export type UserRole = 'farmer' | 'citizen' | 'industry' | 'researcher';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  location: string;
}

export interface WaterData {
  timestamp: string;
  level: number;
  ph: number;
  tds: number;
  hardness: number;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
}

export interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  message: string;
  timestamp: string;
  location?: string;
}

export type AppView = 'dashboard' | 'map' | 'trends' | 'farmer' | 'industry' | 'researcher';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [waterData, setWaterData] = useState<WaterData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Mock data generation
  useEffect(() => {
    if (user) {
      generateMockData();
      generateMockAlerts();
      
      // Simulate real-time updates
      const interval = setInterval(() => {
        updateWaterData();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [user]);

  const generateMockData = () => {
    const locations = [
      { lat: 28.6139, lng: 77.2090, name: 'Delhi Central' },
      { lat: 28.7041, lng: 77.1025, name: 'Delhi North' },
      { lat: 28.5355, lng: 77.3910, name: 'Delhi East' },
      { lat: 28.4595, lng: 77.0266, name: 'Gurgaon' },
      { lat: 28.9845, lng: 77.7064, name: 'Meerut' }
    ];

    const mockData: WaterData[] = locations.map(location => ({
      timestamp: new Date().toISOString(),
      level: Math.random() * 50 + 10, // 10-60 meters
      ph: Math.random() * 3 + 6.5, // 6.5-9.5
      tds: Math.random() * 800 + 200, // 200-1000 ppm
      hardness: Math.random() * 400 + 100, // 100-500 mg/L
      location
    }));

    setWaterData(mockData);
  };

  const updateWaterData = () => {
    setWaterData(prev => prev.map(data => ({
      ...data,
      timestamp: new Date().toISOString(),
      level: Math.max(5, data.level + (Math.random() - 0.5) * 2),
      ph: Math.max(6, Math.min(9, data.ph + (Math.random() - 0.5) * 0.2)),
      tds: Math.max(100, data.tds + (Math.random() - 0.5) * 50),
      hardness: Math.max(50, data.hardness + (Math.random() - 0.5) * 20)
    })));
  };

  const generateMockAlerts = () => {
    const mockAlerts: Alert[] = [
      {
        id: '1',
        type: 'critical',
        title: 'Low Water Level Alert',
        message: 'Water level at Delhi Central has dropped below critical threshold (8m)',
        timestamp: new Date(Date.now() - 30000).toISOString(),
        location: 'Delhi Central'
      },
      {
        id: '2',
        type: 'warning',
        title: 'High TDS Detected',
        message: 'TDS levels in Gurgaon area exceed recommended limits (950 ppm)',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        location: 'Gurgaon'
      },
      {
        id: '3',
        type: 'info',
        title: 'Maintenance Scheduled',
        message: 'DWLR maintenance scheduled for Delhi North on Oct 25',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        location: 'Delhi North'
      }
    ];

    setAlerts(mockAlerts);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    
    // Set default view based on role
    if (userData.role === 'farmer') {
      setCurrentView('farmer');
    } else if (userData.role === 'industry') {
      setCurrentView('industry');
    } else if (userData.role === 'researcher') {
      setCurrentView('trends');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setWaterData([]);
    setAlerts([]);
    setCurrentView('dashboard');
  };

  const getCurrentComponent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard waterData={waterData} alerts={alerts} user={user!} />;
      case 'map':
        return <MapView waterData={waterData} />;
      case 'trends':
        return <TrendsView waterData={waterData} />;
      case 'farmer':
        return <FarmerDashboard waterData={waterData} alerts={alerts} user={user!} />;
      case 'industry':
        return <IndustryDashboard waterData={waterData} user={user!} />;
      default:
        return <Dashboard waterData={waterData} alerts={alerts} user={user!} />;
    }
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-medium">Flow State</h1>
          <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-muted-foreground"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>

      {/* Alert System */}
      <AlertSystem alerts={alerts} />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {getCurrentComponent()}

        {/* ✅ Add Predictor below main content */}
        <div className="p-4 border-t border-border bg-white">
          <h2 className="text-lg font-semibold mb-2">AI Model Prediction</h2>
          <Predictor />
        </div>
      </div>

      {/* Navigation */}
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        userRole={user.role}
      />
    </div>
  );
}
